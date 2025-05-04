
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Car, 
  FileText, 
  Upload, 
  Fuel, 
  Coins, 
  Check, 
  Settings, 
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
import AdminLayout from "../AdminLayout";
import { useLanguage } from "@/i18n/LanguageContext";

// Define form validation schema using zod
const carSchema = z.object({
  licensePlate: z.string().min(2, "Plaque d'immatriculation requise"),
  brand: z.string().min(1, "Marque requise"),
  model: z.string().min(1, "Modèle requis"),
  pricePerDay: z.coerce.number().positive("Prix doit être positif"),
  available: z.boolean().default(true),
  transmission: z.enum(["manual", "automatic"]),
  fuelType: z.enum(["essence", "diesel"]),
  mileage: z.coerce.number().nonnegative("Le kilométrage ne peut pas être négatif"),
});

type CarFormValues = z.infer<typeof carSchema>;

const AddCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const currencySymbol = language === 'ar' ? 'درهم' : 'DH';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [carId, setCarId] = useState<string | null>(null);

  // Check if we're in edit mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    if (id) {
      setIsEditMode(true);
      setCarId(id);
      // In a real app, we would fetch the car data here
      // For now we'll simulate loading with default data
      
      // Simulating a car fetch
      setTimeout(() => {
        form.setValue('licensePlate', `AA-${id}-BB`);
        form.setValue('brand', 'Example Brand');
        form.setValue('model', `Model ${id}`);
        form.setValue('pricePerDay', 50);
        form.setValue('available', true);
        form.setValue('transmission', 'automatic');
        form.setValue('fuelType', 'essence');
        form.setValue('mileage', 15000);
        
        // Mock photo previews
        setPhotoPreviewUrls([
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200',
        ]);
      }, 500);
    }
  }, [location]);

  // Initialize form with react-hook-form and zod
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
    },
  });

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    
    if (fileList && fileList.length > 0) {
      const newPhotos = Array.from(fileList);
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      
      // Create URLs for previews
      const newPhotoUrls = newPhotos.map(file => URL.createObjectURL(file));
      setPhotoPreviewUrls(prevUrls => [...prevUrls, ...newPhotoUrls]);
    }
  };

  // Remove a photo
  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    
    // Release the object URL
    URL.revokeObjectURL(photoPreviewUrls[index]);
    
    const updatedPhotoUrls = [...photoPreviewUrls];
    updatedPhotoUrls.splice(index, 1);
    setPhotoPreviewUrls(updatedPhotoUrls);
  };

  // Submit form
  const onSubmit = async (values: CarFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulation of an API call to save the car
      console.log("Car data to submit:", values);
      console.log("Photos to upload:", photos);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditMode) {
        toast.success(t('admin.vehicleUpdated'));
      } else {
        toast.success(t('admin.vehicleAdded'));
      }
      
      // Redirect to cars list
      navigate("/admin/cars");
    } catch (error) {
      console.error("Error submitting car:", error);
      toast.error(t('admin.errorAddingVehicle'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? t('admin.editVehicle') : t('admin.addVehicle')}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin/cars")}
        >
          {t('admin.return')}
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First row - 4 fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* License Plate */}
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('admin.licensePlate')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="AA-123-BB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      {t('admin.brand')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Renault, Peugeot, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Model */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      {t('admin.model')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Clio, 208, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price per day */}
              <FormField
                control={form.control}
                name="pricePerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Coins className="mr-2 h-4 w-4" />
                      {t('admin.pricePerDay')} ({currencySymbol})
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
            </div>

            {/* Second row - 4 fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Available */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-[76px]">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        {t('admin.available')}
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
                      {t('admin.transmission')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('vehicles.allTypes')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manual">{t('vehicles.manual')}</SelectItem>
                        <SelectItem value="automatic">{t('vehicles.automatic')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fuel type */}
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Fuel className="mr-2 h-4 w-4" />
                      {t('admin.fuelType')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('vehicles.allTypes')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="essence">{t('vehicles.gasoline')}</SelectItem>
                        <SelectItem value="diesel">{t('vehicles.diesel')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mileage */}
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Gauge className="mr-2 h-4 w-4" />
                      {t('admin.mileage')}
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

            {/* Section upload photos */}
            <div className="space-y-4">
              <FormLabel className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                {t('admin.photos')}
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
                    {t('admin.clickToUpload')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t('admin.photoFormat')}
                  </p>
                </label>
              </div>

              {/* Photos preview */}
              {photoPreviewUrls.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">{t('admin.photos')} ({photoPreviewUrls.length})</h3>
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

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/cars")}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? t('common.loading')
                  : isEditMode 
                    ? t('admin.updateVehicle') 
                    : t('admin.addVehicle')
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddCar;
