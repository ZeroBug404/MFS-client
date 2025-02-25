
import RoleNav from "@/components/RoleNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const getNotificationsByRole = (role: "user" | "agent" | "admin"): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: 1,
      type: "success",
      title: "Transaction Successful",
      message: "Your last transaction has been processed successfully.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "System Update",
      message: "The system will undergo maintenance in 24 hours.",
      time: "1 hour ago",
      read: true,
    },
  ];

  const agentNotifications: Notification[] = [
    {
      id: 3,
      type: "warning",
      title: "Low Cash Balance",
      message: "Your cash balance is running low. Please add funds.",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: "Commission Earned",
      message: "You've earned $50 in commission today.",
      time: "2 hours ago",
      read: true,
    },
  ];

  const adminNotifications: Notification[] = [
    {
      id: 5,
      type: "error",
      title: "System Alert",
      message: "High transaction volume detected. Please monitor.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 6,
      type: "warning",
      title: "Agent Verification Required",
      message: "New agent registration pending approval.",
      time: "1 hour ago",
      read: true,
    },
  ];

  switch (role) {
    case "admin":
      return [...baseNotifications, ...agentNotifications, ...adminNotifications];
    case "agent":
      return [...baseNotifications, ...agentNotifications];
    default:
      return baseNotifications;
  }
};

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "error":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

interface NotificationsProps {
  role: "user" | "agent" | "admin";
}

const Notifications = ({ role = "user" }: NotificationsProps) => {
  const notifications = getNotificationsByRole(role);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role={role} />
      <div className="lg:pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest alerts</p>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Notifications</span>
                <span className="text-sm font-normal text-gray-500">
                  {notifications.length} notifications
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 rounded-lg border transition-colors",
                      notification.read
                        ? "bg-gray-50/50 border-gray-100"
                        : "bg-white border-gray-200"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
