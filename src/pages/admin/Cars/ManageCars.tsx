
import AdminLayout from "../AdminLayout";
import CarsHeader from "./components/CarsHeader";
import CarsTable from "./components/CarsTable";
import DeleteCarDialog from "./components/DeleteCarDialog";
import { useCarsManagement } from "./hooks/useCarsManagement";
import { useLanguage } from "@/i18n/LanguageContext";

const ManageCars = () => {
  const { t } = useLanguage();
  const {
    cars: filteredCars,
    isLoading,
    searchTerm,
    setSearchTerm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    carToDelete,
    handleToggleAvailability,
    openDeleteDialog,
    handleDeleteCar
  } = useCarsManagement();
  
  return (
    <AdminLayout>
      <CarsHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500">{t('common.loading')}</div>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          {filteredCars.length > 0 ? (
            <CarsTable 
              cars={filteredCars} 
              onToggleAvailability={handleToggleAvailability}
              onDeleteClick={openDeleteDialog}
            />
          ) : (
            <div className="py-10 text-center text-gray-500">
              {searchTerm ? (
                <p>{t('admin.noReservationsFound')}</p>
              ) : (
                <p>{t('admin.noReservationsAvailable')}</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <DeleteCarDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        car={carToDelete}
        onConfirm={handleDeleteCar}
      />
    </AdminLayout>
  );
};

export default ManageCars;
