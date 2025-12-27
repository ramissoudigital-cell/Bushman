import { Link } from "wouter";
import { Ticket, Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                BUSHMAN
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Musée des Ombres et Lumières. Une expérience immersive au cœur de l'art obscur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Billetterie</Link></li>
              <li><Link href="/accueil" className="text-muted-foreground hover:text-primary transition-colors text-sm">Accueil</Link></li>
              <li><Link href="/galerie" className="text-muted-foreground hover:text-primary transition-colors text-sm">La Galerie</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>12 Avenue des Arts, Paris</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@bushman-musee.fr</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Musée BUSHMAN. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
