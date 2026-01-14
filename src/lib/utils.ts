import { Notification, Transaction } from "@/interface/interfsces";
import { clsx, type ClassValue } from "clsx";
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
  transactions: Transaction[],
  currentUserId?: string,
  isAdmin: boolean = false
): Notification[] => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  return transactions
    .filter((transaction) => transaction.from && transaction.to) // Skip invalid transactions
    .map((transaction, index) => {
      const senderId =
        typeof transaction.from === "object" &&
        transaction.from !== null &&
        "_id" in transaction.from
          ? transaction.from._id
          : typeof transaction.from === "string"
          ? transaction.from
          : null;
      const receiverId =
        typeof transaction.to === "object" &&
        transaction.to !== null &&
        "_id" in transaction.to
          ? transaction.to._id
          : typeof transaction.to === "string"
          ? transaction.to
          : null;

      const isSender = currentUserId && senderId === currentUserId;
      const isReceiver = currentUserId && receiverId === currentUserId;

      let title = "";
      let message = "";
      let type: "success" | "error" | "warning" | "info" = "info";

      const senderName =
        typeof transaction.from === "object" &&
        transaction.from !== null &&
        "name" in transaction.from
          ? transaction.from.name
          : "Unknown";
      const receiverName =
        typeof transaction.to === "object" &&
        transaction.to !== null &&
        "name" in transaction.to
          ? transaction.to.name
          : "Unknown";

      if (isAdmin) {
        // Admin view: show all transactions from system perspective
        if (transaction.type === "send") {
          title = "Money Transfer";
          message = `${senderName} sent ${transaction.amount} Taka to ${receiverName}`;
          if (transaction.fee && transaction.fee > 0) {
            message += ` (Fee: ${transaction.fee} Taka)`;
          }
          type = "info";
        } else if (transaction.type === "cash-in") {
          title = "Cash In";
          message = `${senderName} cashed in ${transaction.amount} Taka to ${receiverName}`;
          type = "success";
        } else if (transaction.type === "cash-out") {
          title = "Cash Out";
          message = `${senderName} cashed out ${transaction.amount} Taka via ${receiverName}`;
          if (transaction.fee && transaction.fee > 0) {
            message += ` (Fee: ${transaction.fee} Taka)`;
          }
          type = "warning";
        } else {
          title = "Transaction";
          message = `${senderName} → ${receiverName}: ${transaction.amount} Taka`;
          type = "info";
        }
      } else {
        // User/Agent view: personalized messages
        if (isSender) {
          title = "Money Sent";
          message = `You sent ${transaction.amount} Taka to ${receiverName}`;
          if (transaction.fee && transaction.fee > 0) {
            message += ` (Fee: ${transaction.fee} Taka)`;
          }
          type = "success";
        } else if (isReceiver) {
          title = "Money Received";
          message = `You received ${transaction.amount} Taka from ${senderName}`;
          type = "success";
        } else {
          title = "Transaction";
          message = `Transaction of ${transaction.amount} Taka`;
          type = "info";
        }

        // Adjust type based on transaction type
        if (transaction.type === "cash-out") {
          type = "warning";
          title = "Cash Out";
        } else if (transaction.type === "cash-in") {
          type = "success";
          title = isReceiver ? "Cash In Received" : "Cash In Processed";
        } else if (transaction.type === "send") {
          type = isSender ? "success" : "info";
        }
      }

      return {
        id: index + 1,
        type,
        title,
        message: message + ".",
        time: getTimeAgo(transaction.createdAt),
        read: false,
      };
    });
};
