import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, User, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useUserLoginMutation,
  useUserRegisterMutation,
} from "@/redux/api/authApi";
import { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import toast from "react-hot-toast";

interface JwtPayload extends DefaultJwtPayload {
  role?: string;
}
import { decodedToken } from "@/helpers/utils/jwt";
import { storeUserInfo } from "@/services/auth.service";
// import { toast } from "@/hooks/use-toast";
import useValidation from "@/hooks/useValidation"; // Import the custom hook

type AuthMode = "login" | "register";
type AccountType = "user" | "agent";

const Index = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPin, setShowPin] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("user");

  const [userRegister] = useUserRegisterMutation();
  const [userLogin] = useUserLoginMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    errors,
    validatePhone,
    validatePin,
    validateNid,
    validateName,
    validateEmail,
  } = useValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const phoneValue = (form.elements.namedItem("phoneNo") as HTMLInputElement)
      .value;
    const pinValue = (form.elements.namedItem("pin") as HTMLInputElement).value;
    const nidValue =
      authMode === "register"
        ? (form.elements.namedItem("nid") as HTMLInputElement)?.value
        : "";
    const nameValue =
      authMode === "register"
        ? (form.elements.namedItem("name") as HTMLInputElement)?.value
        : "";
    const emailValue =
      authMode === "register"
        ? (form.elements.namedItem("email") as HTMLInputElement)?.value
        : "";

    const isPhoneValid = validatePhone(phoneValue);
    const isPinValid = validatePin(pinValue);
    const isNidValid = authMode === "register" ? validateNid(nidValue) : true;
    const isNameValid =
      authMode === "register" ? validateName(nameValue) : true;
    const isEmailValid =
      authMode === "register" ? validateEmail(emailValue) : true;

    if (
      isPhoneValid &&
      isPinValid
      // &&
      // isNidValid
      // &&
      // isNameValid &&
      // isEmailValid
    ) {
      try {
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData);

        if (authMode === "register") {
          const data = {
            name: formValues.name,
            phoneNo: formValues.phoneNo,
            email: formValues.email,
            pin: formValues.pin,
            role: accountType,
            nid: formValues.nid,
          };

          const res = await userRegister(data).unwrap();

          const responseToken =
            "error" in res ? undefined : res.data?.accessToken;

          if ("data" in res && res.data?.accessToken) {
            setIsLoading(!isLoading);

            toast.success("User registered successfully!");

            const decodedData: JwtPayload = decodedToken(responseToken);

            if (decodedData?.role === "user") {
              navigate("/dashboard/user");
            } else if (decodedData?.role === "agent") {
              navigate("/dashboard/agent");
            } else {
              navigate("/dashboard/admin");
            }

            storeUserInfo({ accessToken: res?.data?.accessToken });
          } else {
            setIsLoading(false);
            // navigate("/login");
            return toast.error("Error creating user!");
          }
        } else {
          const loginData = {
            phoneNo: formValues.phoneNo,
            pin: formValues.pin,
          };

          const res = await userLogin(loginData);

          const responseToken =
            "error" in res ? undefined : res.data?.data?.accessToken;

          if ("data" in res && res.data?.data?.accessToken) {
            setIsLoading(!isLoading);

            toast.success("User logged in successfully!");

            const decodedData: JwtPayload = decodedToken(responseToken);

            if (decodedData?.role === "user") {
              navigate("/dashboard/user");
            } else if (decodedData?.role === "agent") {
              navigate("/dashboard/agent");
            } else {
              navigate("/dashboard/admin");
            }

            storeUserInfo({ accessToken: res?.data?.data?.accessToken });
          } else {
            setIsLoading(false);
            // navigate("/login");
            return toast.error("Wrong credential!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Area */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-800">WalletWaves</h2>
          <p className="text-primary-600 mt-2">
            Secure Mobile Financial Services
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          {/* Auth Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
                authMode === "login"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
                authMode === "register"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Register
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phoneNo"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                    errors.phone
                      ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                      : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  }`}
                  placeholder="Enter phone number"
                  onChange={(e) => validatePhone(e.target.value)}
                  inputMode="numeric"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {authMode === "register" && (
              <>
                {/* Name Input */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                        errors.name
                          ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                          : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      }`}
                      placeholder="Enter your full name"
                      onChange={(e) => validateName(e.target.value)}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                        errors.email
                          ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                          : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      }`}
                      placeholder="Enter your email"
                      onChange={(e) => validateEmail(e.target.value)}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </>
            )}

            {/* PIN Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                5-Digit PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  name="pin"
                  maxLength={5}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                    errors.pin
                      ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                      : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  }`}
                  placeholder="Enter 5-digit PIN"
                  onChange={(e) => validatePin(e.target.value)}
                  inputMode="numeric"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPin ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.pin && (
                <p className="text-red-500 text-xs mt-1">{errors.pin}</p>
              )}
            </div>

            {/* Registration-specific fields */}
            {authMode === "register" && (
              <>
                {/* NID Input */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    National ID (NID)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nid"
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                        errors.nid
                          ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                          : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      }`}
                      placeholder="Enter NID number"
                      onChange={(e) => validateNid(e.target.value)}
                      inputMode="numeric"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.nid && (
                    <p className="text-red-500 text-xs mt-1">{errors.nid}</p>
                  )}
                </div>

                {/* Account Type Selection */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={accountType}
                    onChange={(e) =>
                      setAccountType(e.target.value as AccountType)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="user">User Account</option>
                    <option value="agent">Agent Account</option>
                  </select>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-white rounded-lg py-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {authMode === "login" ? "Login" : "Create Account"}
            </button>

            {/* Forgot PIN Link */}
            {authMode === "login" && (
              <div className="text-center mt-4">
                <Link
                  to="/forgot-pin"
                  className="text-primary-600 hover:text-primary-700 text-sm transition-colors duration-200"
                >
                  Forgot PIN?
                </Link>
              </div>
            )}
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Protected by industry-leading security
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
