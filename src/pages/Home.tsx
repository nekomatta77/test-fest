import { motion } from 'motion/react';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Calendar from '../components/Calendar';
import Jury from '../components/Jury';
import Gallery from '../components/Gallery';
import ApplySection from '../components/ApplySection';

function FadeInSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 10);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <FadeInSection>
        <About />
      </FadeInSection>
      <FadeInSection>
        <Calendar />
      </FadeInSection>
      <FadeInSection>
        <Gallery />
      </FadeInSection>
      <FadeInSection>
        <Jury />
      </FadeInSection>
      <FadeInSection>
        <ApplySection />
      </FadeInSection>
    </main>
  );
}
