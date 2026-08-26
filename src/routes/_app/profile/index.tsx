import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Lock,
  LogOut,
  Shield,
  UserRound,
  Users,
} from "lucide-react";
import { Avatar, Card, Header, Row, Screen } from "@/components/kit";
import { initials } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/profile/")({
  component: ProfileScreen,
});

function ProfileScreen() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <Screen canvas padded={false}>
      <Header title="Profile" back={false} />
      <div className="px-5 pb-8">
        <Card className="mb-4 flex items-center gap-4">
          <Avatar initials={initials(user?.firstName ?? "", user?.lastName ?? "")} size={64} />
          <div>
            <p className="font-display text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">DOB {user?.dob}</p>
            <p className="text-xs text-mauve">{user?.patientId}</p>
          </div>
        </Card>
        <Card className="overflow-hidden p-0">
          <Row icon={<UserRound size={18} />} label="Personal Information" to="/profile/personal" />
          <Row icon={<Shield size={18} />} label="Insurance Information" to="/profile/insurance" />
          <Row icon={<CreditCard size={18} />} label="Payment Methods" to="/profile/payment-methods" />
          <Row icon={<Bell size={18} />} label="Notification Settings" to="/profile/settings" />
          <Row icon={<Lock size={18} />} label="Privacy & Security" to="/profile/settings" />
          <Row icon={<Users size={18} />} label="Linked Family Members" />
          <Row icon={<HelpCircle size={18} />} label="Help & Support" />
          <Row
            icon={<LogOut size={18} />}
            label="Log Out"
            danger
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          />
        </Card>
      </div>
    </Screen>
  );
}
