import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Minus, Plus, Check } from "lucide-react";
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
  <motion.button 
    type="button"
    onClick={onSelect}
    whileHover={{ scale: 1.01, y: -1 }}
    whileTap={{ scale: 0.99 }}
    className={cn(
      "relative w-full text-left p-5 rounded-2xl border transition-all duration-300 overflow-hidden group",
      "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
      selected
        ? "border-primary/70 shadow-[0_0_0_1px_rgba(56,189,248,0.45),0_20px_60px_-25px_rgba(56,189,248,0.35)]"
        : "border-white/10 hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
    )}
  >
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
        selected ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-cyan-400/10 to-transparent" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 flex items-start justify-between gap-6">
      <div className="space-y-1">
        <h4 className={cn("font-display text-xl font-bold tracking-tight", selected ? "text-white" : "text-white/90")}>
          {data.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          Accès complet aux expositions
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={cn(
          "font-display text-2xl font-extrabold",
          selected ? "text-primary" : "text-white"
        )}>
          {data.price}€
        </span>
        <span
          className={cn(
            "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
            selected
              ? "border-primary/60 bg-primary/15 shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              : "border-white/15 bg-white/5 group-hover:border-primary/40"
          )}
        >
          {selected ? <Check className="w-4 h-4 text-primary" /> : null}
        </span>
      </div>
    </div>
  </motion.button>
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
      visitDate: format(new Date(), "yyyy-MM-dd"),
      totalPrice: 0,
    }
  });

  const quantity = form.watch("quantity");
  const ticketPrice = Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.price || 0;
  const totalPrice = ticketPrice * quantity;

  useEffect(() => {
    if (!date) return;

    form.setValue("visitDate", format(date, "yyyy-MM-dd"), { shouldValidate: false });
    form.setValue("ticketType", selectedTicketType, { shouldValidate: false });
    form.setValue("totalPrice", totalPrice, { shouldValidate: false });
  }, [date, form, selectedTicketType, totalPrice]);

  const onSubmit = async (data: InsertBooking) => {
    if (!date) return;
    
    // Save booking data for payment page
    const bookingData = {
      ticketType: selectedTicketType,
      ticketName: Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.name || "Billet",
      ticketPrice: Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.price || 0,
      quantity,
      visitDate: format(date, "yyyy-MM-dd"),
      totalPrice,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    
    // For prototype purposes, navigate directly to payment page
    setLocation("/paiement");
    
    /* 
    mutate({
      ...data,
      visitDate: format(date, "yyyy-MM-dd"),
      ticketType: selectedTicketType,
      totalPrice: totalPrice,
    }, {
      onSuccess: () => setLocation("/paiement"),
      onError: (error: any) => {
        console.error("Booking error:", error);
      }
    });
    */
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <motion.div
        className="absolute top-16 right-[-60px] w-[520px] h-[520px] bg-primary/15 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -60, 0], y: [0, 45, 0], scale: [1, 1.12, 1], rotate: [0, 10, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-80px] left-[-60px] w-[560px] h-[560px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none"
        animate={{ x: [0, 55, 0], y: [0, -45, 0], scale: [1, 1.1, 1], rotate: [0, -10, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Book your <br/>
              <span className="text-primary">experience</span>
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-md">
              Select your date and tickets to dive into the universe of BUSHMAN. Places are limited to guarantee a total immersion.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 mb-8">
              <h3 className="font-display text-2xl mb-4 text-white">Your Cart</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Ticket Type</span>
                  <span className="text-white font-medium">
                    {Object.values(TICKET_TYPES).find(t => t.id === selectedTicketType)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Date</span>
                  <span className="text-white font-medium">
                    {date ? format(date, "MMMM do yyyy") : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Quantity</span>
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-white font-medium"
                  >
                    {quantity}x
                  </motion.span>
                </div>
                <div className="flex justify-between pt-4 text-lg">
                  <span className="text-white font-medium">Total</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary font-bold text-2xl"
                  >
                    {totalPrice}€
                  </motion.span>
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
              <input type="hidden" {...form.register("quantity", { valueAsNumber: true })} />
              <input type="hidden" {...form.register("ticketType")} />
              <input type="hidden" {...form.register("visitDate")} />
              <input type="hidden" {...form.register("totalPrice", { valueAsNumber: true })} />
              
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Visit Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(
                      "w-full flex items-center justify-start text-left font-normal h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all",
                      !date && "text-muted-foreground"
                    )}>
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "PPP") : <span>Choose a date</span>}
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
                <label className="text-sm font-medium text-gray-300">Ticket Type</label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(TICKET_TYPES).map(([key, value]) => (
                    <TicketSelector 
                      key={key} 
                      type={key} 
                      data={value} 
                      selected={selectedTicketType === value.id}
                      onSelect={() => {
                        setSelectedTicketType(value.id);
                        form.setValue("ticketType", value.id, { shouldDirty: true, shouldTouch: true });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Number of people</label>
                <div className="flex items-center gap-4">
                  <motion.button 
                    type="button"
                    onClick={() => {
                      const current = form.getValues("quantity");
                      if (current > 1) {
                        form.setValue("quantity", current - 1, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-display font-extrabold w-10 text-center text-white"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button 
                    type="button"
                    onClick={() => {
                      const current = form.getValues("quantity");
                      if (current < 10) {
                        form.setValue("quantity", current + 1, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    {...form.register("name")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone</label>
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

              <motion.button 
                type="submit"
                disabled={isPending || !date}
                whileHover={isPending || !date ? undefined : { scale: 1.02, y: -1 }}
                whileTap={isPending || !date ? undefined : { scale: 0.99 }}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
