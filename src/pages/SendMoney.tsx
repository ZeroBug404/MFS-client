
import RoleNav from "@/components/RoleNav";

const SendMoney = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role="user" />
      <div className="lg:pl-64 p-8">
        <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
        <p className="mt-2 text-gray-600">Send money to other users securely.</p>
      </div>
    </div>
  );
};

export default SendMoney;
