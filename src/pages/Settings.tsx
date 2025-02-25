
import RoleNav from "@/components/RoleNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Shield,
  Smartphone,
  User,
  Mail,
  Lock,
  Globe,
  BellRing,
} from "lucide-react";

interface SettingsProps {
  role: "user" | "agent" | "admin";
}

const IconInput = ({ icon, ...props }: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        {icon}
      </span>
      <Input className="pl-10" {...props} />
    </div>
  );
};

const Settings = ({ role = "user" }: SettingsProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Your settings have been successfully saved.",
    });
  };

  const renderRoleSpecificSettings = () => {
    switch (role) {
      case "admin":
        return (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Maintenance Mode</label>
                  <p className="text-sm text-gray-500">
                    Enable system maintenance mode
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">System Notifications</label>
                  <p className="text-sm text-gray-500">
                    Receive critical system alerts
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Rate Limit</label>
                <Input type="number" placeholder="Requests per minute" />
              </div>
            </CardContent>
          </Card>
        );

      case "agent":
        return (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Available Status</label>
                  <p className="text-sm text-gray-500">
                    Show as available for transactions
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Commission Alerts</label>
                  <p className="text-sm text-gray-500">
                    Get notified about earned commissions
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Operating Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="time" placeholder="Start time" />
                  <Input type="time" placeholder="End time" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role={role} />
      <div className="lg:pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account preferences</p>
            </div>
          </div>

          {/* Profile Settings */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <IconInput icon={<User className="w-4 h-4" />} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <IconInput
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <IconInput
                  icon={<Smartphone className="w-4 h-4" />}
                  placeholder="Your phone number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Two-Factor Authentication</label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Change Password</label>
                <IconInput
                  icon={<Lock className="w-4 h-4" />}
                  type="password"
                  placeholder="New password"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Push Notifications</label>
                  <p className="text-sm text-gray-500">
                    Receive push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications
                  </p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>

          {/* Role Specific Settings */}
          {renderRoleSpecificSettings()}

          <div className="flex justify-end">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
