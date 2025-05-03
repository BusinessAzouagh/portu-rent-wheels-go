
import Layout from "@/components/Layout";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('contact.contactUs')}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ContactInfo />
          
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
