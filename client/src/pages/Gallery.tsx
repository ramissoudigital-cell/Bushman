import { motion } from "framer-motion";
import { useState } from "react";

// Using local museum photos from client/public
const exhibits = [
  {
    id: 1,
    title: "Du Cacao Pur",
    category: "Sculpture",
    image: "/cacao_img5.webp",
    size: "large"
  },
  {
    id: 2,
    title: "Géométrie Astrale",
    category: "Installation",
    image: "/cacao_img15.webp",
    size: "small"
  },
  {
    id: 3,
    title: "Masques",
    category: "Conceptuel",
    image: "/cacao_img6.webp",
    size: "small"
  },
  {
    id: 4,
    title: "Fèves de Cacao",
    category: "Gastronomie",
    image: "/cacao_img3.webp",
    size: "tall"
  },
  {
    id: 5,
    title: "Awards 2024",
    category: "Événement",
    image: "/cacao_img14.webp",
    size: "small"
  },
  {
    id: 6,
    title: "Prix 2024",
    category: "Événement",
    image: "/videoframe_14738.mp4",
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
            The <span className="text-primary">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A selection of works where light struggles with darkness to exist.
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
              {item.image.endsWith('.mp4') || item.image.endsWith('.webm') ? (
                <video
                  src={item.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              ) : (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              )}
              
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
