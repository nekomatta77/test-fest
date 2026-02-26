import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Briefcase, CheckCircle, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru);

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
    date: '',
    city: '',
    leaderName: '',
    teacherName: '',
    email: '',
    socials: '',
    participantsInfo: '',
    accompanyingCount: '',
    manager: '',
    grantCertificate: '',
    arrivalDate: '',
    departureDate: '',
    roomNameAndMedals: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep('selection');
      setFormData((prev) => ({ 
        ...prev, 
        phone: initialData.phone, 
        groupName: initialData.groupName,
        date: '',
        city: '',
        leaderName: '',
        teacherName: '',
        email: '',
        socials: '',
        participantsInfo: '',
        accompanyingCount: '',
        manager: '',
        grantCertificate: '',
        arrivalDate: '',
        departureDate: '',
        roomNameAndMedals: '',
      }));
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateStep1Local = () => {
    const required = ['date', 'groupName', 'city', 'leaderName', 'phone', 'participantsInfo', 'manager'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        alert('Пожалуйста, заполните все обязательные поля, отмеченные оранжевой звездочкой.');
        return false;
      }
    }
    return true;
  };

  const validateStep1Remote = () => {
    const required = ['date', 'groupName', 'city', 'leaderName', 'phone', 'participantsInfo', 'manager', 'arrivalDate', 'departureDate', 'roomNameAndMedals'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        alert('Пожалуйста, заполните все обязательные поля, отмеченные оранжевой звездочкой.');
        return false;
      }
    }
    return true;
  };

  const handleNextFromLocal = () => {
    if (validateStep1Local()) {
      setStep('program');
    }
  };

  const handleNextFromRemote = () => {
    if (validateStep1Remote()) {
      setStep('step2_remote');
    }
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
              <div className="relative">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Дата проведения <span className="text-orange-500">*</span></label>
                <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={(date: Date | null) => handleInputChange('date', formatDate(date))}
                  locale="ru"
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Выберите дату"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  required
                />
                <CalendarIcon className="absolute right-4 top-9 text-zinc-500 pointer-events-none" size={20} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Полное название коллектива <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.groupName} onChange={(e) => handleInputChange('groupName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Страна, город <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ф.И.О Руководителя <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.leaderName} onChange={(e) => handleInputChange('leaderName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ф.И.О педагога/репетитора</label>
                <input type="text" value={formData.teacherName} onChange={(e) => handleInputChange('teacherName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Контактный телефон <span className="text-orange-500">*</span></label>
                <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email руководителя</label>
                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ссылка на соцсети</label>
                <input type="text" value={formData.socials} onChange={(e) => handleInputChange('socials', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во участников + возраст <span className="text-orange-500">*</span></label>
                <textarea rows={2} value={formData.participantsInfo} onChange={(e) => handleInputChange('participantsInfo', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Беби - 10, Взрослые - 24" required></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во сопровождающих</label>
                <input type="number" value={formData.accompanyingCount} onChange={(e) => handleInputChange('accompanyingCount', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ваш менеджер <span className="text-orange-500">*</span></label>
                <select value={formData.manager} onChange={(e) => handleInputChange('manager', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required>
                  <option value="">Выберите менеджера</option>
                  <option value="Анна">Анна</option>
                  <option value="Любовь">Любовь</option>
                  <option value="Светлана">Светлана</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Грантовый сертификат</label>
                <input type="text" value={formData.grantCertificate} onChange={(e) => handleInputChange('grantCertificate', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Номер сертификата (если есть)" />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('selection')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={handleNextFromLocal} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
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
              <div className="relative">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Дата проведения <span className="text-orange-500">*</span></label>
                <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={(date: Date | null) => handleInputChange('date', formatDate(date))}
                  locale="ru"
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Выберите дату"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  required
                />
                <CalendarIcon className="absolute right-4 top-9 text-zinc-500 pointer-events-none" size={20} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Полное название коллектива <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.groupName} onChange={(e) => handleInputChange('groupName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Страна, город <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ф.И.О Руководителя <span className="text-orange-500">*</span></label>
                <input type="text" value={formData.leaderName} onChange={(e) => handleInputChange('leaderName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ф.И.О педагога/репетитора</label>
                <input type="text" value={formData.teacherName} onChange={(e) => handleInputChange('teacherName', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Контактный телефон <span className="text-orange-500">*</span></label>
                <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email руководителя</label>
                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ссылка на соцсети</label>
                <input type="text" value={formData.socials} onChange={(e) => handleInputChange('socials', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во участников + возраст <span className="text-orange-500">*</span></label>
                <textarea rows={2} value={formData.participantsInfo} onChange={(e) => handleInputChange('participantsInfo', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Беби - 10, Взрослые - 24" required></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Кол-во сопровождающих</label>
                <input type="number" value={formData.accompanyingCount} onChange={(e) => handleInputChange('accompanyingCount', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Ваш менеджер <span className="text-orange-500">*</span></label>
                <select value={formData.manager} onChange={(e) => handleInputChange('manager', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" required>
                  <option value="">Выберите менеджера</option>
                  <option value="Анна">Анна</option>
                  <option value="Любовь">Любовь</option>
                  <option value="Светлана">Светлана</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Грантовый сертификат</label>
                <input type="text" value={formData.grantCertificate} onChange={(e) => handleInputChange('grantCertificate', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Номер сертификата (если есть)" />
              </div>

              <div className="md:col-span-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Приезд и Отъезд <span className="text-orange-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs text-zinc-500 mb-1">Дата приезда</label>
                    <DatePicker
                      selected={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                      onChange={(date: Date | null) => handleInputChange('arrivalDate', formatDate(date))}
                      locale="ru"
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Выберите дату"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                      required
                    />
                    <CalendarIcon className="absolute right-3 top-8 text-zinc-500 pointer-events-none" size={16} />
                  </div>
                  <div className="relative">
                    <label className="block text-xs text-zinc-500 mb-1">Дата отъезда</label>
                    <DatePicker
                      selected={formData.departureDate ? new Date(formData.departureDate) : null}
                      onChange={(date: Date | null) => handleInputChange('departureDate', formatDate(date))}
                      locale="ru"
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Выберите дату"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                      required
                    />
                    <CalendarIcon className="absolute right-3 top-8 text-zinc-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Название номера (в пакете) + кол-во медалей <span className="text-orange-500">*</span></label>
                <textarea rows={2} value={formData.roomNameAndMedals} onChange={(e) => handleInputChange('roomNameAndMedals', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Например: Номер 'Весна', 15 медалей" required></textarea>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep('selection')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
                Назад
              </button>
              <button type="button" onClick={handleNextFromRemote} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 font-bold uppercase tracking-wider transition-colors">
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
