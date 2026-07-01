import HeroV2 from "../components/HeroV2";
import Pillars from "../components/home/Pillars";
import Industries from "../components/home/Industries";
import IosShowcase from "../components/home/IosShowcase";
import Ecosystem from "../components/home/Ecosystem";
import AndroidShowcase from "../components/home/AndroidShowcase";
import FreedomTeaser from "../components/home/FreedomTeaser";
import ContactCta from "../components/home/ContactCta";

const Home = () => {
  return (
    <div className="bg-white">
      <HeroV2 />
      <Pillars />
      <Industries />
      <IosShowcase />
      <Ecosystem />
      <AndroidShowcase />
      <FreedomTeaser />
      <ContactCta />
    </div>
  );
};

export default Home;
