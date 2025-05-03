
import Layout from "@/components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">À propos de Portu Rent</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1612057457904-28f4785d24e5?q=80&w=800" 
              alt="Portu Rent Team" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-4">
              Fondée en 2010, Portu Rent s'est imposée comme l'une des agences de location de voitures les plus fiables au Portugal. Notre mission est simple : offrir un service de qualité supérieure à des prix compétitifs.
            </p>
            <p className="text-gray-600">
              Avec une flotte moderne et régulièrement renouvelée, nous garantissons des véhicules en parfait état pour que votre voyage se déroule sans accroc. Notre équipe multilingue est là pour vous conseiller et vous accompagner tout au long de votre location.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">Qualité</h3>
              <p className="text-gray-600">Nous ne proposons que des véhicules récents, régulièrement entretenus et parfaitement nettoyés avant chaque location.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">Transparence</h3>
              <p className="text-gray-600">Pas de frais cachés ni de surprises désagréables. Nos tarifs sont clairs et tout est inclus dans le prix annoncé.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-primary">Service Client</h3>
              <p className="text-gray-600">Notre équipe est disponible 7j/7 pour répondre à vos questions et vous aider en cas de besoin pendant votre location.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Directeur', 'Responsable Commercial', 'Service Client', 'Responsable Maintenance'].map((role, index) => (
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
