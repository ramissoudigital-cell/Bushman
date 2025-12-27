import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Billetterie" },
    { href: "/accueil", label: "Accueil" },
    { href: "/galerie", label: "La Galerie" },
  ];

  const isHomePage = location === "/accueil" || location === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isScrolled || !isHomePage ? "bg-primary" : "bg-white/20"
              }`}>
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-display font-bold tracking-wider transition-colors ${
                isScrolled || !isHomePage ? "text-white" : "text-white"
              }`}>
                LUMINA
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`text-sm tracking-wide transition-colors cursor-pointer ${
                    location === link.href
                      ? isScrolled || !isHomePage
                        ? "text-primary font-semibold"
                        : "text-primary font-semibold"
                      : isScrolled || !isHomePage
                        ? "text-muted-foreground hover:text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
            <Link href="/billetterie">
              <Button
                size="sm"
                className={`rounded-full px-6 transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? "bg-primary hover:bg-primary/80 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/10"
                }`}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Réserver
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled || !isHomePage ? "text-white" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col items-center">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <span className={`text-lg font-display transition-colors cursor-pointer ${
                    location === link.href ? "text-primary" : "text-white/80"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/billetterie" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/80 text-white rounded-full">
                  <Ticket className="h-4 w-4 mr-2" />
                  Réserver
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
