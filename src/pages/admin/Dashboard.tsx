
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "@/components/CarCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CarIcon, 
  Calendar, 
  Clock, 
  Users, 
  LogOut 
} from "lucide-react";
import AdminLayout from "./AdminLayout";

// Mock data for dashboard
const MOCK_STATS = {
  totalCars: 12,
  availableCars: 8,
  pendingReservations: 5,
  confirmedReservations: 18
};

// Mock data for recent reservations
const MOCK_RECENT_RESERVATIONS = [
  { id: "R001", customer: "Jean Dupont", car: "Renault Clio", startDate: "2025-05-10", status: "PENDING" },
  { id: "R002", customer: "Marie Leclerc", car: "Peugeot 208", startDate: "2025-05-12", status: "CONFIRMED" },
  { id: "R003", customer: "Thomas Martin", car: "Fiat 500", startDate: "2025-05-15", status: "CONFIRMED" }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-gray-500">Chargement...</div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-blue-100 rounded-full mr-4">
              <CarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de véhicules</p>
              <p className="text-2xl font-bold">{MOCK_STATS.totalCars}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Véhicules disponibles</p>
              <p className="text-2xl font-bold">{MOCK_STATS.availableCars}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-amber-100 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Réservations en attente</p>
              <p className="text-2xl font-bold">{MOCK_STATS.pendingReservations}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-purple-100 rounded-full mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Réservations confirmées</p>
              <p className="text-2xl font-bold">{MOCK_STATS.confirmedReservations}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Reservations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Réservations récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {MOCK_RECENT_RESERVATIONS.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Véhicule</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RECENT_RESERVATIONS.map((reservation) => (
                    <tr key={reservation.id} className="border-b">
                      <td className="py-3 px-4">{reservation.id}</td>
                      <td className="py-3 px-4">{reservation.customer}</td>
                      <td className="py-3 px-4">{reservation.car}</td>
                      <td className="py-3 px-4">{reservation.startDate}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {reservation.status === 'CONFIRMED' ? 'Confirmée' : 'En attente'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/admin/reservations/${reservation.id}`}>
                          <Button size="sm" variant="ghost">Détails</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucune réservation récente</p>
          )}
          
          <div className="mt-4">
            <Link to="/admin/reservations">
              <Button variant="outline" size="sm">Voir toutes les réservations</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/cars/new">
            <Button variant="outline" className="w-full">
              Ajouter un véhicule
            </Button>
          </Link>
          <Link to="/admin/reservations/pending">
            <Button variant="outline" className="w-full">
              Réservations en attente
            </Button>
          </Link>
          <Link to="/admin/cars/availability">
            <Button variant="outline" className="w-full">
              Gérer les disponibilités
            </Button>
          </Link>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
