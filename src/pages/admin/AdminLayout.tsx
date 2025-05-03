
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  CarIcon, 
  Calendar, 
  Home, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  
  const menuItems = [
    { to: "/admin/dashboard", icon: <Home className="mr-2 h-4 w-4" />, label: t('admin.dashboard') },
    { to: "/admin/cars", icon: <CarIcon className="mr-2 h-4 w-4" />, label: t('admin.cars') },
    { to: "/admin/reservations", icon: <Calendar className="mr-2 h-4 w-4" />, label: t('admin.reservations') },
    { to: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" />, label: t('admin.settings') }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-white w-64 shadow-md py-4 hidden md:block">
        <div className="px-6 py-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Portu Rent</span>
          </Link>
          <div className="text-xs text-gray-500 mt-1">Panneau d'administration</div>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100",
                    currentPath === item.to ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600" : ""
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="px-6 mt-6">
            <LanguageSelector variant="admin" />
          </div>
        </nav>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Portu Rent</span>
          </Link>
          
          {/* Mobile menu */}
          <div className="flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "p-2 rounded-md",
                  currentPath === item.to ? "bg-blue-100 text-blue-700" : "text-gray-700"
                )}
              >
                {item.icon}
              </Link>
            ))}
            <LanguageSelector onlyIcon={true} />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
