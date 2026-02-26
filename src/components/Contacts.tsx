import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
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
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">
                    Бесплатный звонок по РФ
                  </p>
                  <a
                    href="tel:+78002222815"
                    className="text-2xl font-black hover:text-orange-500 transition-colors"
                  >
                    8 (800) 222-28-15
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">
                    Электронная почта
                  </p>
                  <a
                    href="mailto:festivali2015@yandex.ru"
                    className="text-xl font-bold hover:text-orange-500 transition-colors"
                  >
                    festivali2015@yandex.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">
                    Офис
                  </p>
                  <p className="text-xl font-bold text-zinc-300">
                    г. Санкт-Петербург,
                    <br />
                    ул. Заставская, д. 7, офис 512
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href="https://vk.com/vdoxnovenie_fesf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-[#0077FF] hover:bg-[#0066CC] rounded-full text-white transition-colors"
                title="ВКонтакте"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.1 12.38c.45.45.92.89 1.34 1.37.28.32.54.66.75 1.03.22.38.1.84-.28 1.02-.15.07-.32.1-.49.1h-2.14c-.5 0-.93-.2-1.27-.58-.33-.36-.64-.73-.95-1.11-.16-.19-.33-.38-.53-.54-.23-.19-.48-.22-.73-.08-.34.19-.5.52-.5 1.05v.73c0 .35-.15.53-.5.53h-1.63c-1.3 0-2.45-.36-3.46-1.07-1.34-.94-2.34-2.18-3.15-3.58-1.04-1.8-1.8-3.73-2.3-5.74-.08-.32.06-.54.38-.54h2.2c.3 0 .5.15.6.44.4 1.28.93 2.5 1.6 3.63.4.67.87 1.28 1.45 1.8.2.18.42.22.62.1.25-.15.36-.4.36-.78v-3.2c0-.28-.05-.55-.18-.8-.14-.27-.03-.43.25-.43h2.64c.26 0 .4.1.45.36.03.14.04.28.04.43v3.7c0 .4.18.57.5.45.22-.08.4-.25.57-.43.52-.56.97-1.18 1.36-1.83.43-.73.78-1.5 1.07-2.3.1-.28.28-.42.58-.42h2.2c.33 0 .5.14.53.45.02.2-.04.4-.13.58-.4 1.02-.9 1.97-1.48 2.88-.36.56-.75 1.1-1.15 1.63-.27.35-.27.68.03.98z" />
                </svg>
              </a>
              <a
                href="https://vk.com/im?media=&sel=-222693229"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-full font-bold uppercase tracking-wider transition-colors gap-2"
              >
                <MessageCircle size={20} />
                Написать нам
              </a>
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
              <h3 className="text-2xl font-black uppercase tracking-wider mb-8">
                Оставить <span className="text-orange-500">заявку</span>
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Название коллектива
                  </label>
                  <input
                    type="text"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Ансамбль 'Вдохновение'"
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-5 font-black uppercase tracking-widest transition-colors mt-4"
                >
                  Отправить
                </button>
                <p className="text-xs text-zinc-600 text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            </div>
            
            {/* Decorative blur */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
