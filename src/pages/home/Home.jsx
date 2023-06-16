import AboutUs from "../../components/aboutUs/AboutUs";
import ContactUs from "../../components/contactUs/ContactUs";
import Header from "../../components/header/Header";
import HomeServices from "../../components/homeServices/HomeServices";

const Home = () => {
  return (
    <div>
      <Header />
      <AboutUs />
      <HomeServices />
      <ContactUs />
    </div>
  );
};

export default Home;
