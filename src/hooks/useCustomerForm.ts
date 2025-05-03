
import { useState } from "react";
import { CustomerFormData } from "@/types/reservation";

export const useCustomerForm = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    nationalId: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange
  };
};
