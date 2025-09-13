import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Partners from "../components/Partners";
import Evaluation from "../components/Evalaution";
import Experts from "../components/Experts";
import Support from "../components/Support";
import Find from "../components/Find";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import About from "../components/About";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <div className="mt-top"></div>
      <Navbar />
      <Banner />
      <Partners />
      <Evaluation />
      <Experts />
      <Support />
      <Find />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
