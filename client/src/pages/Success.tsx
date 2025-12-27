import { motion } from "framer-motion";
import { CheckCircle, Download, Home } from "lucide-react";
import { Link } from "wouter";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card border border-white/5 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          
          <h1 className="font-display text-3xl font-bold text-white mb-2">Réservation Confirmée !</h1>
          <p className="text-gray-400 mb-8">
            Merci pour votre achat. Vos billets ont été envoyés à votre adresse email.
          </p>

          <div className="space-y-3">
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> Télécharger les billets
            </button>
            
            <Link href="/">
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Home size={18} /> Retour à l'accueil
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
