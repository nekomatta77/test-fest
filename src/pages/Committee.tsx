import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Users, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ApplicationModal from '../components/ApplicationModal';

export default function Committee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ phone: '', groupName: '' });
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const committeeMembers = [
    {
      name: 'Анна Смирнова',
      role: 'Директор фестиваля',
      image: 'https://picsum.photos/seed/anna/300/300?blur=1',
      phone: '+7 (999) 111-22-33',
    },
    {
      name: 'Любовь Иванова',
      role: 'Главный координатор',
      image: 'https://picsum.photos/seed/lubov/300/300?blur=1',
      phone: '+7 (999) 222-33-44',
    },
    {
      name: 'Светлана Петрова',
      role: 'Менеджер по работе с участниками',
      image: 'https://picsum.photos/seed/svetlana/300/300?blur=1',
      phone: '+7 (999) 333-44-55',
    },
  ];

  return (
    <main className="pt-24 pb-24 bg-zinc-950 min-h-screen text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Организационный <span className="text-orange-500">комитет</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Команда профессионалов, которая делает каждый фестиваль незабываемым событием. Мы всегда на связи и готовы помочь!
          </p>
        </motion.div>

        {/* Committee Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-orange-500/50 transition-colors group"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-zinc-800 group-hover:border-orange-500 transition-colors">
                <img src={member.image} alt={member.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-1">{member.name}</h3>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <a href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <Phone size={16} />
                {member.phone}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Contacts & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" id="apply">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
              Свяжитесь <span className="text-orange-500">с нами</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-md">
              Остались вопросы? Мы всегда на связи и готовы помочь вам с регистрацией и участием в наших проектах.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">Бесплатный звонок по РФ</p>
                  <a href="tel:+78002222815" className="text-2xl font-black hover:text-orange-500 transition-colors">8 (800) 222-28-15</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">Электронная почта</p>
                  <a href="mailto:festivali2015@yandex.ru" className="text-xl font-bold hover:text-orange-500 transition-colors">festivali2015@yandex.ru</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">Офис</p>
                  <p className="text-xl font-bold text-zinc-300">г. Санкт-Петербург,<br />ул. Заставская, д. 7, офис 512</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-zinc-800"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase tracking-wider mb-2">
                Быстрая <span className="text-orange-500">заявка</span>
              </h3>
              <p className="text-zinc-400 mb-8 text-sm">Введите базовые данные, чтобы начать заполнение подробной анкеты.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Название коллектива</label>
                  <input
                    type="text"
                    required
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Ансамбль 'Вдохновение'"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-5 font-black uppercase tracking-widest transition-colors mt-4"
                >
                  Отправить
                </button>
                <p className="text-xs text-zinc-600 text-center mt-4">
                  Нажимая кнопку, вы перейдете к заполнению подробной анкеты.
                </p>
              </form>
            </div>
            
            {/* Decorative blur */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>

      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={formData} 
      />
    </main>
  );
}
