
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Mail, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

type AuthMode = "login" | "register";
type AccountType = "user" | "agent";

const Index = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPin, setShowPin] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle auth submission
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
          <p className="text-primary-600 mt-2">Secure Mobile Financial Services</p>
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
            {/* Phone/Email Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 pl-10"
                  placeholder="Enter phone or email"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* PIN Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                5-Digit PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  maxLength={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 pl-10"
                  placeholder="Enter 5-digit PIN"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200 pl-10"
                      placeholder="Enter NID number"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Account Type Selection */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Account Type
                  </label>
                  <select
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
