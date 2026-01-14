import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth.service";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Lock,
  PiggyBank,
  Plane,
  Quote,
  Receipt,
  Send,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const userInfo = getUserInfo();
  const isLoggedIn = userInfo && typeof userInfo !== "string";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly with our lightning-fast transaction system.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your money is protected with industry-leading encryption and security protocols.",
    },
    {
      icon: Globe,
      title: "24/7 Availability",
      description:
        "Access your account and make transactions anytime, anywhere in the world.",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Designed for mobile devices with a seamless experience across all platforms.",
    },
    {
      icon: CreditCard,
      title: "Easy Cash Management",
      description: "Manage your cash-in and cash-out operations effortlessly.",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description:
        "Your personal and financial information is kept completely private.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Transactions", value: "1M+", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Clock },
    { label: "Rating", value: "4.9/5", icon: Star },
  ];

  const futureFeatures = [
    {
      icon: ShoppingBag,
      title: "Merchant Payments",
      description:
        "Scan QR codes and pay at thousands of merchant outlets nationwide.",
    },
    {
      icon: Receipt,
      title: "Utility Bill Pay",
      description:
        "Pay your electricity, water, and gas bills instantly from your app.",
    },
    {
      icon: PiggyBank,
      title: "Smart Savings",
      description:
        "Grow your wealth with high-yield savings accounts and fixed deposits.",
    },
    {
      icon: Plane,
      title: "Global Remittance",
      description:
        "Receive money from loved ones abroad directly into your wallet.",
    },
  ];

  const howItWorks = [
    {
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up in minutes with your NID and Phone number.",
    },
    {
      icon: Banknote,
      title: "Add Money",
      description: "Cash in at any agent point or link your bank account.",
    },
    {
      icon: Send,
      title: "Start Transacting",
      description: "Send money, pay bills, and recharge instantly.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Small Business Owner",
      text: "AmarCash has made managing my shop's payments so much easier. The agent app is a lifesaver!",
    },
    {
      name: "Rahim U.",
      role: "Freelancer",
      text: "I receive payments from my clients instantly. The security features give me peace of mind.",
    },
    {
      name: "Tanvir H.",
      role: "Student",
      text: "Best app for mobile recharge and sending money to friends. Super fast and reliable.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-primary-800">
                AmarCash
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link to="/dashboard">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Secure Mobile
              <br />
              <span className="text-primary-600">Financial Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Send money, manage cash, and handle transactions with ease. Built
              for modern financial needs with security at its core.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!isLoggedIn && (
                <>
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-6"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6 border-2"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose AmarCash?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for secure and efficient financial
              transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with AmarCash in three simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-primary-200 -z-0" />

            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-primary-50">
                  <step.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built for Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AmarCash is designed to serve users, agents, and
                administrators with a comprehensive mobile financial service
                platform. Whether you're sending money to friends, managing cash
                operations, or overseeing the entire system, we've got you
                covered.
              </p>
              <div className="space-y-4">
                {[
                  "Secure and encrypted transactions",
                  "Real-time balance updates",
                  "Multi-role support (User, Agent, Admin)",
                  "Comprehensive transaction history",
                  "Easy cash-in and cash-out operations",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Shield className="w-16 h-16 text-primary-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    Secure by Design
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-800 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-800 rounded-full opacity-50 translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              See what our users have to say about their experience with AmarCash.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-800/50 backdrop-blur-sm p-8 rounded-2xl border border-primary-700 hover:bg-primary-800 transition-colors"
              >
                <Quote className="w-10 h-10 text-primary-400 mb-6 opacity-50" />
                <p className="text-lg text-primary-100 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-bold text-white text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary-300 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Innovations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Building for the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are constantly innovating. Here is what is coming next to
              AmarCash.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-primary-50 rounded-xl border border-primary-100/50 hover:shadow-lg transition-all duration-300 hover:bg-white text-center group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of users who trust AmarCash for their financial
              transactions
            </p>
            {!isLoggedIn && (
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-6"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-xl font-bold text-white">
                  AmarCash
                </span>
              </div>
              <p className="text-gray-400">
                Secure Mobile Financial Services for the modern world.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} AmarCash. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
