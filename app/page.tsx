import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import DependencyMap from "./components/DependencyMap";
import Checklist from "./components/Checklist";
import Pillars from "./components/Pillars";
import Footer from "./components/Footer";
import ShareButton from "./components/ShareButton";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <div className="max-w-5xl mx-auto px-6">
          <hr className="border-warm-200" />
        </div>
        <DependencyMap />
        <Checklist />
        <Pillars />
      </main>
      <Footer />
      <ShareButton />
    </>
  );
}
