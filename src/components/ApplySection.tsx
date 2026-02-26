import { useState } from 'react';
import { motion } from 'motion/react';
import ApplicationModal from './ApplicationModal';

export default function ApplySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ phone: '', groupName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 18) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }
    setIsModalOpen(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length === 0) {
      setFormData({ ...formData, phone: '' });
      return;
    }
    if (val[0] === '8' || val[0] === '7') {
      val = val.substring(1);
    }
    let formatted = '+7';
    if (val.length > 0) formatted += ` (${val.substring(0, 3)}`;
    if (val.length >= 4) formatted += `) ${val.substring(3, 6)}`;
    if (val.length >= 7) formatted += `-${val.substring(6, 8)}`;
    if (val.length >= 9) formatted += `-${val.substring(8, 10)}`;
    setFormData({ ...formData, phone: formatted });
  };

  return (
    <section id="apply" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden border border-zinc-800 text-center"
        >
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider mb-4">
              Оставить <span className="text-orange-500">заявку</span>
            </h2>
            <p className="text-zinc-400 mb-8 text-sm sm:text-lg max-w-2xl mx-auto">
              Введите базовые данные, чтобы начать заполнение подробной анкеты участника фестиваля.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto text-left">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Телефон</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={18}
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
                  placeholder="Ансамбль 'Фест-Пространство'"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-5 font-black uppercase tracking-widest transition-colors mt-4"
              >
                Начать заполнение
              </button>
            </form>
          </div>
          
          {/* Decorative blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>

      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={formData} 
      />
    </section>
  );
}
