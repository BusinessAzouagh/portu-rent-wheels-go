
import { ContactFormValues } from "./ContactFormSchema";

export const sendEmail = async (data: ContactFormValues) => {
  // Simulation d'un envoi d'email via une API
  console.log("Form submitted:", data);
  console.log("Will send email to: business.azouagh@gmail.com");
  
  // Dans une vraie application, on utiliserait un service d'email comme EmailJS, SendGrid, etc.
  // Exemple avec fetch:
  /*
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'business.azouagh@gmail.com',
      from: {
        name: data.name,
        email: data.email || 'contact@portu-rent.com' // Utilise une adresse par défaut si email non fourni
      },
      subject: data.subject,
      message: data.message,
      phone: data.phone
    }),
  });
  
  return response.ok;
  */
  
  // Simulation d'une requête API
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true; // Simuler un succès
};
