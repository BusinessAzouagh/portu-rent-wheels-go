
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car } from "@/components/CarCard";
import HeroSection from "@/components/home/HeroSection";
import SearchResults from "@/components/home/SearchResults";
import FeaturedCars from "@/components/home/FeaturedCars";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";

// Mock data for cars
const MOCK_CARS: Car[] = [
  {
    id: "1",
    model: "Renault Clio",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
    transmission: "Automatique",
  },
  {
    id: "2",
    model: "Peugeot 208",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "3",
    model: "Volkswagen Golf",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
    transmission: "Automatique",
  },
  {
    id: "4",
    model: "Fiat 500",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
    transmission: "Manuelle",
  },
];

interface SearchResult extends Car {
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
}

const Home = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (formData: any) => {
    console.log("Search data:", formData);
    // In a real app, this would make an API call to fetch available cars
    // Now include the search dates/times with each car result
    const results = MOCK_CARS
      .filter(car => car.available)
      .map(car => ({
        ...car,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime
      }));
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <SearchResults results={searchResults} hasSearched={hasSearched} />
        <FeaturedCars cars={MOCK_CARS} />
        <ServicesSection />
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
