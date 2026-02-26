import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

type FilterType = 'all' | '2026' | '2025' | '2024' | 'online' | 'offline';

interface Photo {
  id: number;
  url: string;
  title: string;
  year: string;
  type: 'online' | 'offline';
}

const photos: Photo[] = [
  { id: 1, url: 'https://picsum.photos/seed/dance1/800/600', title: 'Гранд-финал в Москве', year: '2025', type: 'offline' },
  { id: 2, url: 'https://picsum.photos/seed/dance2/800/600', title: 'Выступление ансамбля', year: '2024', type: 'offline' },
  { id: 3, url: 'https://picsum.photos/seed/dance3/800/600', title: 'Онлайн-конкурс весна', year: '2025', type: 'online' },
  { id: 4, url: 'https://picsum.photos/seed/dance4/800/600', title: 'Награждение победителей', year: '2026', type: 'offline' },
  { id: 5, url: 'https://picsum.photos/seed/dance5/800/600', title: 'Мастер-класс от жюри', year: '2024', type: 'offline' },
  { id: 6, url: 'https://picsum.photos/seed/dance6/800/600', title: 'Онлайн-отбор', year: '2024', type: 'online' },
  { id: 7, url: 'https://picsum.photos/seed/dance7/800/600', title: 'Яркие эмоции', year: '2026', type: 'offline' },
  { id: 8, url: 'https://picsum.photos/seed/dance8/800/600', title: 'Современная хореография', year: '2025', type: 'offline' },
  { id: 9, url: 'https://picsum.photos/seed/dance9/800/600', title: 'Народный танец', year: '2026', type: 'online' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Все фото', value: 'all' },
    { label: '2026', value: '2026' },
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: 'Очные', value: 'offline' },
    { label: 'Онлайн', value: 'online' },
  ];

  const filteredPhotos = photos.filter((photo) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'online' || activeFilter === 'offline') {
      return photo.type === activeFilter;
    }
    return photo.year === activeFilter;
  });

  return (
    <section id="gallery" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Наша <span className="text-orange-500">Галерея</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Яркие моменты с прошедших фестивалей и конкурсов. Эмоции, талант и вдохновение в каждом кадре.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter.value
                  ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-1">{photo.title}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider bg-orange-500/20 px-2 py-1 rounded">
                      {photo.year}
                    </span>
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider bg-zinc-800/80 px-2 py-1 rounded">
                      {photo.type === 'online' ? 'Онлайн' : 'Очный'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={32} />
              </button>
              
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
                  <p className="text-zinc-400">
                    {selectedPhoto.year} • {selectedPhoto.type === 'online' ? 'Онлайн конкурс' : 'Очный конкурс'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
