import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Contactez <span className="text-primary">BUSHMAN</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Une question, une suggestion ou une demande particulière ? Notre équipe est à votre écoute pour rendre votre expérience inoubliable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-white/10 rounded-3xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nom</label>
                    <Input className="bg-white/5 border-white/10 rounded-xl h-12 text-white focus:border-primary" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input className="bg-white/5 border-white/10 rounded-xl h-12 text-white focus:border-primary" placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Sujet</label>
                  <Input className="bg-white/5 border-white/10 rounded-xl h-12 text-white focus:border-primary" placeholder="L'objet de votre message" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message</label>
                  <Textarea className="bg-white/5 border-white/10 rounded-xl min-h-[150px] text-white focus:border-primary" placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold text-lg flex items-center justify-center gap-2">
                  Envoyer le message
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <ContactInfoItem 
              icon={<MapPin className="w-6 h-6" />}
              title="Adresse"
              content="3, route de M'Pouto, Cocody Riviera 3, Cote d'Ivoire"
              link="https://www.google.com/maps/search/?api=1&query=3,+route+de+M'Pouto,+Cocody+Riviera+3,+Cote+d'Ivoire"
            />
            <ContactInfoItem 
              icon={<Mail className="w-6 h-6" />}
              title="Email"
              content="contact@bushmanreturntoimagination.com"
              link="mailto:contact@bushmanreturntoimagination.com"
            />
            <ContactInfoItem 
              icon={<Phone className="w-6 h-6" />}
              title="Téléphone"
              content="+225 0759496651"
              link="tel:+2250759496651"
            />

            <div className="pt-8">
              <h3 className="text-white font-display text-2xl mb-6">Suivez l'aventure</h3>
              <div className="flex gap-4">
                <SocialLink icon={<Instagram />} />
                <SocialLink icon={<Facebook />} />
                <SocialLink icon={<Twitter />} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] md:aspect-[21/9]"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15889.3039656834!2d-3.966667!3d5.333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed67d7a8e5f7%3A0x6a0a0a0a0a0a0a0a!2sBushman%20Caf%C3%A9!5e0!3m2!1sfr!2sci!4v1714000000000!5m2!1sfr!2sci" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, content, link }: { icon: React.ReactNode, title: string, content: string, link: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-display text-xl mb-1">{title}</h4>
        <p className="text-gray-400 group-hover:text-primary transition-colors">{content}</p>
      </div>
    </a>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
      {icon}
    </a>
  );
}