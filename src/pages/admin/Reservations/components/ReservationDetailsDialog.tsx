
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, Phone, Mail, User } from "lucide-react";
import { Reservation } from "@/types/reservation";

interface ReservationDetailsDialogProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReservationDetailsDialog = ({
  reservation,
  isOpen,
  onOpenChange
}: ReservationDetailsDialogProps) => {
  if (!reservation) return null;

  // Calculer le nombre de jours et le prix total
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = days * reservation.pricePerDay;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Détails de la réservation #{reservation.licensePlate}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Informations client</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.customerPhone}</span>
              </div>
              {reservation.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{reservation.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Détails de la voiture</h3>
            <div className="flex justify-between items-center">
              <p>
                {reservation.carBrand} {reservation.carModel}
              </p>
              <p className="text-sm text-muted-foreground">
                {reservation.pricePerDay} DH / jour
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Période de location</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div className="flex justify-between w-full">
                  <div>Du {format(startDate, "dd MMM yyyy", { locale: fr })}</div>
                  <div>Au {format(endDate, "dd MMM yyyy", { locale: fr })}</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between">
                  <span>Nombre de jours:</span>
                  <span>{days} jours</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Prix total:</span>
                  <span>{totalPrice} DH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsDialog;
