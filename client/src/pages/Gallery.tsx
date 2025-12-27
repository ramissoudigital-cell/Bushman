import { motion } from "framer-motion";
import { useState } from "react";

// Using Unsplash images for "museum exhibits"
const exhibits = [
  {
    id: 1,
    title: "Silence Éternel",
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=2070&auto=format&fit=crop",
    size: "large"
  },
  {
    id: 2,
    title: "Géométrie Astrale",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 3,
    title: "Le Vide",
    category: "Conceptuel",
    image: "https://images.unsplash.com/photo-1518998053980-fa646e740e66?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 4,
    title: "Fragments de Nuit",
    category: "Peinture",
    image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=2070&auto=format&fit=crop",
    size: "tall"
  },
  {
    id: 5,
    title: "Réflexion",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 6,
    title: "Architecture de l'Ombre",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
    size: "large"
  },
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            La <span className="text-primary">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Une sélection d'œuvres où la lumière lutte avec l'obscurité pour exister.
          </motion.p>
        </div>

        {/* Gallery Grid - Masonry style approximation with CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          {exhibits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer border border-white/5 ${
                item.size === "large" ? "md:col-span-2 md:row-span-2" : 
                item.size === "tall" ? "md:row-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <span className="text-primary text-sm tracking-wider uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.category}
                </span>
                <h3 className="text-white font-display text-2xl md:text-3xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
