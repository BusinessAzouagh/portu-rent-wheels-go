
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Car, 
  LicensePlate, 
  Upload, 
  Fuel, 
  Coins, 
  Check, 
  Settings, 
  Bluetooth, 
  Camera, 
  Gauge 
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "../AdminLayout";
import { ServiceCard } from "@/components/ServiceCard";

// Définir le schéma de validation du formulaire avec zod
const carSchema = z.object({
  licensePlate: z.string().min(2, "Plaque d'immatriculation requise"),
  brand: z.string().min(1, "Marque requise"),
  model: z.string().min(1, "Modèle requis"),
  pricePerDay: z.coerce.number().positive("Prix doit être positif"),
  available: z.boolean().default(true),
  transmission: z.enum(["manual", "automatic"]),
  fuelType: z.enum(["essence", "diesel"]),
  mileage: z.coerce.number().nonnegative("Le kilométrage ne peut pas être négatif"),
  features: z.object({
    bluetooth: z.boolean().default(false),
    camera: z.boolean().default(false),
    // On pourrait ajouter d'autres fonctionnalités ici
  }),
  // Pour la gestion des photos, nous utiliserons un état local séparé
});

type CarFormValues = z.infer<typeof carSchema>;

const AddCar = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

  // Initialiser le formulaire avec react-hook-form et zod
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      licensePlate: "",
      brand: "",
      model: "",
      pricePerDay: 0,
      available: true,
      transmission: "manual",
      fuelType: "essence",
      mileage: 0,
      features: {
        bluetooth: false,
        camera: false,
      },
    },
  });

  // Gérer l'upload de photos
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    
    if (fileList && fileList.length > 0) {
      const newPhotos = Array.from(fileList);
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      
      // Créer des URLs pour les aperçus
      const newPhotoUrls = newPhotos.map(file => URL.createObjectURL(file));
      setPhotoPreviewUrls(prevUrls => [...prevUrls, ...newPhotoUrls]);
    }
  };

  // Supprimer une photo
  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    
    // Libérer l'URL de l'objet
    URL.revokeObjectURL(photoPreviewUrls[index]);
    
    const updatedPhotoUrls = [...photoPreviewUrls];
    updatedPhotoUrls.splice(index, 1);
    setPhotoPreviewUrls(updatedPhotoUrls);
  };

  // Soumettre le formulaire
  const onSubmit = async (values: CarFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'un appel API pour enregistrer la voiture
      // Dans une implémentation réelle, nous enverrions les données + photos au backend
      console.log("Car data to submit:", values);
      console.log("Photos to upload:", photos);
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Véhicule ajouté avec succès");
      
      // Rediriger vers la liste des voitures
      navigate("/admin/cars");
    } catch (error) {
      console.error("Error submitting car:", error);
      toast.error("Erreur lors de l'ajout du véhicule");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Liste des features disponibles pour la visualisation
  const featuresList = [
    {
      name: "bluetooth",
      label: "Bluetooth",
      description: "Connectivité Bluetooth pour appareils mobiles",
      icon: <Bluetooth className="h-8 w-8" />
    },
    {
      name: "camera",
      label: "Caméra arrière",
      description: "Caméra de recul pour faciliter les manœuvres",
      icon: <Camera className="h-8 w-8" />
    }
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ajouter un véhicule</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin/cars")}
        >
          Retour
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Section infos générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Plaque d'immatriculation */}
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <LicensePlate className="mr-2 h-4 w-4" />
                        Plaque d'immatriculation
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="AA-123-BB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marque */}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Car className="mr-2 h-4 w-4" />
                        Marque
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Renault, Peugeot, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Modèle */}
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Car className="mr-2 h-4 w-4" />
                        Modèle
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Clio, 208, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Prix par jour */}
                <FormField
                  control={form.control}
                  name="pricePerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Coins className="mr-2 h-4 w-4" />
                        Prix par jour (€)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Kilométrage */}
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Gauge className="mr-2 h-4 w-4" />
                        Kilométrage (km)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="1" 
                          placeholder="0" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                {/* Disponible */}
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center">
                          <Check className="mr-2 h-4 w-4" />
                          Disponible
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Transmission */}
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Transmission
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manual">Manuelle</SelectItem>
                          <SelectItem value="automatic">Automatique</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type de carburant */}
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Fuel className="mr-2 h-4 w-4" />
                        Type de carburant
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="essence">Essence</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section upload photos */}
            <div className="space-y-4">
              <FormLabel className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Photos
              </FormLabel>
              <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  id="car-photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="car-photos"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Cliquez pour sélectionner des photos ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG, GIF jusqu'à 10 MB
                  </p>
                </label>
              </div>

              {/* Aperçu des photos uploadées */}
              {photoPreviewUrls.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Photos ({photoPreviewUrls.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {photoPreviewUrls.map((url, index) => (
                      <div key={index} className="relative group rounded-md overflow-hidden border">
                        <img
                          src={url}
                          alt={`Car photo ${index + 1}`}
                          className="h-24 w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section features */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Fonctionnalités</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuresList.map((feature) => (
                  <FormField
                    key={feature.name}
                    control={form.control}
                    name={`features.${feature.name as "bluetooth" | "camera"}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{feature.label}</FormLabel>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/cars")}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Ajouter le véhicule"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddCar;
