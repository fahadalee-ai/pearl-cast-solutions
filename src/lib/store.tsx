import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearStorage, readStorage, writeStorage } from "./storage";
import {
  seedAppointments,
  seedBills,
  seedConversations,
  seedDocuments,
  seedForms,
  seedMedications,
  seedNotifications,
  seedPaymentMethods,
  seedProviders,
  seedUser,
  type Appointment,
  type AppDocument,
  type AppNotification,
  type Bill,
  type Conversation,
  type Medication,
  type PatientForm,
  type PaymentMethod,
  type Provider,
  type User,
} from "./mock-data";

export type Toast = { id: number; title: string; body?: string };

type Prefs = {
  push: boolean;
  email: boolean;
  sms: boolean;
  biometric: boolean;
  darkMode: boolean;
};

type Store = {
  hydrated: boolean;
  user: User | null;
  onboarded: boolean;
  providers: Provider[];
  markOnboarded: () => void;
  login: (email: string, password: string) => { ok: true } | { ok: false };
  register: (input: Pick<User, "firstName" | "lastName" | "email" | "phone" | "password">) =>
    | { ok: true }
    | { ok: false; reason: "exists" };
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  appointments: Appointment[];
  addAppointment: (entry: Omit<Appointment, "id" | "status">) => Appointment;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  medications: Medication[];
  requestRefill: (id: string) => void;
  forms: PatientForm[];
  saveForm: (id: string, values: Record<string, string>, status?: PatientForm["status"]) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  startConversation: (providerId: string, text: string) => string;
  documents: AppDocument[];
  addDocument: (doc: Omit<AppDocument, "id" | "date">) => void;
  notifications: AppNotification[];
  markAllRead: () => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  bills: Bill[];
  payBill: (id: string, amount: number) => void;
  paymentMethods: PaymentMethod[];
  prefs: Prefs;
  togglePref: (key: keyof Prefs) => void;
  toasts: Toast[];
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

const DEFAULT_PREFS: Prefs = {
  push: true,
  email: true,
  sms: true,
  biometric: false,
  darkMode: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [users, setUsers] = useState<User[]>([seedUser]);
  const [user, setUser] = useState<User | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [appointments, setAppointments] = useState(seedAppointments);
  const [medications] = useState(seedMedications);
  const [forms, setForms] = useState(seedForms);
  const [conversations, setConversations] = useState(seedConversations);
  const [documents, setDocuments] = useState(seedDocuments);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [bills, setBills] = useState(seedBills);
  const [paymentMethods] = useState(seedPaymentMethods);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const id = readStorage("session");
    const found = id ? users.find((u) => u.id === id) ?? null : null;
    setUser(found);
    setOnboarded(readStorage("onboarded") === "1");
    setHydrated(true);
  }, [users]);

  const value = useMemo<Store>(() => {
    const pushToast = (title: string, body?: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, title, body }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };

    return {
      hydrated,
      user,
      onboarded,
      providers: seedProviders,
      markOnboarded: () => {
        setOnboarded(true);
        writeStorage("onboarded", "1");
      },
      login: (email, password) => {
        const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
        if (!found || found.password !== password) return { ok: false };
        setUser(found);
        writeStorage("session", found.id);
        writeStorage("onboarded", "1");
        setOnboarded(true);
        return { ok: true };
      },
      register: (input) => {
        if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
          return { ok: false, reason: "exists" };
        }
        const created: User = {
          ...seedUser,
          ...input,
          id: `u${Date.now()}`,
          email: input.email.trim().toLowerCase(),
          firstName: input.firstName.trim(),
          lastName: input.lastName.trim(),
          patientId: `PCS-${Math.floor(10000 + Math.random() * 89999)}`,
        };
        setUsers((list) => [...list, created]);
        setUser(created);
        writeStorage("session", created.id);
        writeStorage("onboarded", "1");
        setOnboarded(true);
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        clearStorage("session");
      },
      updateUser: (patch) => {
        if (!user) return;
        const next = { ...user, ...patch };
        setUser(next);
        setUsers((list) => list.map((u) => (u.id === next.id ? next : u)));
      },
      appointments,
      addAppointment: (entry) => {
        const next: Appointment = { ...entry, id: `a${Date.now()}`, status: "Confirmed" };
        setAppointments((list) => [next, ...list]);
        pushToast("Appointment booked");
        return next;
      },
      updateAppointment: (id, patch) =>
        setAppointments((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a))),
      medications,
      requestRefill: () => pushToast("Refill requested", "Your pharmacy will have this ready in 1–2 days."),
      forms,
      saveForm: (id, values, status) =>
        setForms((list) =>
          list.map((f) => (f.id === id ? { ...f, values, status: status ?? f.status } : f)),
        ),
      conversations,
      sendMessage: (conversationId, text) => {
        setConversations((list) =>
          list.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  unread: 0,
                  messages: [
                    ...c.messages,
                    { id: `cm${Date.now()}`, from: "patient", text, time: "Just now" },
                  ],
                }
              : c,
          ),
        );
      },
      startConversation: (providerId, text) => {
        const existing = conversations.find((c) => c.providerId === providerId);
        if (existing) {
          setConversations((list) =>
            list.map((c) =>
              c.id === existing.id
                ? {
                    ...c,
                    messages: [
                      ...c.messages,
                      { id: `cm${Date.now()}`, from: "patient", text, time: "Just now" },
                    ],
                  }
                : c,
            ),
          );
          return existing.id;
        }
        const id = `c${Date.now()}`;
        const provider = seedProviders.find((p) => p.id === providerId);
        setConversations((list) => [
          {
            id,
            providerId,
            department: provider?.specialty ?? "Care team",
            unread: 0,
            messages: [{ id: `cm${Date.now()}`, from: "patient", text, time: "Just now" }],
          },
          ...list,
        ]);
        return id;
      },
      documents,
      addDocument: (doc) => {
        setDocuments((list) => [
          { ...doc, id: `d${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
          ...list,
        ]);
        pushToast("Document uploaded");
      },
      notifications,
      markAllRead: () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
      markNotificationRead: (id) =>
        setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))),
      dismissNotification: (id) => setNotifications((list) => list.filter((n) => n.id !== id)),
      bills,
      payBill: (id, amount) => {
        setBills((list) =>
          list.map((b) =>
            b.id === id
              ? { ...b, amount: Math.max(0, b.amount - amount), status: amount >= b.amount ? "Paid" : b.status }
              : b,
          ),
        );
        pushToast("Payment successful");
      },
      paymentMethods,
      prefs,
      togglePref: (key) => setPrefs((p) => ({ ...p, [key]: !p[key] })),
      toasts,
      pushToast,
      dismissToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    };
  }, [
    hydrated,
    users,
    user,
    onboarded,
    appointments,
    medications,
    forms,
    conversations,
    documents,
    notifications,
    bills,
    paymentMethods,
    prefs,
    toasts,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
