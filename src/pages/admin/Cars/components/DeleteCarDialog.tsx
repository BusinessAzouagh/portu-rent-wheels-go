
import { Car } from "@/types/cars";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteCarDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  car: Car | null;
  onConfirm: () => void;
}

const DeleteCarDialog = ({ isOpen, onOpenChange, car, onConfirm }: DeleteCarDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <p>
          Êtes-vous sûr de vouloir supprimer le véhicule : 
          <span className="font-semibold"> {car?.model}</span> ({car?.licensePlate}) ?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCarDialog;
