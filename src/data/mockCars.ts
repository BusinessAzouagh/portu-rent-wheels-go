
import { CarWithGallery } from "@/components/CarCardWithGallery";

// Mock data for Peugeot 208 cars with gallery in different colors
export const MOCK_CARS_WITH_GALLERY: CarWithGallery[] = [
  {
    id: "1",
    model: "8",
    brand: "Golf",
    licensePlate: "AA-123-B",
    color: "vehicles.colors.black",
    images: [
      "/cars/Golf/1.jpeg",
      "/cars/Golf/2.jpeg",
      "/cars/Golf/3.jpeg",
      "/cars/Golf/4.jpeg",
      "/cars/Golf/5.jpeg",
      "/cars/Golf/6.jpeg",
      "/cars/Golf/7.jpeg",
      "/cars/Golf/8.jpeg",
    ],
    transmission: "vehicles.transmissions.automatic",
  },
  {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "AA-123-BB",
    color: "vehicles.colors.black",
    images: [
      "/cars/Peugeot_black/1.png",
      "/cars/Peugeot_black/2.webp",
      "/cars/Peugeot_black/3.png",
      "/cars/Peugeot_black/4.png",
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "3",
    model: "208",
    brand: "Peugeot",
    licensePlate: "II-345-JJ",
    color: "vehicles.colors.yellow",
    images: [
      "/cars/Peugeot_yellow/1.png",
      "/cars/Peugeot_yellow/2.png",
      "/cars/Peugeot_yellow/3.png",
      "/cars/Peugeot_yellow/4.png"
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "4",
    model: "208",
    brand: "Peugeot",
    licensePlate: "EE-789-FF",
    color: "vehicles.colors.red",
    images: [
      "/cars/Peugeot_red/1.png",
      "/cars/Peugeot_red/2.png",
      "/cars/Peugeot_red/3.png"
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "5",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    color: "vehicles.colors.gray",
    images: [
      "/cars/Peugeot_gris/1.png",
      "/cars/Peugeot_gris/2.png",
      "/cars/Peugeot_gris/3.png"
    ],
    transmission: "vehicles.transmissions.manual",
  },
  {
    id: "6",
    model: "Ibiza",
    brand: "Seat",
    licensePlate: "GG-012-HH",
    color: "vehicles.colors.black",
    images: [
      "/cars/Seat_black/1.png",
      "/cars/Seat_black/2.png",
      "/cars/Seat_black/3.png"
    ],
    transmission: "vehicles.transmissions.automatic",
  },
  {
    id: "7",
    model: "Ibiza",
    brand: "Seat",
    licensePlate: "MM-901-NN",
    color: "vehicles.colors.white",
    images: [
      "/cars/Seat_white/1.png",
      "/cars/Seat_white/2.png"
    ],
    transmission: "vehicles.transmissions.automatic",
  },
];