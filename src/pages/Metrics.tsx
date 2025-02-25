import RoleNav from "@/components/RoleNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp, Users, Wallet } from "lucide-react";

// Mock data - replace with actual data later
const transactionData = [
  { date: "Mon", amount: 15000 },
  { date: "Tue", amount: 25000 },
  { date: "Wed", amount: 18000 },
  { date: "Thu", amount: 30000 },
  { date: "Fri", amount: 28000 },
  { date: "Sat", amount: 35000 },
  { date: "Sun", amount: 40000 },
];

const userActivityData = [
  { time: "00:00", users: 120 },
  { time: "04:00", users: 80 },
  { time: "08:00", users: 250 },
  { time: "12:00", users: 480 },
  { time: "16:00", users: 380 },
  { time: "20:00", users: 290 },
  { time: "23:59", users: 150 },
];

const revenueDistribution = [
  { name: "Transfer Fees", value: 45 },
  { name: "Cash In", value: 30 },
  { name: "Cash Out", value: 25 },
];

const agentPerformance = [
  { name: "Agent A", transactions: 150, revenue: 3000 },
  { name: "Agent B", transactions: 120, revenue: 2400 },
  { name: "Agent C", transactions: 180, revenue: 3600 },
  { name: "Agent D", transactions: 90, revenue: 1800 },
  { name: "Agent E", transactions: 200, revenue: 4000 },
];

const Metrics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role="admin" />
      <div className="lg:pl-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header with time range selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Metrics</h1>
              <p className="text-gray-600">Monitor system performance and financial metrics</p>
            </div>
            <Select defaultValue="7d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Volume</p>
                    <h3 className="text-2xl font-bold mt-2">$168,793</h3>
                  </div>
                  <span className="flex items-center text-green-600 text-sm">
                    <ArrowUp className="w-4 h-4" />
                    12.5%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Users</p>
                    <h3 className="text-2xl font-bold mt-2">1,234</h3>
                  </div>
                  <span className="flex items-center text-green-600 text-sm">
                    <ArrowUp className="w-4 h-4" />
                    8.2%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Success Rate</p>
                    <h3 className="text-2xl font-bold mt-2">98.7%</h3>
                  </div>
                  <span className="flex items-center text-red-600 text-sm">
                    <ArrowDown className="w-4 h-4" />
                    0.3%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <h3 className="text-2xl font-bold mt-2">$12,486</h3>
                  </div>
                  <span className="flex items-center text-green-600 text-sm">
                    <ArrowUp className="w-4 h-4" />
                    15.3%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Volume Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Daily transaction volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={transactionData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2A5C8A" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2A5C8A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
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

            {/* User Activity */}
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#27AE60"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue breakdown by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {revenueDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={[
                              "#2A5C8A",
                              "#27AE60",
                              "#F59E0B",
                            ][index % 3]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Agent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Agent Performance</CardTitle>
                <CardDescription>Transaction count and revenue by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#2A5C8A" />
                      <YAxis yAxisId="right" orientation="right" stroke="#27AE60" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="transactions"
                        fill="#2A5C8A"
                        name="Transactions"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="revenue"
                        fill="#27AE60"
                        name="Revenue"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
