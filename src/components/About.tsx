import { motion } from 'motion/react';
import { Star, Users, Trophy, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <Users size={32} />, value: '10 000+', label: 'Участников' },
    { icon: <Star size={32} />, value: '50+', label: 'Городов' },
    { icon: <Trophy size={32} />, value: '100+', label: 'Конкурсов' },
    { icon: <Heart size={32} />, value: '10 лет', label: 'С любовью к танцу' },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              О <span className="text-orange-500">Фест-Пространстве</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                Творческое движение «Фест-Пространство» — это масштабный проект, объединяющий талантливых танцоров, хореографов и руководителей коллективов со всей страны.
              </p>
              <p>
                Наша миссия — создание профессиональной площадки для обмена опытом, творческого роста и выявления новых талантов в сфере хореографического искусства.
              </p>
              <p>
                Мы проводим как очные, так и онлайн конкурсы, предоставляя равные возможности для участников из любых уголков мира. Профессиональное жюри, честное судейство и незабываемая атмосфера праздника танца!
              </p>
            </div>
            
            <div className="mt-10">
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold uppercase tracking-wider transition-colors"
              >
                Узнать больше
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center text-center hover:border-orange-500/50 transition-colors group"
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
