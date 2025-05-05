import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {useLanguage} from "@/i18n/LanguageContext";

const AboutSection = () => {
    const {t} = useLanguage();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="lg:flex items-center gap-12">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <img
                            src="/lovable-uploads/about.webp"
                            alt="Portu Rent Team"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('about.aboutPortuRent')}</h2>
                        <p className="text-gray-600 mb-4">
                            {t('about.historyText1')}
                        </p>
                        <p className="text-gray-600 mb-6">
                            {t('about.historyText2')}
                        </p>
                        <Link to="/about">
                            <Button>{t('common.about')}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
