import { motion } from 'motion/react';

export default function Jury() {
  const juryMembers = [
    {
      id: 1,
      name: 'Егор Дружинин',
      role: 'Хореограф, режиссер',
      description: 'Заслуженный артист России, хореограф-постановщик, наставник шоу «Танцы» на ТНТ.',
      image: 'https://picsum.photos/seed/jury1/400/500?blur=1',
    },
    {
      id: 2,
      name: 'Алла Духова',
      role: 'Художественный руководитель',
      description: 'Основатель и бессменный художественный руководитель международного балета «Todes».',
      image: 'https://picsum.photos/seed/jury2/400/500?blur=1',
    },
    {
      id: 3,
      name: 'Мигель',
      role: 'Хореограф, продюсер',
      description: 'Режиссер, хореограф, продюсер, наставник и член жюри шоу «Танцы» на ТНТ.',
      image: 'https://picsum.photos/seed/jury3/400/500?blur=1',
    },
    {
      id: 4,
      name: 'Владимир Варнава',
      role: 'Хореограф, танцовщик',
      description: 'Дважды лауреат театральной премии «Золотая маска», независимый хореограф.',
      image: 'https://picsum.photos/seed/jury4/400/500?blur=1',
    },
  ];

  return (
    <section id="jury" className="py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Наше <span className="text-orange-500">Жюри</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Профессионалы высочайшего уровня, признанные мастера хореографического искусства, готовые оценить ваш талант по достоинству.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {juryMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900 mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">
                    {member.role}
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
