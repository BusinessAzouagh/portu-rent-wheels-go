
import { CarWithGallery } from "@/components/CarCardWithGallery";

// Mock data for Peugeot 208 cars with gallery in different colors
export const MOCK_CARS_WITH_GALLERY: CarWithGallery[] = [
  {
    id: "1",
    model: "208",
    brand: "Peugeot",
    licensePlate: "AA-123-BB",
    color: "vehicles.colors.black",
    images: [
      "/cars/Peugeot_black/1.jpg",
      "/cars/Peugeot_black/2.webp",
      "/cars/Peugeot_black/3.png",
      "/cars/Peugeot_black/4.jpg",
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    color: "vehicles.colors.gray",
    images: [
      "/cars/Peugeot_gris/1.avif",
      "/cars/Peugeot_gris/2.jpg",
      "/cars/Peugeot_gris/3.webp",
      "/cars/Peugeot_gris/4.webp",
      "/cars/Peugeot_gris/5.jpg",
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "3",
    model: "208",
    brand: "Peugeot",
    licensePlate: "EE-789-FF",
    color: "vehicles.colors.red",
    images: [
      "/cars/Peugeot_red/1.jpg",
      "/cars/Peugeot_red/2.jpg",
      "/cars/Peugeot_red/3.jpg",
      "/cars/Peugeot_red/4.jpg"
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "4",
    model: "Leon",
    brand: "Siat",
    licensePlate: "GG-012-HH",
    color: "vehicles.colors.black",
    images: [
      "/cars/Seat_black/1.png",
      "/cars/Seat_black/2.png"
    ],
    transmission: "vehicles.transmissions.automatic",
  },
  {
    id: "5",
    model: "208",
    brand: "Peugeot",
    licensePlate: "II-345-JJ",
    color: "vehicles.colors.yellow",
    images: [
      "/cars/Peugeot_yellow/1.jpg",
      "/cars/Peugeot_yellow/2.png"
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "6",
    model: "208",
    brand: "Peugeot",
    licensePlate: "KK-678-LL",
    color: "vehicles.colors.green",
    images: [
      "/cars/Peugeot_green/1.webp",
      "/cars/Peugeot_green/2.avif",
      "/cars/Peugeot_green/3.webp",
      "/cars/Peugeot_green/4.png",
      "/cars/Peugeot_green/5.webp",
    ],
  },
  {
    id: "7",
    model: "208",
    brand: "Peugeot",
    licensePlate: "MM-901-NN",
    color: "vehicles.colors.blue",
    images: [
      "/cars/Peugeot_blue/1.webp",
      "/cars/Peugeot_blue/2.jpg",
      "/cars/Peugeot_blue/3.jpg"
    ],
    transmission: "vehicles.transmissions.manual",
  },
];
