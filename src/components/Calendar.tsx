import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';

export default function Calendar() {
  const events = [
    {
      id: 1,
      date: '15-17 Марта 2026',
      city: 'Санкт-Петербург',
      title: 'Международный конкурс-фестиваль хореографического искусства',
      type: 'Очный конкурс',
      status: 'Прием заявок',
    },
    {
      id: 2,
      date: '20-25 Апреля 2026',
      city: 'Онлайн',
      title: 'Всероссийский онлайн-конкурс «Вдохновение»',
      type: 'Онлайн конкурс',
      status: 'Скоро',
    },
    {
      id: 3,
      date: '10-12 Июня 2026',
      city: 'Москва',
      title: 'Гранд-финал Творческого Движения',
      type: 'Очный конкурс',
      status: 'Закрытый',
    },
    {
      id: 4,
      date: '5-8 Сентября 2026',
      city: 'Казань',
      title: 'Осенний кубок «Вдохновение»',
      type: 'Очный конкурс',
      status: 'Скоро',
    },
  ];

  return (
    <section id="calendar" className="py-24 bg-zinc-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Календарь <span className="text-orange-500">событий</span>
            </h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-2xl">
              Расписание предстоящих фестивалей и конкурсов. Выберите подходящий формат и город для участия вашего коллектива.
            </p>
          </motion.div>
          <motion.a
            href="#apply"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold uppercase tracking-wider transition-colors group"
          >
            Все мероприятия
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-6 md:p-8 transition-all hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] flex flex-col lg:flex-row gap-6 lg:items-center justify-between overflow-hidden"
            >
              {/* Decorative line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-orange-500 transition-colors" />

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-center">
                <div className="flex items-center gap-3 text-orange-500">
                  <CalendarIcon size={24} className="shrink-0" />
                  <span className="font-bold text-lg tracking-wide">{event.date}</span>
                </div>
                
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin size={24} className="shrink-0 text-zinc-500" />
                  <span className="font-medium text-lg">{event.city}</span>
                </div>

                <div className="md:col-span-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    event.type === 'Онлайн конкурс' 
                      ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' 
                      : 'border-orange-500/30 text-orange-400 bg-orange-500/10'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>

              <div className="flex-2 lg:max-w-md">
                <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-orange-400 transition-colors">
                  {event.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 mt-4 lg:mt-0 shrink-0">
                <div className={`text-sm font-bold uppercase tracking-wider ${
                  event.status === 'Прием заявок' ? 'text-green-500' : 'text-zinc-500'
                }`}>
                  {event.status}
                </div>
                <a
                  href="#apply"
                  className="px-6 py-3 bg-white text-black hover:bg-orange-500 hover:text-white rounded-full font-bold uppercase tracking-wider transition-colors text-sm"
                >
                  Положение
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold uppercase tracking-wider transition-colors group"
          >
            Все мероприятия
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
