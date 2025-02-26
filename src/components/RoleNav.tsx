/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Home,
  Send,
  DollarSign,
  Bell,
  User,
  Menu,
  Users,
  Activity,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Role = "user" | "agent" | "admin";

interface NavItem {
  icon: any;
  label: string;
  path: string;
  roles: Role[];
  onClick?: () => void; // Add onClick handler for custom actions like logout
}

const RoleNav = ({ role }: { role: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { role: urlRole } = useParams();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove access token
    navigate("/login"); // Navigate to login page
  };

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
      roles: ["user", "agent", "admin"],
    },
    // { icon: Send, label: "Send Money", path: "/send", roles: ["user"] },
    // {
    //   icon: DollarSign,
    //   label: "Cash Actions",
    //   path: "/cash",
    //   roles: ["user", "agent"],
    // },
    {
      icon: Bell,
      label: "Notifications",
      path: "/notifications",
      roles: ["user", "agent", "admin"],
    },
    { icon: Users, label: "User Management", path: "/users", roles: ["admin"] },
    {
      icon: Activity,
      label: "System Metrics",
      path: "/metrics",
      roles: ["admin"],
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      roles: ["user", "agent", "admin"],
    },
    {
      icon: LogOut,
      label: "Log out",
      path: "/login", // Path is not used for logout, but kept for consistency
      roles: ["user", "agent", "admin"],
      onClick: handleLogout, // Add onClick handler for logout
    },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  // const handleRoleChange = (newRole: Role) => {
  //   const currentPath = window.location.pathname;
  //   const basePath = currentPath.split("/")[1];
  //   navigate(`/${basePath}/${newRole}`);
  // };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary text-white p-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 fixed left-0 top-0 flex-col p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">WalletWaves</p>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const itemPath = `${item.path}${
              item.roles.includes(role) ? `/${role}` : ""
            }`;
            return (
              <div
                key={item.path}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick(); // Handle logout
                  } else {
                    navigate(itemPath); // Navigate to other pages
                  }
                }} // Handle onClick for logout
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 cursor-pointer"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-screen w-64 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WalletWaves</p>
                      <p className="text-sm text-gray-500 capitalize">{role}</p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  {filteredItems.map((item) => {
                    const itemPath = `${item.path}${
                      item.roles.includes(role) ? `/${role}` : ""
                    }`;
                    return (
                      <div
                        key={item.path}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick(); // Handle logout
                          } else {
                            navigate(itemPath); // Navigate to other pages
                          }
                          setIsOpen(false); // Close mobile menu
                        }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 cursor-pointer"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleNav;
