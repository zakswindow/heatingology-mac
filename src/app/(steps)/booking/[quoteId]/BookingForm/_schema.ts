import { z } from "zod";

export const BookingSlotSchema = z.object({ bookingSlot: z.string() });

export type BookingSlotInput = z.infer<typeof BookingSlotSchema>;

