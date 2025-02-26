export interface User {
  _id: string;
  phoneNo: string;
  role: string;
  isApproved: boolean;
  name: string;
  phone: string;
  type: string;
  isActive: boolean;
  updatedAt: string;
  balance: number;
  income: number;
}

export interface UsersData {
  data: User[];
}

export interface UserInfo {
  contactNo: string;
}

export interface Notification {
  id: number;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Transaction {
  _id: string;
  amount: number;
  createdAt: string;
  from: { name: string };
  to: { name: string };
  type: string;
}