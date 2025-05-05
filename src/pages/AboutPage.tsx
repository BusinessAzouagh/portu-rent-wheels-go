
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('about.aboutPortuRent')}</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
                src="https://peoplespheres.com/wp-content/uploads/2018/08/Le-travail-en-equipe-levier-de-performance-666x380.webp"
                alt="Portu Rent Team"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">{t('about.ourHistory')}</h2>
            <p className="text-gray-600 mb-4">
              {t('about.historyText1')}
            </p>
            <p className="text-gray-600">
              {t('about.historyText2')}
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">{t('about.ourValues')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">{t('about.quality')}</h3>
              <p className="text-gray-600">{t('about.qualityText')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">{t('about.transparency')}</h3>
              <p className="text-gray-600">{t('about.transparencyText')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">{t('about.customerService')}</h3>
              <p className="text-gray-600">{t('about.customerServiceText')}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
