import RoleNav from "@/components/RoleNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useGetAllUserQuery, useGetBalanceQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart,
  Clock,
  DollarSign,
  Send,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const transactionHistory = [
  { time: "00:00", amount: 1200 },
  { time: "04:00", amount: 1800 },
  { time: "08:00", amount: 2400 },
  { time: "12:00", amount: 3600 },
  { time: "16:00", amount: 2800 },
  { time: "20:00", amount: 2000 },
];

const recentTransactions = [
  {
    id: 1,
    type: "send",
    amount: 500,
    recipient: "Sarah Johnson",
    time: "2 minutes ago",
    status: "completed",
  },
  {
    id: 2,
    type: "receive",
    amount: 1200,
    sender: "Mike Smith",
    time: "15 minutes ago",
    status: "completed",
  },
  {
    id: 3,
    type: "send",
    amount: 750,
    recipient: "Alex Wong",
    time: "1 hour ago",
    status: "pending",
  },
];

interface DashboardProps {
  role: "user" | "agent" | "admin";
}

const Dashboard = ({ role }: DashboardProps) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  interface User {
    _id: string;
    phoneNo: string;
    role: string;
    isApproved: boolean;
  }

  interface UsersData {
    data: User[];
  }

  interface UserInfo {
    contactNo: string;
  }

  const userInfo: UserInfo | string = getUserInfo();

  const { data: usersData }: { data?: UsersData } = useGetAllUserQuery({});

  const user: User | undefined = usersData?.data?.find(
    (user: User) =>
      typeof userInfo !== "string" && user.phoneNo === userInfo?.contactNo
  );
  // console.log(usersData.data.length - 1);

  // the user data is not available in the first render
  // so we need to check if the user data is available
  // before

  const query = {
    userId: user?._id,
    role: user?.role,
  };

  // console.log(query);

  const { data: userBalance, isLoading } = useGetBalanceQuery(query);

  const handleSendMoney = () => {
    toast({
      title: "Money Sent",
      description: `Successfully sent $${amount} to ${recipient}`,
    });
  };

  const handleAddFunds = () => {
    toast({
      title: "Funds Added",
      description: `Successfully added $${amount} to your account`,
    });
  };

  const totalUser = usersData?.data?.length - 1;

  const activeAgents = usersData?.data?.filter(
    (user: User) => user.role === "agent" && user?.isApproved
  ).length;
 
  const totalBalance = userBalance?.data?.total;

  const renderRoleSpecificContent = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Total Users
                      </p>
                      <h3 className="text-2xl font-bold">{totalUser}</h3>
                    </div>
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span>12% increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        System Revenue
                      </p>
                      <h3 className="text-2xl font-bold">{totalBalance}</h3>
                    </div>
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span>8.3% increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Active Agents
                      </p>
                      <h3 className="text-2xl font-bold">{activeAgents}</h3>
                    </div>
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Updated live</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        System Health
                      </p>
                      <h3 className="text-2xl font-bold">98.2%</h3>
                    </div>
                    <BarChart className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: "98.2%" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Charts */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={transactionHistory}>
                      <defs>
                        <linearGradient
                          id="colorAmount"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2A5C8A"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2A5C8A"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#2A5C8A"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "agent":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Today's Transactions
                      </p>
                      <h3 className="text-2xl font-bold">42</h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span>15% increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Cash Balance
                      </p>
                      <h3 className="text-2xl font-bold">$8,540</h3>
                    </div>
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Last updated 5m ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Commission Earned
                      </p>
                      <h3 className="text-2xl font-bold">$234</h3>
                    </div>
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span>8% increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Customer Rating
                      </p>
                      <h3 className="text-2xl font-bold">4.8/5</h3>
                    </div>
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agent Transaction History */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            transaction.type === "send"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          )}
                        >
                          {transaction.type === "send" ? (
                            <ArrowUp className="w-5 h-5" />
                          ) : (
                            <ArrowDown className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "send"
                              ? `Processed withdrawal for ${transaction.recipient}`
                              : `Processed deposit from ${transaction.sender}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${transaction.amount}
                        </p>
                        <p
                          className={cn(
                            "text-sm",
                            transaction.status === "completed"
                              ? "text-green-600"
                              : "text-yellow-600"
                          )}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      default: // User role
        return (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, User!
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Money</DialogTitle>
                      <DialogDescription>
                        Enter the recipient and amount to send
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="recipient">Recipient</label>
                        <Input
                          id="recipient"
                          placeholder="Enter recipient name"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="amount">Amount</label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSendMoney}>Send Money</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount to add to your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="addAmount">Amount</label>
                        <Input
                          id="addAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddFunds}>Add Funds</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Total Balance
                      </p>
                      <h3 className="text-2xl font-bold">$12,580</h3>
                    </div>
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      8.2%
                    </span>
                  </div>
                  <div className="h-[60px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={transactionHistory}>
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#2A5C8A"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Monthly Spending
                      </p>
                      <h3 className="text-2xl font-bold">$4,230</h3>
                    </div>
                    <span className="flex items-center text-red-600 text-sm font-medium">
                      <ArrowDown className="w-4 h-4 mr-1" />
                      3.1%
                    </span>
                  </div>
                  <div className="h-[60px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={transactionHistory}>
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#27AE60"
                          fill="#27AE60"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Daily Transactions
                      </p>
                      <h3 className="text-2xl font-bold">32</h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Last updated 5 minutes ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">
                        Active Goals
                      </p>
                      <h3 className="text-2xl font-bold">3/5</h3>
                    </div>
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      On Track
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Activity */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            transaction.type === "send"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          )}
                        >
                          {transaction.type === "send" ? (
                            <ArrowUp className="w-5 h-5" />
                          ) : (
                            <ArrowDown className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "send"
                              ? `Sent to ${transaction.recipient}`
                              : `Received from ${transaction.sender}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={cn(
                            "font-medium",
                            transaction.type === "send"
                              ? "text-red-600"
                              : "text-green-600"
                          )}
                        >
                          {transaction.type === "send" ? "-" : "+"}$
                          {transaction.amount}
                        </p>
                        <p
                          className={cn(
                            "text-sm",
                            transaction.status === "completed"
                              ? "text-green-600"
                              : "text-yellow-600"
                          )}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Chart */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={transactionHistory}>
                      <defs>
                        <linearGradient
                          id="colorAmount"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2A5C8A"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2A5C8A"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#2A5C8A"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role={role} />
      <div className="lg:pl-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {renderRoleSpecificContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
