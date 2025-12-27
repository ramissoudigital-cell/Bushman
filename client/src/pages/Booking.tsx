import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { TICKET_TYPES, insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { cn } from "@/lib/utils";

// Ticket Type Selection Component
const TicketSelector = ({ 
  type, 
  data, 
  selected, 
  onSelect 
}: { 
  type: string, 
  data: any, 
  selected: boolean, 
  onSelect: () => void 
}) => (
  <div 
    onClick={onSelect}
    className={cn(
      "cursor-pointer p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group",
      selected 
        ? "bg-primary/10 border-primary" 
        : "bg-white/5 border-white/5 hover:border-primary/50 hover:bg-white/10"
    )}
  >
    <div>
      <h4 className={cn("font-medium", selected ? "text-primary" : "text-white")}>{data.name}</h4>
      <p className="text-sm text-muted-foreground">Accès complet aux expositions</p>
    </div>
    <span className="font-display text-xl font-bold text-white">{data.price}€</span>
  </div>
);

export default function Booking() {
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useCreateBooking();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTicketType, setSelectedTicketType] = useState<string>("adult");
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      quantity: 1,
      ticketType: "adult",
    }
  });

  const quantity = form.watch("quantity");
  const ticketPrice = Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.price || 0;
  const totalPrice = ticketPrice * quantity;

  const onSubmit = (data: InsertBooking) => {
    if (!date) return;
    
    mutate({
      ...data,
      visitDate: format(date, "yyyy-MM-dd"),
      ticketType: selectedTicketType,
      totalPrice: totalPrice,
    }, {
      onSuccess: () => setLocation("/succes"),
      onError: (error: any) => {
        console.error("Booking error:", error);
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Réservez votre <br/>
              <span className="text-primary">expérience</span>
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-md">
              Sélectionnez votre date et vos billets pour plonger dans l'univers de Lumina. Les places sont limitées pour garantir une immersion totale.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 mb-8">
              <h3 className="font-display text-2xl mb-4 text-white">Votre Panier</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Type de billet</span>
                  <span className="text-white font-medium">
                    {Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Date</span>
                  <span className="text-white font-medium">
                    {date ? format(date, "d MMMM yyyy", { locale: fr }) : "Non sélectionnée"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Quantité</span>
                  <span className="text-white font-medium">{quantity}x</span>
                </div>
                <div className="flex justify-between pt-4 text-lg">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-primary font-bold text-2xl">{totalPrice}€</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date de visite</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(
                      "w-full flex items-center justify-start text-left font-normal h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all",
                      !date && "text-muted-foreground"
                    )}>
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-white/10" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="bg-card text-white rounded-xl border-none"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Ticket Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Type de billet</label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(TICKET_TYPES).map(([key, value]) => (
                    <TicketSelector 
                      key={key} 
                      type={key} 
                      data={value} 
                      selected={selectedTicketType === value.id}
                      onSelect={() => {
                        setSelectedTicketType(value.id);
                        form.setValue("ticketType", value.id);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nombre de personnes</label>
                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                      const current = form.getValues("quantity");
                      if (current > 1) form.setValue("quantity", current - 1);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-display font-bold w-8 text-center">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => {
                      const current = form.getValues("quantity");
                      if (current < 10) form.setValue("quantity", current + 1);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nom complet</label>
                  <input 
                    {...form.register("name")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Jean Dupont"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input 
                    {...form.register("email")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="jean@exemple.fr"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Téléphone</label>
                  <input 
                    {...form.register("phone")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+225 00 00 00 00"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isPending || !date}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Traitement...
                  </>
                ) : (
                  "Procéder au paiement"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
