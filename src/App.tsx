import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Loader from "./components/ui/Loader";
import CashActions from "./pages/CashActions";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Metrics from "./pages/Metrics";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import SendMoney from "./pages/SendMoney";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import UserNotifications from "./pages/UserNotifications";
import { store } from "./redux/store";
import PrivateRoutes from "./routes/PrivateRoutes";
import { getUserInfo } from "./services/auth.service";

interface JwtPayload extends DefaultJwtPayload {
  role?: "user" | "admin" | "agent";
}

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

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const userInfo = getUserInfo();

  const role = userInfo && typeof userInfo !== "string" ? userInfo.role : null;

  console.log("role", role);

  return loading ? (
    <>
      <Loader />
      <Toaster />
    </>
  ) : (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Index />} />
                <Route path="/register" element={<Index />} />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoutes>
                      <Navigate to={`/dashboard/${role}`} replace />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/dashboard/:role"
                  element={
                    <PrivateRoutes>
                      <DashboardWrapper />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/send"
                  element={
                    <PrivateRoutes>
                      <SendMoney />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/cash"
                  element={
                    <PrivateRoutes>
                      <CashActions />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/notifications/:role"
                  element={
                    <PrivateRoutes>
                      <NotificationsWrapper />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/users/notifications/:userId"
                  element={<UserNotifications />}
                />
                <Route
                  path="/users/:role"
                  element={
                    <PrivateRoutes>
                      <UserManagement />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/metrics/:role"
                  element={
                    <PrivateRoutes>
                      <Metrics />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/settings/:role"
                  element={
                    <PrivateRoutes>
                      <SettingsWrapper />
                    </PrivateRoutes>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
      <Toaster />
    </>
  );
};

export default App;
