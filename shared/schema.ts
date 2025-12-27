import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Ticket Types (Static data usually, but good to have a type)
export const TICKET_TYPES = {
  ADULT: { id: 'adult', name: 'Adulte', price: 15 },
  CHILD: { id: 'child', name: 'Enfant (-12 ans)', price: 8 },
  SENIOR: { id: 'senior', name: 'Senior (+65 ans)', price: 12 },
  STUDENT: { id: 'student', name: 'Étudiant', price: 10 },
} as const;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  visitDate: text("visit_date").notNull(), // Storing as ISO string YYYY-MM-DD
  ticketType: text("ticket_type").notNull(),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  quantity: z.number().min(1, "Au moins 1 ticket requis").max(10, "Maximum 10 tickets par commande"),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide"),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
