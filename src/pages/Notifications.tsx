import RoleNav from "@/components/RoleNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction, User, UserInfo } from "@/interface/interfsces";
import { cn, transformToNotifications } from "@/lib/utils";
import { useGettransactionHistoryQuery } from "@/redux/api/transactionApi";
import {
  useGetAllUserQuery,
  useTransactionHistoryQuery,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Info,
  XCircle,
} from "lucide-react";

interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const getAdminNotifications = (
  pendingAgentsCount: number,
  totalTransactions: number,
  recentTransactions: Transaction[]
): Notification[] => {
  const adminNotifications: Notification[] = [];

  // Pending agent approvals
  if (pendingAgentsCount > 0) {
    adminNotifications.push({
      id: Date.now() + 1,
      type: "warning",
      title: "Agent Verification Required",
      message: `${pendingAgentsCount} agent${
        pendingAgentsCount > 1 ? "s" : ""
      } pending approval.`,
      time: "Just now",
      read: false,
    });
  }

  // High transaction volume alert
  if (totalTransactions > 100) {
    adminNotifications.push({
      id: Date.now() + 2,
      type: "info",
      title: "High Transaction Volume",
      message: `${totalTransactions} transactions processed today. System performing well.`,
      time: "Just now",
      read: false,
    });
  }

  // Recent high-value transactions
  const highValueTransactions = recentTransactions
    .filter((t: Transaction) => t.amount > 10000)
    .slice(0, 3);

  highValueTransactions.forEach((transaction: Transaction, index: number) => {
    const senderName =
      typeof transaction.from === "object" && "name" in transaction.from
        ? transaction.from.name
        : "Unknown";
    const receiverName =
      typeof transaction.to === "object" && "name" in transaction.to
        ? transaction.to.name
        : "Unknown";

    // Calculate time ago
    const now = new Date();
    const transactionDate = new Date(transaction.createdAt);
    const diffInSeconds = Math.floor(
      (now.getTime() - transactionDate.getTime()) / 1000
    );
    let timeAgo = "";
    if (diffInSeconds < 60) {
      timeAgo = `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
    }

    adminNotifications.push({
      id: Date.now() + 10 + index,
      type: "info",
      title: "High-Value Transaction",
      message: `${senderName} sent ${transaction.amount} Taka to ${receiverName}`,
      time: timeAgo,
      read: false,
    });
  });

  return adminNotifications;
};

const getNotificationsByRole = (
  role: "user" | "agent" | "admin",
  baseNotifications: Notification[],
  adminNotifications: Notification[] = []
): Notification[] => {
  const agentNotifications: Notification[] = [];

  switch (role) {
    case "admin":
      return [
        ...adminNotifications,
        ...baseNotifications,
        ...agentNotifications,
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

const Notifications = ({ role = "user" }: NotificationsProps) => {
  const userInfo: UserInfo | string = getUserInfo();
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUserQuery({});

  const user: User | undefined = usersData?.data?.find(
    (user: User) =>
      typeof userInfo !== "string" && user.phoneNo === userInfo?.contactNo
  );

  // For admin, fetch all transactions; for others, fetch user-specific
  const isAdmin = role === "admin";
  const shouldFetchTransactions = isAdmin ? true : !!user?._id;
  const query = isAdmin
    ? undefined
    : shouldFetchTransactions
    ? { userId: user._id }
    : undefined;

  const {
    data,
    isLoading: isLoadingTransactions,
    error: transactionError,
  } = useGettransactionHistoryQuery(query || {}, {
    skip: !shouldFetchTransactions,
  });

  // For admin, also fetch all transactions from admin endpoint
  const { data: adminTransactionsData, isLoading: isLoadingAdminTransactions } =
    useTransactionHistoryQuery(undefined, {
      skip: !isAdmin,
    });

  // Use appropriate transactions based on role
  const transactions = isAdmin
    ? adminTransactionsData?.data || data?.data || []
    : data?.data || [];

  // Calculate pending agents for admin
  const pendingAgents = isAdmin
    ? usersData?.data?.filter(
        (u: User) => u.role === "agent" && !u.isApproved
      ) || []
    : [];

  // Transform transactions to notifications
  // Admin sees all transactions, users see only their own
  const baseNotifications: Notification[] = transformToNotifications(
    transactions,
    isAdmin ? undefined : user?._id,
    isAdmin
  );

  // Generate admin-specific notifications
  const adminNotifications = isAdmin
    ? getAdminNotifications(
        pendingAgents.length,
        transactions.length,
        transactions.slice(0, 10) // Recent 10 transactions
      )
    : [];

  const notifications: Notification[] = getNotificationsByRole(
    role,
    baseNotifications,
    adminNotifications
  );

  // Show loading state
  if (
    isLoadingUsers ||
    isLoadingTransactions ||
    (isAdmin && isLoadingAdminTransactions)
  ) {
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600">Loading notifications...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (transactionError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
        <RoleNav role={role} />
        <div className="lg:pl-64 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center text-red-600">
                  Failed to load notifications. Please try again.
                </div>
              </CardContent>
            </Card>
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
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">
                    No notifications yet
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {role === "admin"
                      ? "System notifications will appear here"
                      : "Your transaction notifications will appear here"}
                  </p>
                </div>
              ) : (
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
                          <p className="text-gray-600">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
