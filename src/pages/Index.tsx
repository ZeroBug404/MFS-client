import { decodedToken } from "@/helpers/utils/jwt";
import {
  useUserLoginMutation,
  useUserRegisterMutation,
} from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { motion } from "framer-motion";
import { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface JwtPayload extends DefaultJwtPayload {
  role?: string;
}
// import { toast } from "@/hooks/use-toast";
import loginLogo from "@/assets/image/E-Wallet-bro.png";
import useValidation from "@/hooks/useValidation"; // Import the custom hook

type AuthMode = "login" | "register";
type AccountType = "user" | "agent";

const Index = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPin, setShowPin] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("user");

  const [userRegister, { isLoading: isRegisterLoading }] =
    useUserRegisterMutation();
  const [userLogin, { isLoading: isLoginLoading }] = useUserLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      setErrorMessage("");
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

          if (res?.data?.accessToken) {
            toast.success("User registered successfully!");

            const decodedData: JwtPayload = decodedToken(res.data.accessToken);

            if (decodedData?.role === "user") {
              navigate("/dashboard/user");
            } else if (decodedData?.role === "agent") {
              navigate("/dashboard/agent");
            } else {
              navigate("/dashboard/admin");
            }

            storeUserInfo({ accessToken: res.data.accessToken });
          }
        } else {
          const loginData = {
            phoneNo: formValues.phoneNo,
            pin: formValues.pin,
          };

          const res = await userLogin(loginData).unwrap();

          if (res?.data?.accessToken) {
            toast.success("User logged in successfully!");

            const decodedData: JwtPayload = decodedToken(res.data.accessToken);

            if (decodedData?.role === "user") {
              navigate("/dashboard/user");
            } else if (decodedData?.role === "agent") {
              navigate("/dashboard/agent");
            } else {
              navigate("/dashboard/admin");
            }

            storeUserInfo({ accessToken: res.data.accessToken });
          }
        }
      } catch (error: any) {
        console.error("Auth error:", error);

        // Extract error message from API response
        let errorMsg = "An unexpected error occurred. Please try again.";

        if (error?.data?.message) {
          errorMsg = error.data.message;
        } else if (error?.data?.errorSources?.[0]?.message) {
          errorMsg = error.data.errorSources[0].message;
        } else if (error?.message) {
          errorMsg = error.message;
        } else if (error?.status === "FETCH_ERROR") {
          errorMsg =
            "Network error. Please check your connection and try again.";
        } else if (error?.status === "PARSING_ERROR") {
          errorMsg = "Invalid response from server. Please try again.";
        }

        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="flex items-center justify-around lg:gap-20">
        <div className="lg:flex-1">
          <img className="hidden lg:flex w-[30rem]" src={loginLogo} alt="" />
        </div>
        <div className="lg:flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Logo Area */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-800">
                WalletWaves
              </h2>
              <p className="text-primary-600 mt-2">
                Secure Mobile Financial Services
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              {/* Auth Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setErrorMessage("");
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
                    authMode === "login"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setErrorMessage("");
                  }}
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
                      disabled={isRegisterLoading || isLoginLoading}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                        errors.phone
                          ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                          : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      } ${
                        isRegisterLoading || isLoginLoading
                          ? "opacity-60 cursor-not-allowed"
                          : ""
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
                          disabled={isRegisterLoading || isLoginLoading}
                          className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                            errors.name
                              ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                              : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                          } ${
                            isRegisterLoading || isLoginLoading
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Enter your full name"
                          onChange={(e) => validateName(e.target.value)}
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
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
                          disabled={isRegisterLoading || isLoginLoading}
                          className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                            errors.email
                              ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                              : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                          } ${
                            isRegisterLoading || isLoginLoading
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Enter your email"
                          onChange={(e) => validateEmail(e.target.value)}
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
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
                      disabled={isRegisterLoading || isLoginLoading}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                        errors.pin
                          ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                          : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      } ${
                        isRegisterLoading || isLoginLoading
                          ? "opacity-60 cursor-not-allowed"
                          : ""
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
                          disabled={isRegisterLoading || isLoginLoading}
                          className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 pl-10 ${
                            errors.nid
                              ? "border-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent"
                              : "border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                          } ${
                            isRegisterLoading || isLoginLoading
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Enter NID number"
                          onChange={(e) => validateNid(e.target.value)}
                          inputMode="numeric"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.nid && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nid}
                        </p>
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
                        disabled={isRegisterLoading || isLoginLoading}
                        onChange={(e) =>
                          setAccountType(e.target.value as AccountType)
                        }
                        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 appearance-none bg-white ${
                          isRegisterLoading || isLoginLoading
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="user">User Account</option>
                        <option value="agent">Agent Account</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Error Message Display */}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isRegisterLoading || isLoginLoading}
                  className={`w-full bg-primary hover:bg-primary-600 text-white rounded-lg py-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isRegisterLoading || isLoginLoading
                      ? "opacity-70 cursor-not-allowed hover:scale-100"
                      : ""
                  }`}
                >
                  {(isRegisterLoading || isLoginLoading) && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  {authMode === "login"
                    ? isLoginLoading
                      ? "Logging in..."
                      : "Login"
                    : isRegisterLoading
                    ? "Creating Account..."
                    : "Create Account"}
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
      </div>
    </div>
  );
};

export default Index;
