import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-500 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter uppercase mb-4 block">
              Фест-Пространство
            </Link>
            <p className="text-sm max-w-xs leading-relaxed">
              Творческое движение, объединяющее таланты со всей страны. Фестивали, конкурсы, мастер-классы.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-4">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#about" className="hover:text-orange-500 transition-colors">О Фест-Пространстве</Link></li>
              <li><Link to="/#calendar" className="hover:text-orange-500 transition-colors">Календарь</Link></li>
              <li><Link to="/#jury" className="hover:text-orange-500 transition-colors">Жюри</Link></li>
              <li><Link to="/committee" className="hover:text-orange-500 transition-colors">Оргкомитет</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-4">
              Документы
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Договор оферты</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Реквизиты</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} ООО «vremya-tancevat». Все права защищены.
          </p>
          <p>
            ИНН: 7810341160 ОГРН: 1157847083767
          </p>
        </div>
      </div>
    </footer>
  );
}
