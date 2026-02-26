/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Calendar from './components/Calendar';
import Jury from './components/Jury';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Calendar />
        <Jury />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
