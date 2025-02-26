import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { Provider } from "react-redux";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import CashActions from "./pages/CashActions";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./routes/PrivateRoutes";
import { decodedToken } from "./helpers/utils/jwt";
import { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { getUserInfo } from "./services/auth.service";
import UserNotifications from "./pages/UserNotifications";

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
                <Route path="/" element={<Index />} />
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
