
import RoleNav from "@/components/RoleNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, CheckCircle2, MoreHorizontal, Search, Shield, User, UserCog, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data - replace with actual data later
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    phone: "+880 1234567890",
    type: "agent",
    status: "pending",
    lastActive: "2024-03-10T14:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+880 1234567891",
    type: "user",
    status: "active",
    lastActive: "2024-03-12T09:15:00",
  },
  // Add more mock users as needed
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  // Filter users based on search query and active tab
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    if (activeTab === "pending") {
      return matchesSearch && user.status === "pending";
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role="admin" />
      <div className="lg:pl-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="mt-1 text-gray-600">Manage users and approve agent requests</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white/80 backdrop-blur-lg rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary-600">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Total Users</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 text-secondary-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Active Agents</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">56</p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Tab Filters */}
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  onClick={() => setActiveTab("all")}
                >
                  All Users
                </Button>
                <Button
                  variant={activeTab === "pending" ? "default" : "outline"}
                  onClick={() => setActiveTab("pending")}
                  className="flex items-center gap-2"
                >
                  <UserCog className="w-4 h-4" />
                  Pending Approvals
                </Button>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                          user.type === "agent"
                            ? "bg-primary-50 text-primary-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {user.type === "agent" ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        {user.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                          {
                            "bg-green-50 text-green-700":
                              user.status === "active",
                            "bg-yellow-50 text-yellow-700":
                              user.status === "pending",
                            "bg-red-50 text-red-700":
                              user.status === "blocked",
                          }
                        )}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === "pending" ? (
                            <>
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="w-4 h-4 mr-2" />
                              {user.status === "blocked" ? "Unblock" : "Block"}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
