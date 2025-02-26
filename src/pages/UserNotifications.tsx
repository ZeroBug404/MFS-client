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
import { cn, transformToNotifications } from "@/lib/utils";
import { useGettransactionHistoryQuery } from "@/redux/api/transactionApi";
import { User, UserInfo, UsersData } from "@/interface/interfsces";
import {
  useGetAllUserQuery,
  useTransactionHistoryQuery,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const getNotificationsByRole = (
  role: "user" | "agent" | "admin",
  baseNotifications: Notification[]
): Notification[] => {
  const agentNotifications: Notification[] = [];

  const adminNotifications: Notification[] = [];

  switch (role) {
    case "admin":
      return [
        ...baseNotifications,
        ...agentNotifications,
        ...adminNotifications,
      ];
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

const UserNotifications = () => {
  const { userId } = useParams();
  const userInfo: UserInfo | string = getUserInfo();
  const { data: usersData }: { data?: UsersData } = useGetAllUserQuery({});

  const user: User | undefined = usersData?.data?.find(
    (user: User) => typeof userInfo !== "string" && user._id === userId
  );

  console.log(user);

  const { data } = useTransactionHistoryQuery({});

  console.log(data);

  const transactions = data?.data?.filter(
    (transaction) =>
      transaction.from._id === user?._id || transaction.to._id === user?._id
  );

  const baseNotifications: Notification[] = transformToNotifications(
    transactions || []
  );

  const notifications: Notification[] = getNotificationsByRole(
    "admin",
    baseNotifications
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role="admin" />
      <div className="lg:pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-gray-600">
                Stay updated with your latest alerts
              </p>
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

export default UserNotifications;
