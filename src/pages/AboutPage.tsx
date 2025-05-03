
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
              src="https://images.unsplash.com/photo-1612057457904-28f4785d24e5?q=80&w=800" 
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
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">{t('about.ourTeam')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              t('about.director'), 
              t('about.commercialManager'), 
              t('about.customerServiceRole'), 
              t('about.maintenanceManager')
            ].map((role, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 70}.jpg`} 
                    alt={`Team member ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">John Doe {index + 1}</h3>
                <p className="text-gray-600 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
