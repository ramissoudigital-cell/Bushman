import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertBooking } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      // Validate data with Zod before sending if possible, but API client handles response validation
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.bookings.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Erreur de validation");
        }
        throw new Error("Erreur lors de la réservation");
      }

      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Réservation confirmée !",
        description: "Vos billets ont été envoyés par email.",
        variant: "default",
        className: "bg-primary text-primary-foreground border-none"
      });
      // Invalidate relevant queries if we had a bookings list
    },
    onError: (error: Error) => {
      toast({
        title: "Échec de la réservation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
