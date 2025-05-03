
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez saisir une adresse email valide" }).optional().or(z.literal('')),
  phone: z.string().min(9, { message: "Veuillez saisir un numéro de téléphone valide" }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const sendEmail = async (data: FormValues) => {
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const success = await sendEmail(data);
      
      if (success) {
        toast.success("Votre message a été envoyé avec succès. Nous vous contacterons bientôt.", {
          duration: 5000,
        });
        form.reset();
      } else {
        throw new Error("Échec de l'envoi du message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Nos coordonnées</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">Portu Rent</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:business.azouagh@gmail.com"
                      className="text-primary hover:underline"
                    >
                      business.azouagh@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a 
                      href="tel:+32484223699" 
                      className="text-primary hover:underline"
                    >
                      +32 484 22 36 99
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium mb-2">Heures d'ouverture</h4>
                <p className="text-gray-600">Lundi - Vendredi: 9:00 - 18:00</p>
                <p className="text-gray-600">Samedi: 10:00 - 16:00</p>
                <p className="text-gray-600">Dimanche: Fermé</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Envoyez-nous un message</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+32 000 00 00 00" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-gray-400">(facultatif)</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Votre email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Sujet de votre message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Écrivez votre message ici" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        Envoi en cours... 
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
