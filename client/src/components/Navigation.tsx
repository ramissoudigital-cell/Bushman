import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Ticket, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/accueil", label: "Accueil" },
    { href: "/galerie", label: "La Galerie" },
    { href: "/", label: "Billetterie" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
              LUMINA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/billetterie">
              <button className="px-6 py-2 rounded-full bg-white text-background font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Réserver
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute w-full bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
        >
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-display ${
                  location === link.href ? "text-primary" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
