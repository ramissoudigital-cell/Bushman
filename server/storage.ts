import { db } from "./db";
import { bookings, type InsertBooking, type Booking } from "@shared/schema";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
}

class MemoryStorage implements IStorage {
  private nextId = 1;
  private bookings: Booking[] = [];

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const booking: Booking = {
      id: this.nextId++,
      createdAt: new Date(),
      ...insertBooking,
    };

    this.bookings.push(booking);
    return booking;
  }
}

export class DatabaseStorage implements IStorage {
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    if (!db) {
      throw new Error("Database is not configured (missing DATABASE_URL)");
    }

    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
