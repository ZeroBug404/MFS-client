import { Notification, Transaction } from "@/interface/interfsces";
import { clsx, type ClassValue } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate time ago
const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

// Transform MongoDB data to Notification format
export const transformToNotifications = (
  transactions: Transaction[]
): Notification[] => {

  return transactions?.map((transaction, index) => ({
    id: index + 1,
    type: transaction?.type === "cash-out" ? "success" : "info", // Adjust based on transaction type
    title: "Transaction Successful",
    message: `You transferred ${transaction.amount} Taka to ${transaction.to.name}.`,
    time: getTimeAgo(transaction.createdAt),
    read: false,
  }));
};
