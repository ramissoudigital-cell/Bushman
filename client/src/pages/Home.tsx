import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, MapPin, Ticket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Abstract dark museum atmosphere */}
          <img 
            src="/attached_assets/WhatsApp_Image_2025-12-26_at_19.45.59_1766804702726.jpeg"
            alt="Ambiance sombre et artistique du musée"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-primary font-display text-xl md:text-2xl mb-4 tracking-[0.2em] uppercase">
              BUSHMAN
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight">
              L'Éveil des <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/50">
                Sens
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Osez l'invisible. Traversez une frontière de lumière où chaque ombre raconte une histoire et chaque éclat devient une émotion pure.
            </p>
            
            <Link href="/billetterie">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-primary/10 text-primary font-semibold rounded-full text-lg shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto backdrop-blur-2xl border border-primary/20"
              >
                Réserver votre place
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Explorer</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard 
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="Horaires"
              description="Ouvert tous les jours de 10h à 22h. Nocturnes le vendredi jusqu'à minuit."
            />
            <InfoCard 
              icon={<MapPin className="w-8 h-8 text-primary" />}
              title="Accès"
              description="3, route de M'Pouto, Cocody Riviera 3, Cote d'Ivoire"
            />
            <InfoCard 
              icon={<Ticket className="w-8 h-8 text-primary" />}
              title="Tarifs"
              description="À partir de 8€. Gratuit pour les moins de 5 ans."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Une Odyssée <span className="text-primary">Nocturne</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Le Musée Lumina n'est pas un musée comme les autres. Ici, l'obscurité n'est pas une absence, mais une toile vierge.
                </p>
                <p>
                  À travers des installations interactives et des sculptures de lumière, nous explorons la dualité fondamentale de notre perception. Chaque salle est une invitation à perdre vos repères pour mieux vous retrouver.
                </p>
                <p>
                  Laissez vos yeux s'habituer à la pénombre et découvrez des détails invisibles à la lumière du jour.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/galerie">
                  <span className="inline-flex items-center text-primary hover:text-white transition-colors cursor-pointer group font-medium">
                    Découvrir la collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                {/* Modern light installation art */}
                <img 
                  src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                  alt="Installation lumineuse"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              {/* Floating decorative element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-background border border-primary/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#38bdf8]"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6 bg-background w-16 h-16 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
