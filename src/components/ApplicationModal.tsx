import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Briefcase, CheckCircle, Plus, Trash2 } from 'lucide-react';

type Step = 'selection' | 'step1_local' | 'step1_remote' | 'step2_remote' | 'program' | 'awards' | 'success';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: { phone: string; groupName: string };
}

export default function ApplicationModal({ isOpen, onClose, initialData }: ApplicationModalProps) {
  const [step, setStep] = useState<Step>('selection');
  const [formData, setFormData] = useState({
    phone: '',
    groupName: '',
    type: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep('selection');
      setFormData((prev) => ({ ...prev, phone: initialData.phone, groupName: initialData.groupName }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSelectType = (type: 'local' | 'remote') => {
    setFormData((prev) => ({ ...prev, type }));
    setStep(type === 'local' ? 'step1_local' : 'step1_remote');
  };

  const renderStep = () => {
    switch (step) {
      case 'selection':
        return (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-center text-zinc-400 mb-6">Пожалуйста, выберите тип участия:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSelectType('local')}
                className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-2xl p-6 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-500 mb-4 transition-colors">
                  <Home size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Я местный</h3>
                <p className="text-sm text-zinc-500">Без проживания<br />(3 шага анкеты)</p>
              </button>
              <button
                type="button"
                onClick={() => handleSelectType('remote')}
                className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-2xl p-6 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-500 mb-4 transition-colors">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Я иногородний</h3>
                <p className="text-sm text-zinc-500">С проживанием<br />(4 шага анкеты)</p>
              </button>
            </div>
          </motion.div>
        );

      case 'step1_local':
        return (
          <motion.div
            key="step1_local"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-zinc-400 mb-6 font-bold uppercase tracking-wider text-sm">Шаг 1: Общие данные (Местные)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Дата фестиваля *</label>
                <input type="date" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Название коллектива *</label>
                <input type="text" defaultValue={formData.groupName} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Страна, город *</label>
                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">ФИО руководителя *</label>
                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Контактный телефон *</label>
                <input type="tel" defaultValue={formData.phone} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email руководителя</label>
                <input type="email" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во участников + возраст *</label>
                <textarea rows={2} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Беби - 10, Взрослые - 24" required></textarea>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('selection')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={() => setStep('program')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Далее
              </button>
            </div>
          </motion.div>
        );

      case 'step1_remote':
        return (
          <motion.div
            key="step1_remote"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-zinc-400 mb-6 font-bold uppercase tracking-wider text-sm">Шаг 1: Общие данные (Иногородние)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Дата фестиваля *</label>
                <input type="date" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Название коллектива *</label>
                <input type="text" defaultValue={formData.groupName} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Страна, город *</label>
                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">ФИО руководителя *</label>
                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Контактный телефон *</label>
                <input type="tel" defaultValue={formData.phone} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email руководителя</label>
                <input type="email" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              
              <div className="md:col-span-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Приезд</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <input type="text" placeholder="Вокзал / Рейс" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="md:col-span-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Отъезд</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <input type="text" placeholder="Вокзал / Рейс" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во участников + возраст *</label>
                <textarea rows={2} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Беби - 10, Взрослые - 24" required></textarea>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('selection')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={() => setStep('step2_remote')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                К проживанию
              </button>
            </div>
          </motion.div>
        );

      case 'step2_remote':
        return (
          <motion.div
            key="step2_remote"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-zinc-400 mb-6 font-bold uppercase tracking-wider text-sm">Шаг 2: Проживание и Списки</p>
            
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl relative">
              <button type="button" className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors">
                <Trash2 size={20} />
              </button>
              <h4 className="font-bold text-orange-500 mb-3">Участник 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="ФИО" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                <input type="text" placeholder="Дата рождения" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500">
                  <option value="">Тип размещения</option>
                  <option value="2">2-местное</option>
                  <option value="3">3-местное</option>
                </select>
              </div>
            </div>

            <button type="button" className="w-full border border-dashed border-orange-500 text-orange-500 hover:bg-orange-500/10 rounded-xl py-3 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
              <Plus size={20} /> Добавить участника
            </button>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('step1_remote')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={() => setStep('program')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                К программе
              </button>
            </div>
          </motion.div>
        );

      case 'program':
        return (
          <motion.div
            key="program"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-zinc-400 mb-6 font-bold uppercase tracking-wider text-sm">Программа выступлений</p>
            
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl relative">
              <button type="button" className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors">
                <Trash2 size={20} />
              </button>
              <h4 className="font-bold text-orange-500 mb-3">Номер 1</h4>
              <div className="grid grid-cols-1 gap-3">
                <input type="text" placeholder="Название номера" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Номинация" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <input type="text" placeholder="Возрастная категория" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
                </div>
                <input type="text" placeholder="Продолжительность (мм:сс)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500" />
              </div>
            </div>

            <button type="button" className="w-full border border-dashed border-orange-500 text-orange-500 hover:bg-orange-500/10 rounded-xl py-3 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
              <Plus size={20} /> Добавить номер
            </button>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep(formData.type === 'local' ? 'step1_local' : 'step2_remote')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={() => setStep('awards')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                К наградам
              </button>
            </div>
          </motion.div>
        );

      case 'awards':
        return (
          <motion.div
            key="awards"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-zinc-400 mb-6 font-bold uppercase tracking-wider text-sm">Наградная продукция (Доп.)</p>
            
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Выберите тип награды:</label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 mb-4">
                <option value="none">Не выбрано</option>
                <option value="medal">Медали</option>
                <option value="diploma">Дипломы</option>
                <option value="cup">Кубки</option>
              </select>
              
              <p className="text-sm text-zinc-400 text-center mb-4">
                Здесь вы можете заказать дополнительные именные дипломы, медали или кубки для участников.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('program')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={() => setStep('success')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Отправить все
              </button>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-wider mb-4">Спасибо!</h2>
            <p className="text-zinc-400 text-lg mb-8">Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время.</p>
            <button type="button" onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl px-8 py-4 font-bold uppercase tracking-wider transition-colors">
              Закрыть
            </button>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800 shrink-0">
            <h2 className="text-2xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
              Анкета участника
            </h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
