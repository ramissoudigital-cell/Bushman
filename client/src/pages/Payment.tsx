import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Smartphone, CreditCard, ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BookingData {
  ticketType: string;
  ticketName: string;
  ticketPrice: number;
  quantity: number;
  visitDate: string;
  totalPrice: number;
}

export default function Payment() {
  const [, setLocation] = useLocation();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      setBookingData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full mx-4"
      >
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLocation("/billetterie")}
            className="rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Button>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Complete Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white/90 mb-4">Choose payment method</h2>
            
            <PaymentOption 
              icon={<img src="/wave-logo.png" alt="Wave" className="w-16 h-16 object-contain" />}
              name={<span translate="no" className="notranslate">Wave</span>}
              description="Instant payment via Wave app"
              color="bg-sky-500"
            />
            
            <PaymentOption 
              icon={<img src="/orange-money-logo.png" alt="Orange Money" className="w-16 h-16 object-contain" />}
              name={<span translate="no" className="notranslate">Orange Money</span>}
              description="Enter your number to receive a request"
              color="bg-orange-500"
            />

            <PaymentOption 
              icon={<img src="/credit-cards.jpg" alt="Bank Cards" className="w-16 h-16 object-contain" />}
              name="Bank Card"
              description="Visa, Mastercard, American Express"
              color="bg-indigo-500"
            />

            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-8 justify-center">
              <Lock className="w-4 h-4" />
              <p>Secure and encrypted payment</p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-xl border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-6">Summary</h3>
                
                <div className="space-y-4 text-sm text-gray-400">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span>{bookingData?.ticketName || "Adult Ticket"}</span>
                    <span className="text-white font-medium">{bookingData?.ticketPrice || 15}€</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span>Quantity</span>
                    <span className="text-white font-medium">{bookingData?.quantity || 1}x</span>
                  </div>
                  <div className="flex justify-between pt-6 text-xl">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-primary font-bold text-3xl">{bookingData?.totalPrice || 15}€</span>
                  </div>
                </div>

                <Button className="w-full mt-8 py-6 rounded-2xl bg-primary hover:bg-primary/80 text-white font-bold text-lg shadow-lg shadow-primary/20">
                  Confirm Purchase
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-green-500/80">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Protected transaction</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PaymentOption({ icon, name, description, color }: { icon: React.ReactNode, name: React.ReactNode, description: string, color: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center gap-6 backdrop-blur-sm relative overflow-hidden">
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shrink-0 shadow-lg overflow-hidden`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-primary transition-colors flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}