import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePhone = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must contain only numbers" }));
      return false;
    }
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, phone: "" }));
    return true;
  };

  const validatePin = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrors((prev) => ({ ...prev, pin: "PIN must contain only numbers" }));
      return false;
    }
    if (value.length !== 5) {
      setErrors((prev) => ({ ...prev, pin: "PIN must be 5 digits" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, pin: "" }));
    return true;
  };

  const validateNid = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrors((prev) => ({ ...prev, nid: "NID must contain only numbers" }));
      return false;
    }
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, nid: "NID is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nid: "" }));
    return true;
  };

  const validateEmail = (value: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      return false;
    }
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validateName = (value: string) => {
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    return true;
  };

  return { errors, validatePhone, validatePin, validateNid, validateEmail, validateName };
};

export default useValidation;