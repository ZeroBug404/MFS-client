
import RoleNav from "@/components/RoleNav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Send, Wallet, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CashActions = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [agentId, setAgentId] = useState("");
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmCashout, setShowConfirmCashout] = useState(false);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"send" | "add" | "cashout" | null>(null);
  const { toast } = useToast();

  const handleSendMoney = () => {
    setShowConfirmSend(false);
    setIsMainDialogOpen(false);
    toast({
      title: "Money Sent",
      description: `Successfully sent $${amount} to ${recipient}`,
    });
    setAmount("");
    setRecipient("");
  };

  const handleAddFunds = () => {
    setShowConfirmAdd(false);
    setIsMainDialogOpen(false);
    toast({
      title: "Funds Added",
      description: `Successfully added $${amount} to your account`,
    });
    setAmount("");
  };

  const handleCashout = () => {
    setShowConfirmCashout(false);
    setIsMainDialogOpen(false);
    toast({
      title: "Cashout Successful",
      description: `Successfully cashed out $${amount} with agent ${agentId}`,
    });
    setAmount("");
    setAgentId("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <RoleNav role="user" />
      <div className="lg:pl-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cash Actions</h1>
            <p className="text-gray-600">Manage your money transfers and transactions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Send Money Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>
                  Transfer money to other users securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isMainDialogOpen && currentAction === "send"} 
                        onOpenChange={(open) => {
                          setIsMainDialogOpen(open);
                          if (!open) setCurrentAction(null);
                        }}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        setCurrentAction("send");
                        setIsMainDialogOpen(true);
                      }}
                    >
                      <Send className="w-4 h-4" />
                      Send Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Money</DialogTitle>
                      <DialogDescription>
                        Enter the recipient and amount to send
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="recipient">Recipient</label>
                        <Input
                          id="recipient"
                          placeholder="Enter recipient name"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="amount">Amount</label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowConfirmSend(true)}>Send Money</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={showConfirmSend} onOpenChange={setShowConfirmSend}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to send ${amount} to {recipient}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setShowConfirmSend(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleSendMoney}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Add Funds Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Add Funds</CardTitle>
                <CardDescription>Add money to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isMainDialogOpen && currentAction === "add"}
                        onOpenChange={(open) => {
                          setIsMainDialogOpen(open);
                          if (!open) setCurrentAction(null);
                        }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        setCurrentAction("add");
                        setIsMainDialogOpen(true);
                      }}
                    >
                      <Wallet className="w-4 h-4" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount to add to your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="addAmount">Amount</label>
                        <Input
                          id="addAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowConfirmAdd(true)}>Add Funds</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={showConfirmAdd} onOpenChange={setShowConfirmAdd}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to add ${amount} to your account?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setShowConfirmAdd(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleAddFunds}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Cashout Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Cashout</CardTitle>
                <CardDescription>Withdraw cash through an agent</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isMainDialogOpen && currentAction === "cashout"}
                        onOpenChange={(open) => {
                          setIsMainDialogOpen(open);
                          if (!open) setCurrentAction(null);
                        }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        setCurrentAction("cashout");
                        setIsMainDialogOpen(true);
                      }}
                    >
                      <DollarSign className="w-4 h-4" />
                      Cashout
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cashout</DialogTitle>
                      <DialogDescription>
                        Enter the amount and agent details for cashout
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="agentId">Agent ID</label>
                        <Input
                          id="agentId"
                          placeholder="Enter agent ID"
                          value={agentId}
                          onChange={(e) => setAgentId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cashoutAmount">Amount</label>
                        <Input
                          id="cashoutAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowConfirmCashout(true)}>
                        Request Cashout
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={showConfirmCashout} onOpenChange={setShowConfirmCashout}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Cashout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cashout ${amount} through agent {agentId}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setShowConfirmCashout(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleCashout}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashActions;
