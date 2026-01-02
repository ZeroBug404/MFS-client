import RoleNav from "@/components/RoleNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  useChangePinMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SettingsProps {
  role: "user" | "agent" | "admin";
}

const IconInput = ({
  icon,
  ...props
}: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) => {
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
  const { toast: systemToast } = useToast();

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  // Security state
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Role-specific settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [apiRateLimit, setApiRateLimit] = useState("");
  const [availableStatus, setAvailableStatus] = useState(true);
  const [commissionAlerts, setCommissionAlerts] = useState(true);
  const [operatingHoursStart, setOperatingHoursStart] = useState("");
  const [operatingHoursEnd, setOperatingHoursEnd] = useState("");

  // API hooks
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useGetMyProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateMyProfileMutation();
  const [changePin, { isLoading: isChangingPin }] = useChangePinMutation();

  // Load profile data
  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNo(user.phoneNo || "");
    }
  }, [profileData]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        const prefs = JSON.parse(savedNotifications);
        setNotifications(prefs.push !== undefined ? prefs.push : true);
        setEmailNotifications(prefs.email !== undefined ? prefs.email : true);
      } catch (e) {
        // Ignore parse errors
      }
    }

    if (role === "admin") {
      const savedAdminSettings = localStorage.getItem("adminSettings");
      if (savedAdminSettings) {
        try {
          const settings = JSON.parse(savedAdminSettings);
          setMaintenanceMode(settings.maintenanceMode || false);
          setSystemNotifications(
            settings.systemNotifications !== undefined
              ? settings.systemNotifications
              : true
          );
          setApiRateLimit(settings.apiRateLimit || "");
        } catch (e) {
          // Ignore parse errors
        }
      }
    } else if (role === "agent") {
      const savedAgentSettings = localStorage.getItem("agentSettings");
      if (savedAgentSettings) {
        try {
          const settings = JSON.parse(savedAgentSettings);
          setAvailableStatus(
            settings.availableStatus !== undefined
              ? settings.availableStatus
              : true
          );
          setCommissionAlerts(
            settings.commissionAlerts !== undefined
              ? settings.commissionAlerts
              : true
          );
          setOperatingHoursStart(settings.operatingHoursStart || "");
          setOperatingHoursEnd(settings.operatingHoursEnd || "");
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [role]);

  const handleSaveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
      }).unwrap();

      toast.success("Profile updated successfully");
      refetchProfile();
    } catch (error: unknown) {
      console.error("Update profile error:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleChangePin = async () => {
    if (!oldPin || !newPin || !confirmPin) {
      toast.error("Please fill in all PIN fields");
      return;
    }

    if (newPin.length !== 5) {
      toast.error("PIN must be exactly 5 digits");
      return;
    }

    if (newPin !== confirmPin) {
      toast.error("New PIN and confirm PIN do not match");
      return;
    }

    if (oldPin === newPin) {
      toast.error("New PIN must be different from current PIN");
      return;
    }

    try {
      await changePin({
        oldPin,
        newPin,
      }).unwrap();

      toast.success("PIN changed successfully");
      setOldPin("");
      setNewPin("");
      setConfirmPin("");
    } catch (error: unknown) {
      console.error("Change PIN error:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to change PIN. Please check your current PIN and try again.";
      toast.error(errorMessage);
    }
  };

  const handleSaveNotifications = () => {
    // Save notification preferences (can be stored in localStorage or sent to backend)
    localStorage.setItem(
      "notifications",
      JSON.stringify({
        push: notifications,
        email: emailNotifications,
      })
    );
    toast.success("Notification preferences saved");
  };

  const handleSaveRoleSettings = () => {
    // Save role-specific settings
    if (role === "admin") {
      localStorage.setItem(
        "adminSettings",
        JSON.stringify({
          maintenanceMode,
          systemNotifications,
          apiRateLimit,
        })
      );
    } else if (role === "agent") {
      localStorage.setItem(
        "agentSettings",
        JSON.stringify({
          availableStatus,
          commissionAlerts,
          operatingHoursStart,
          operatingHoursEnd,
        })
      );
    }
    toast.success("Settings saved successfully");
  };

  const handleSave = () => {
    handleSaveProfile();
    handleSaveNotifications();
    handleSaveRoleSettings();
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
                  <label className="text-sm font-medium">
                    Maintenance Mode
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable system maintenance mode
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    System Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive critical system alerts
                  </p>
                </div>
                <Switch
                  checked={systemNotifications}
                  onCheckedChange={setSystemNotifications}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Rate Limit</label>
                <Input
                  type="number"
                  placeholder="Requests per minute"
                  value={apiRateLimit}
                  onChange={(e) => setApiRateLimit(e.target.value)}
                />
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
                  <label className="text-sm font-medium">
                    Available Status
                  </label>
                  <p className="text-sm text-gray-500">
                    Show as available for transactions
                  </p>
                </div>
                <Switch
                  checked={availableStatus}
                  onCheckedChange={setAvailableStatus}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Commission Alerts
                  </label>
                  <p className="text-sm text-gray-500">
                    Get notified about earned commissions
                  </p>
                </div>
                <Switch
                  checked={commissionAlerts}
                  onCheckedChange={setCommissionAlerts}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Operating Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="time"
                    placeholder="Start time"
                    value={operatingHoursStart}
                    onChange={(e) => setOperatingHoursStart(e.target.value)}
                  />
                  <Input
                    type="time"
                    placeholder="End time"
                    value={operatingHoursEnd}
                    onChange={(e) => setOperatingHoursEnd(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
        <RoleNav role={role} />
        <div className="lg:pl-64 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading settings...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {isLoadingProfile ? (
                <div className="text-center py-8 text-gray-500">
                  Loading profile...
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <IconInput
                      icon={<User className="w-4 h-4" />}
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isUpdatingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <IconInput
                      icon={<Mail className="w-4 h-4" />}
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isUpdatingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <IconInput
                      // icon={<Smartphone className="w-4 h-4" />}
                      placeholder="Your phone number"
                      value={phoneNo}
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                      icon={""}
                    />
                    <p className="text-xs text-gray-500">
                      Phone number cannot be changed
                    </p>
                  </div>
                </>
              )}
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
                  <label className="text-sm font-medium">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security (Coming soon)
                  </p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                  disabled
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium">Change PIN</label>
                <div className="space-y-3">
                  <div className="relative">
                    <IconInput
                      icon={<Lock className="w-4 h-4" />}
                      type={showOldPin ? "text" : "password"}
                      placeholder="Current PIN"
                      value={oldPin}
                      onChange={(e) => setOldPin(e.target.value)}
                      maxLength={5}
                      disabled={isChangingPin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPin(!showOldPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showOldPin ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <IconInput
                      icon={<Lock className="w-4 h-4" />}
                      type={showNewPin ? "text" : "password"}
                      placeholder="New PIN (5 digits)"
                      value={newPin}
                      onChange={(e) =>
                        setNewPin(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={5}
                      disabled={isChangingPin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPin(!showNewPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showNewPin ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <IconInput
                      icon={<Lock className="w-4 h-4" />}
                      type={showConfirmPin ? "text" : "password"}
                      placeholder="Confirm New PIN"
                      value={confirmPin}
                      onChange={(e) =>
                        setConfirmPin(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={5}
                      disabled={isChangingPin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPin(!showConfirmPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPin ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <Button
                    onClick={handleChangePin}
                    disabled={
                      isChangingPin || !oldPin || !newPin || !confirmPin
                    }
                    className="w-full"
                  >
                    {isChangingPin ? "Changing PIN..." : "Change PIN"}
                  </Button>
                </div>
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
                  <label className="text-sm font-medium">
                    Push Notifications
                  </label>
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
                  <label className="text-sm font-medium">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Role Specific Settings */}
          {renderRoleSpecificSettings()}

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleSaveProfile}
              disabled={isUpdatingProfile || isLoadingProfile}
              className="w-full sm:w-auto"
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUpdatingProfile || isLoadingProfile}
              className="w-full sm:w-auto"
            >
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
