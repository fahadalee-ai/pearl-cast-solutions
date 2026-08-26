export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  patientId: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
};

export type Provider = {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  rating: number;
  nextAvailable: string;
};

export type Appointment = {
  id: string;
  providerId: string;
  date: string;
  time: string;
  type: "In-Person";
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  reason: string;
  location?: string;
  notes?: string;
};

export type TreatmentPlan = {
  id: string;
  name: string;
  status: "On track" | "Needs attention";
  progress: number;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  warnings: string;
  sideEffects: string;
  providerId: string;
  refills: number;
  active: boolean;
};

export type FormField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "select" | "checkbox" | "signature";
  options?: string[];
};

export type PatientForm = {
  id: string;
  title: string;
  providerId: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Submitted";
  fields: FormField[];
  values: Record<string, string>;
};

export type Message = {
  id: string;
  from: "patient" | "provider";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  providerId: string;
  department: string;
  unread: number;
  messages: Message[];
};

export type AppDocument = {
  id: string;
  name: string;
  type: "Lab Results" | "Records" | "Insurance" | "Uploaded by Me";
  kind: "PDF" | "Image";
  date: string;
  size: string;
};

export type AppNotification = {
  id: string;
  category: "Appointments" | "Messages" | "Payments" | "Forms";
  title: string;
  preview: string;
  time: string;
  when: "Today" | "Earlier";
  href: string;
  read: boolean;
};

export type Bill = {
  id: string;
  providerId: string;
  service: string;
  date: string;
  amount: number;
  insuranceCovered: number;
  status: "Due" | "Overdue" | "Paid";
  items: { label: string; amount: number }[];
};

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
};

export type Pharmacy = {
  id: string;
  name: string;
  address: string;
};

export const seedUser: User = {
  id: "u1",
  firstName: "Elena",
  lastName: "Vasquez",
  email: "elena@pearlcast.com",
  phone: "(415) 555-0148",
  password: "Pearl123",
  dob: "1988-04-16",
  patientId: "PCS-18420",
  address: "428 Magnolia Ave, Oakland, CA 94610",
  emergencyName: "Luis Vasquez",
  emergencyPhone: "(415) 555-0190",
};

export const seedProviders: Provider[] = [
  {
    id: "p1",
    name: "Dr. Amara Patel",
    specialty: "Family Medicine",
    initials: "AP",
    rating: 4.9,
    nextAvailable: "Tomorrow",
  },
  {
    id: "p2",
    name: "Dr. James Okonkwo",
    specialty: "Cardiology",
    initials: "JO",
    rating: 4.8,
    nextAvailable: "Sep 3",
  },
  {
    id: "p3",
    name: "Dr. Sofia Reyes",
    specialty: "Behavioral Health",
    initials: "SR",
    rating: 4.9,
    nextAvailable: "Fri",
  },
];

export const seedAppointments: Appointment[] = [
  {
    id: "a1",
    providerId: "p1",
    date: "2026-08-27",
    time: "10:00",
    type: "In-Person",
    status: "Confirmed",
    reason: "Follow-up on blood pressure and medication review",
    location: "Pearl Cast Clinic, Suite 104",
    notes: "Please have your latest home readings ready.",
  },
  {
    id: "a2",
    providerId: "p2",
    date: "2026-09-03",
    time: "14:30",
    type: "In-Person",
    status: "Confirmed",
    reason: "Annual cardiac check-in",
    location: "Pearl Cast Clinic, Suite 210",
  },
  {
    id: "a3",
    providerId: "p3",
    date: "2026-08-12",
    time: "09:15",
    type: "In-Person",
    status: "Completed",
    reason: "Therapy follow-up",
    location: "Pearl Cast Clinic, Suite 118",
  },
  {
    id: "a4",
    providerId: "p1",
    date: "2026-07-28",
    time: "11:00",
    type: "In-Person",
    status: "Completed",
    reason: "Physical exam",
    location: "Pearl Cast Clinic, Suite 104",
  },
];

export const seedPlans: TreatmentPlan[] = [
  { id: "tp1", name: "Hypertension Care", status: "On track", progress: 68 },
  { id: "tp2", name: "Diabetes Management", status: "Needs attention", progress: 42 },
];

export const seedMedications: Medication[] = [
  {
    id: "m1",
    name: "Lisinopril",
    dosage: "10 mg",
    frequency: "Once daily",
    instructions: "Take with food, once daily in the morning.",
    warnings: "Stand up slowly if you feel lightheaded. Avoid potassium supplements unless prescribed.",
    sideEffects: "Dry cough, dizziness, or mild fatigue may occur.",
    providerId: "p1",
    refills: 2,
    active: true,
  },
  {
    id: "m2",
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    instructions: "Take with breakfast and dinner.",
    warnings: "Skip a dose if you are fasting for a procedure. Call us for persistent stomach upset.",
    sideEffects: "Nausea or soft stools are common in the first weeks.",
    providerId: "p1",
    refills: 1,
    active: true,
  },
  {
    id: "m3",
    name: "Amoxicillin",
    dosage: "500 mg",
    frequency: "Three times daily",
    instructions: "Completed 7-day course.",
    warnings: "",
    sideEffects: "",
    providerId: "p1",
    refills: 0,
    active: false,
  },
];

export const seedForms: PatientForm[] = [
  {
    id: "f1",
    title: "New Patient Health History",
    providerId: "p1",
    dueDate: "2026-08-27",
    status: "In Progress",
    values: { allergies: "Penicillin" },
    fields: [
      { id: "reason", label: "Main reason for care", type: "textarea" },
      { id: "allergies", label: "Allergies", type: "text" },
      {
        id: "smoker",
        label: "Do you smoke?",
        type: "select",
        options: ["No", "Yes", "Former"],
      },
      { id: "meds", label: "Current medications", type: "textarea" },
      { id: "consent", label: "I confirm this information is accurate", type: "checkbox" },
      { id: "sign", label: "Signature", type: "signature" },
    ],
  },
  {
    id: "f2",
    title: "HIPAA Acknowledgement",
    providerId: "p1",
    dueDate: "2026-07-20",
    status: "Submitted",
    values: { consent: "yes", sign: "Elena Vasquez" },
    fields: [
      { id: "consent", label: "I have read the privacy notice", type: "checkbox" },
      { id: "sign", label: "Signature", type: "signature" },
    ],
  },
  {
    id: "f3",
    title: "PHQ-9 Mood Check-in",
    providerId: "p3",
    dueDate: "2026-08-30",
    status: "Not Started",
    values: {},
    fields: [
      {
        id: "interest",
        label: "Little interest or pleasure in doing things",
        type: "select",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
      },
      {
        id: "down",
        label: "Feeling down, depressed, or hopeless",
        type: "select",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
      },
      { id: "notes", label: "Anything else we should know?", type: "textarea" },
    ],
  },
];

export const seedConversations: Conversation[] = [
  {
    id: "c1",
    providerId: "p1",
    department: "Family Medicine",
    unread: 1,
    messages: [
      {
        id: "cm1",
        from: "provider",
        text: "Elena, your latest home readings look improved. Bring them to tomorrow’s visit.",
        time: "9:12 AM",
      },
      {
        id: "cm2",
        from: "patient",
        text: "Thank you — I’ll have the log ready.",
        time: "9:40 AM",
      },
      {
        id: "cm3",
        from: "provider",
        text: "Perfect. We can also review your metformin if mornings are still hard.",
        time: "10:04 AM",
      },
    ],
  },
  {
    id: "c2",
    providerId: "p3",
    department: "Behavioral Health",
    unread: 0,
    messages: [
      {
        id: "cm4",
        from: "provider",
        text: "Your PHQ-9 is due this week whenever you have 5 quiet minutes.",
        time: "Mon",
      },
    ],
  },
];

export const seedDocuments: AppDocument[] = [
  {
    id: "d1",
    name: "Metabolic panel — Aug 2026.pdf",
    type: "Lab Results",
    kind: "PDF",
    date: "2026-08-18",
    size: "240 KB",
  },
  {
    id: "d2",
    name: "Visit summary — Jul 28.pdf",
    type: "Records",
    kind: "PDF",
    date: "2026-07-28",
    size: "180 KB",
  },
  {
    id: "d3",
    name: "Insurance card — front.jpg",
    type: "Insurance",
    kind: "Image",
    date: "2026-06-02",
    size: "1.1 MB",
  },
  {
    id: "d4",
    name: "Home BP log.pdf",
    type: "Uploaded by Me",
    kind: "PDF",
    date: "2026-08-20",
    size: "96 KB",
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    category: "Appointments",
    title: "Visit with Dr. Patel tomorrow",
    preview: "In-person visit at 10:00 AM — Pearl Cast Clinic, Suite 104.",
    time: "1h ago",
    when: "Today",
    href: "/appointments/a1",
    read: false,
  },
  {
    id: "n2",
    category: "Messages",
    title: "New message from Dr. Patel",
    preview: "We can also review your metformin if mornings…",
    time: "2h ago",
    when: "Today",
    href: "/messages/c1",
    read: false,
  },
  {
    id: "n3",
    category: "Forms",
    title: "Health history still in progress",
    preview: "Finish before tomorrow’s visit.",
    time: "Yesterday",
    when: "Earlier",
    href: "/forms/f1",
    read: false,
  },
  {
    id: "n4",
    category: "Payments",
    title: "Balance due",
    preview: "$85.00 for your July office visit.",
    time: "3d ago",
    when: "Earlier",
    href: "/payments",
    read: true,
  },
];

export const seedBills: Bill[] = [
  {
    id: "b1",
    providerId: "p1",
    service: "Office visit — physical exam",
    date: "2026-07-28",
    amount: 85,
    insuranceCovered: 140,
    status: "Due",
    items: [
      { label: "Established patient visit", amount: 185 },
      { label: "Insurance covered", amount: -140 },
      { label: "Lab draw fee", amount: 40 },
    ],
  },
  {
    id: "b2",
    providerId: "p3",
    service: "Office visit — therapy",
    date: "2026-08-12",
    amount: 0,
    insuranceCovered: 120,
    status: "Paid",
    items: [
      { label: "Behavioral health visit", amount: 120 },
      { label: "Insurance covered", amount: -120 },
    ],
  },
  {
    id: "b3",
    providerId: "p2",
    service: "Cardiology consult",
    date: "2026-05-09",
    amount: 40,
    insuranceCovered: 210,
    status: "Overdue",
    items: [
      { label: "Specialist consult", amount: 250 },
      { label: "Insurance covered", amount: -210 },
    ],
  },
];

export const seedPaymentMethods: PaymentMethod[] = [
  { id: "pm1", brand: "Visa", last4: "4242", exp: "08/28" },
  { id: "pm2", brand: "Mastercard", last4: "8811", exp: "01/27" },
];

export const seedPharmacies: Pharmacy[] = [
  { id: "ph1", name: "Pearl Cast Pharmacy", address: "120 Oak St, Oakland, CA" },
  { id: "ph2", name: "Lakeside CVS", address: "88 Grand Ave, Oakland, CA" },
];

export const seedInsurance = {
  provider: "Blue Shield of California",
  memberId: "XBU18420991",
  groupNumber: "PCS-4401",
};

export const TIME_SLOTS = ["08:30", "09:00", "10:00", "11:15", "13:00", "14:30", "16:00"];

export function providerById(id: string, list = seedProviders) {
  return list.find((p) => p.id === id);
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function initials(first: string, last: string) {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
