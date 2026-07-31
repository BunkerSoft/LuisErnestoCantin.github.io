import Navbar from "./components/Navbar";
import HeroVideo from "./components/HeroVideo";
import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import About from "./components/About";
import PersonalInfo from "./components/PersonalInfo";
import Tools from "./components/Tools";
import Education from "./components/Education";
import Projects from "./components/Projects";
import References from "./components/References";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <HeroVideo />

      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      <About />
      <PersonalInfo />
      <Tools />
      <Education />
      <Projects />
      <References />
      <Footer />
    </main>
  );
}
