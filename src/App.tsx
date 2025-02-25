
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import CashActions from "./pages/CashActions";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper components to handle role parameter
const DashboardWrapper = () => {
  const { role } = useParams();
  if (!role || !["user", "admin", "agent"].includes(role)) {
    return <Navigate to="/dashboard/user" replace />;
  }
  return <Dashboard role={role as "user" | "admin" | "agent"} />;
};

const NotificationsWrapper = () => {
  const { role } = useParams();
  if (!role || !["user", "admin", "agent"].includes(role)) {
    return <Navigate to="/notifications/user" replace />;
  }
  return <Notifications role={role as "user" | "admin" | "agent"} />;
};

const SettingsWrapper = () => {
  const { role } = useParams();
  if (!role || !["user", "admin", "agent"].includes(role)) {
    return <Navigate to="/settings/user" replace />;
  }
  return <Settings role={role as "user" | "admin" | "agent"} />;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/user" replace />} />
            <Route path="/dashboard/:role" element={<DashboardWrapper />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/cash" element={<CashActions />} />
            <Route path="/notifications/:role" element={<NotificationsWrapper />} />
            <Route path="/users/:role" element={<UserManagement />} />
            <Route path="/metrics/:role" element={<Metrics />} />
            <Route path="/settings/:role" element={<SettingsWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
