import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-primary opacity-50" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white">404 - Page non trouvée</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Il semble que vous ayez erré trop loin dans l'obscurité. Cette page n'existe pas.
        </p>
        <Link href="/">
          <span className="inline-block px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
            Retourner à la lumière
          </span>
        </Link>
      </div>
    </div>
  );
}
