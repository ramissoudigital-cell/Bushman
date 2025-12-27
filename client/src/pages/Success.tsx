import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Home, Smartphone, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-4 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/30"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Request Registered</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your booking request has been taken into account. Please select your payment method to finalize your ticket purchase.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
            <PaymentMethod 
              icon={<Smartphone className="w-6 h-6" />}
              name="Mobile Money"
              description="Wave, Orange Money"
            />
            <PaymentMethod 
              icon={<CreditCard className="w-6 h-6" />}
              name="Bank Card"
              description="Visa, Mastercard"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/billetterie">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 border-white/10 hover:bg-white/5">
                Back
              </Button>
            </Link>
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-8 font-semibold hover:bg-primary/90 transition-all group">
              Pay Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PaymentMethod({ icon, name, description }: { icon: React.ReactNode, name: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer group backdrop-blur-md">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
