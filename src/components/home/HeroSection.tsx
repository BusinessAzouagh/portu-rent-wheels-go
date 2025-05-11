import WhatsAppButton from "@/components/WhatsAppButton";
import {useLanguage} from "@/i18n/LanguageContext";

const HeroSection = () => {
    const {t} = useLanguage();

    return (
        <section
            className="hero-section relative flex items-center justify-center text-white min-h-[300px] sm:min-h-[450px]">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url("https://media-hosting.imagekit.io/622acaa96dbb4e1a/header.jpg?Expires=1841577283&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=tc4NDoaMJLFjqW9zhSpjQZm3UPg94CZRD7hOYP1e7YbdxHkdy9JDkOquHLmONhEj56qFJV1bBnTZSRTVCxTlmUKh9Oe4q4KlxcjtCXjQEUblCLMVP4dfI5yHf7qjLN~YX3iyTPma3VSkBF41UERI2Sd3P-SFl9HQIWwUMv62OacyiQSjPIg-S6TXoa03xvmF~Z8xdJHS3yiwCNoPJ3W1wzQlbks1FWs63YPNGmfNu8hu7knnxzmt~iF7klD5nAMx4dwLTddYAKN51JlRaoR4w~F9sAMsRLsutu07eWKRC~HzWdnWDObZENfFaIGjo11TyjB494-mKL6V-riZaHjFOQ__")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
            <div className="absolute inset-0 z-0 bg-black bg-opacity-60"/>

            <div className="container relative z-10 mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('home.rentIdealCar')}
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-10">
                        {t('home.qualityVehicles')}
                    </p>

                    <div className="flex justify-center">
                        <WhatsAppButton size="lg" className="py-6 px-8 text-lg">
                            {t('common.contactWhatsApp')}
                        </WhatsAppButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
