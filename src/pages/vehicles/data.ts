
import { ExtendedCarInfo } from "./types";

// Extended mock data with additional information
export const EXTENDED_MOCK_CARS: ExtendedCarInfo[] = [
    {
        id: "1",
        model: "208",
        brand: "Peugeot",
        licensePlate: "AA-123-BB",
        color: "vehicles.colors.black",
        image: "/cars/Peugeot_black/1.jpg",
        images: [
            "/cars/Peugeot_black/1.png",
            "/cars/Peugeot_black/2.webp",
            "/cars/Peugeot_black/3.png",
            "/cars/Peugeot_black/4.png",
        ],
        available: true,
        transmission: "vehicles.transmissions.manual",
    },
    {
        id: "2",
        model: "208",
        brand: "Peugeot",
        licensePlate: "II-345-JJ",
        color: "vehicles.colors.yellow",
        image: "/cars/Peugeot_yellow/1.png",
        images: [
            "/cars/Peugeot_yellow/1.png",
            "/cars/Peugeot_yellow/2.png",
            "/cars/Peugeot_yellow/3.png",
            "/cars/Peugeot_yellow/4.png"
        ],
        available: true,
        transmission: "vehicles.transmissions.manual",
    },
    {
        id: "3",
        model: "208",
        brand: "Peugeot",
        licensePlate: "EE-789-FF",
        color: "vehicles.colors.red",
        image: "/cars/Peugeot_red/1.png",
        images: [
            "/cars/Peugeot_red/1.png",
            "/cars/Peugeot_red/2.png",
            "/cars/Peugeot_red/3.png"
        ],
        available: true,
        transmission: "vehicles.transmissions.manual",
    },
    {
        id: "4",
        model: "208",
        brand: "Peugeot",
        licensePlate: "CC-456-DD",
        color: "vehicles.colors.gray",
        image: "/cars/Peugeot_gris/1.png",
        images: [
            "/cars/Peugeot_gris/1.png",
            "/cars/Peugeot_gris/2.png",
            "/cars/Peugeot_gris/3.png"
        ],
        available: true,
        transmission: "vehicles.transmissions.manual",
    },
    {
        id: "5",
        model: "Ibiza",
        brand: "Seat",
        licensePlate: "GG-012-HH",
        color: "vehicles.colors.black",
        image: "/cars/Seat_black/1.png",
        images: [
            "/cars/Seat_black/1.png",
            "/cars/Seat_black/2.png",
            "/cars/Seat_black/3.png"
        ],
        available: true,
        transmission: "vehicles.transmissions.automatic",
    },
    {
        id: "6",
        model: "Ibiza",
        brand: "Seat",
        licensePlate: "MM-901-NN",
        color: "vehicles.colors.white",
        image: "/cars/Seat_white/1.png",
        images: [
            "/cars/Seat_white/1.png",
            "/cars/Seat_white/2.png"
        ],
        available: true,
        transmission: "vehicles.transmissions.automatic",
    },
];
