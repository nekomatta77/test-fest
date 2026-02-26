import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface JuryMember {
  id: number;
  name: string;
  role: string;
  img: string;
  bio: string;
}

const juryData: JuryMember[] = [
  { id: 1, name: "Иван Сачков", role: "Хореограф, танцовщик", img: "/images/jury/Sachkov.png", bio: "Преподаватель-исследователь современного танца программы бакалавриата «Искусство современного танца» Санкт-Петербургской Государственной консерватории имени Н.А.Римского-Корсакова, Академии Русского балета имени А. Я. Вагановой. Приглашенный педагог танцевальной труппы MA Dance — MusicAeterna при фонде Теодора Курентзиса. Санкт-Петербург." },
  { id: 2, name: "Виктория Сидельникова", role: "Дипломированный специалист, хореограф", img: "/images/jury/Sidelnikova.png", bio: "Руководитель 1 категории. Член федерации педагогов-хореографов России. Хореограф интенсивов и мастер-классов, представитель танцевальных форумов и фестивалей в России. Артист мюзиклов и спектаклей Московского академического театра сатиры. Артист драмы высшей категории. Участница телевизионных проектов «Танцуй» на Первом, «Танцы» на ТНТ, «Танцуют все». Артист телевизионных передач и программ на телеканалах ТНТ, ТВЦ, Россия 1 и другие. Неоднократно участница образовательной программы современного танца по иностранным педагогам-хореографам (США, Великобритания, Финляндия, Израиль, Испания, Швеция, Бельгия, Нидерланды). Практик и психолог — авторской методики развития современной пластики тела. Москва." },
  { id: 3, name: "Арсений Хорунжий", role: "Дипломированный специалист", img: "/images/jury/Horunjii.png", bio: "Образование высшее. Закончил Российскую академию театрального искусства ГИТИС. Педагог историко-бытовых и современных бальных танцев по специализации хореограф-постановщик шоу программ. Хореограф Московского академического театра сатиры. Артист драмы высшей категории. Член Союза Театральных деятелей Российской Федерации. Член Федерации педагогов-хореографов РФ. Хореограф победителей проекта «Танцы со звездами» 2013-2016 (Россия-1). Хореограф проекта «Танцы на ТНТ» (команда Егора Дружинина). Топ 25 лучших танцоров страны 1-го сезона «Танцев на ТНТ». Судья танцевальных Федераций ОРТО, МАРКС. Экс-участник проекта A-Dessa (Стас Костюшкин). Хореограф и режиссер многочисленных городских мероприятий Москвы и Московской области. Награжден медалью Путина. Занесен в книгу «Одаренные дети, будущее России». Москва." },
  { id: 4, name: "Сергей Марченко", role: "Кандидат педагогических наук, доцент", img: "/images/jury/marchenko.png", bio: "Заведующий кафедрой современной хореографии хореографического факультета Московского государственного института культуры (МГИК). Доцент кафедры искусство хореографа Института славянской культуры. Москва." },
  { id: 5, name: "Владимир Сергиенко", role: "Кандидат педагогических наук", img: "/images/jury/sergienko.png", bio: "Доцент ВАК по специальности «Хореографическое искусство», доцент кафедры хореографии Орловского государственного института культуры. Руководитель лаборатории современного танца «Dругое Dвижение». Орёл." },
  { id: 6, name: "Кристина Фатхудинова", role: "Доцент кафедры народного танца МГИК", img: "/images/jury/fathudin.png", bio: "Лауреат международных конкурсов, автор творческих показов по народно-сценическому танцу, автор статей по теории и практике народно-сценического танца в подготовке студентов в вузе. Обладатель высочайшей благодарности «За примерное служение Отечеству, высокополезные труды на поприще просвещения и значительный личный вклад в сохранение и развитие образования, науки, творчества и культуры»." },
  { id: 7, name: "Александр Скородумов", role: "Экс-солист ансамбля танца им. П. Вирского", img: "/images/jury/skorodum.png", bio: "Экс-солист Государственного академического ордена Дружбы народов ансамбля танца им. П. Вирского. Артист Государственного ансамбля песни и танца «Ставрополье», Краснознамённого ансамбля песни и пляски МВО, артист балета Санкт-Петербургского мюзик-холла. Художественный руководитель ансамбля «Огни». Санкт-Петербург." },
  { id: 8, name: "Наталия Гофман", role: "Лауреат международных конкурсов", img: "/images/jury/gofman.png", bio: "Доцент кафедры современной хореографии Московского Государственного института культуры." },
  { id: 9, name: "Александра Рудик", role: "Режиссёр-хореограф, педагог", img: "/images/jury/rudik.png", bio: "Магистр хореографического искусства. Основательница Платформы современного танца bereg (Москва). Экс-артистка современной труппы театра «Балет Москва» (2008-2018). Художественный руководитель фестиваля спектаклей современного танца «Дети танцуют». Педагог по сценическому танцу в ГИТИС. Преподаватель кафедры современной хореографии в МГИК. Москва." },
  { id: 10, name: "Екатерина Мельникова", role: "Педагог-хореограф, кандидат педагогических наук", img: "/images/jury/melnik.png", bio: "Доцент кафедры Хореографии Института театрального искусства им. Народного артиста СССР И. Д. Кобзона (г. Москва). Доцент кафедры сценических искусств МГПУ (Институт культуры и искусств). Доцент ИСПО хореографический колледж им. К. Д. Ушинского («Варшавка Арт»). Член Международного Танцевального совета CID при ЮНЕСКО. Член Союза театральных деятелей РФ. Член Международного союза хореографов. Лауреат международных хореографических конкурсов. Экс-артистка балета Пензенской балетной труппы и Московского музыкального театра «Эксперимент» под руководством Заслуженного артиста России Б. Борейко. Москва." },
  { id: 11, name: "Виктория Арчая", role: "Номинант премии «Золотая Маска» 2022", img: "/images/jury/archay.png", bio: "Хореограф (современный танец, танцтеатр, физический театр). Художественный руководитель и хореограф независимой танцевальной компании Libertatem (Москва). Лауреат I степени Всероссийского конкурса артистов балета и хореографов. Участник Лаборатории Большого театра для хореографов DanceInversion. Победитель фестиваля ТанцСоюз. Москва." },
  { id: 12, name: "Ильшат Шабаев", role: "Танцовщик, хореограф", img: "/images/jury/shabaev.png", bio: "Победитель шоу «Танцы на ТНТ» (1 сезон). Победитель шоу «Звезда танцпола» на телеканале MTV (1 сезон). Актёр, артист мюзиклов «Chicago», «Notre Dame de Paris». Лучший танцор России по версии телеканала ТНТ. Москва." },
  { id: 13, name: "Игорь Роппельт", role: "Заместитель директора Театра балета Юрия Григоровича", img: "/images/jury/roppelt.png", bio: "Окончил Красноярское государственное хореографическое училище и Кемеровский государственный университет культуры и искусства. Проходил службу в армии в ансамбле песни и пляски «Красная звезда» (г. Москва). В настоящее время заместитель директора Театра балета Юрия Григоровича (г. Краснодар)." },
  { id: 14, name: "Любовь Марчукова", role: "Экс-солистка ансамбля им. Игоря Моисеева", img: "/images/jury/marchukova.png", bio: "Экс-солистка Государственного Академического ансамбля народного танца имени Игоря Моисеева. Экс-солистка мирового турне всемирно известной компании «Riverdance» в рамках проекта «Лучшие на Бродвее». Эксперт всероссийских и международных конкурсов хореографического искусства. Балетмейстер, педагог-хореограф классического и народного танца. Организатор мастер-классов в США и Канаде. Москва." },
  { id: 15, name: "Альберт Галичанин", role: "Народный артист России", img: "/images/jury/galichanin.png", bio: "Лауреат Национальной премии России «Золотая Маска». Председатель секции хореографии Учебно-методического центра по образованию Комитета по культуре Санкт-Петербурга. Санкт-Петербург." },
  { id: 16, name: "Иван Зайцев", role: "Премьер балета Михайловского театра", img: "/images/jury/zaycev.png", bio: "Артист мирового уровня, финалист Международного конкурса артистов балета «Арабеск». Окончил Краснодарское хореографическое училище и Санкт-Петербургский университет культуры и искусств (кафедра хореографии). С 2011 года солист и исполнитель ведущих партий Михайловского театра. Санкт-Петербург." },
  { id: 17, name: "Дмитрий Томилин", role: "Почетный работник культуры г. Москвы", img: "/images/jury/tomilin.png", bio: "Академик РМА, профессор ИТИ, экс-солист Государственного академического ансамбля народного танца им. Игоря Моисеева. Обладатель именной благодарности Президента России В. В. Путина. Академик Российской муниципальной академии. Москва." },
  { id: 18, name: "Мария Ряполова", role: "Хореограф, магистр Академии им. А.Я. Вагановой", img: "/images/jury/rypolova.png", bio: "Дипломант Высшей Национальной театральной премии «Золотая маска» (2024) за спектакль «Сажень» (Башкирский театр оперы и балета). Участник Лаборатории для хореографов современного танца фестиваля «Dance Inversion» при участии Большого театра России. Хореограф-постановщик проекта Илзе Лиепа «Русский балет навсегда». Преподаватель Московского хореографического училища при театре танца «Гжель». Преподаватель кафедры современной хореографии МГИК. Москва." },
  { id: 19, name: "Светлана Лутошкина", role: "Режиссёр, педагог-хореограф", img: "/images/jury/Lutosh.png", bio: "Педагог по Композиции и постановке танца хореографического факультета, кафедра \"Современный танец\", МГИК.<br>Педагог по джаз-танцу отделения \"Современный танец\" Московского губернского колледжа искусств.<br>Хореограф-постановщик в ТВ проектах «Танцы на ТНТ», \"Танц Революция\", \"Танцуй\".<br>Соучредитель федерации по пилонному спорту в России.<br>Член жюри международных и всероссийских фестивалей и конкурсов в области хореографического искусства.<br>Эксперт-консультант проекта “Танцевальный Клондайк”.<br>Лауреат и обладатель Гран-при многих Международных и Всероссийских фестивалей и конкурсов в области танцевального искусства.<br>Резидент-хореограф многих танцевальных компаний в России.<br>Балетмейстер-постановщик театральных, цирковых, танцевальных программ. Москва." },
  { id: 20, name: "Елизавета Тарабанова", role: "Хореограф-постановщик", img: "/images/jury/Tarab.png", bio: "Художественный руководитель танцевальной компании «Полуночники».<br>Педагог по современным техникам танца в академии русского балета им. А.Я. Вагановой и в Санкт-Петербургской государственной консерватории им. Римского-Корсакова.<br>Основатель школы современного танца “Правила движения” и организатор образовательных программ “Классы для своих”. Санкт-Петербург." },
  { id: 21, name: "Евгений Венин", role: "Хореограф и сооснователь проекта TeatrPlastichesky", img: "/images/jury/Venin.png", bio: "Хореограф Divadlo plastického tance (Прага).<br>Приглашенный преподаватель Университета Палацкого в Оломоуце (Чешская республика).<br>Эксперт комиссии по присуждению званий хореографическим коллективам Москвы.<br>Хореограф-постановщик и художественный руководитель фестиваля экспериментального современного танца \"Дело тела\".<br>Эксперт \"Студенческой весны\".<br>Председатель жюри международного фестиваля танца \"Игры воображения\".<br>Постановщик спектаклей и номеров, получивших первые премии и гран-при хореографических конкурсов и фестивалей.<br>Ведущий пластических тренингов.<br>Член жюри многочисленных российских и зарубежных фестивалей. Москва." },
  { id: 22, name: "Вячеслав Аршинин", role: "Заслуженный работник культуры Краснодарского края", img: "/images/jury/arshin.png", bio: "Заслуженный артист Украины.<br>Доцент кафедры хореографии Краснодарского государственного института культуры.<br>Руководитель народного ансамбля танца «Калына́»." }
];

export default function Jury() {
  const [selectedMember, setSelectedMember] = useState<JuryMember | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMember]);

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

        {/* Slider Container */}
        <div className="relative group/slider">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-zinc-900/80 hover:bg-orange-600 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-zinc-800 transition-all opacity-0 group-hover/slider:opacity-100 shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-zinc-900/80 hover:bg-orange-600 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-zinc-800 transition-all opacity-0 group-hover/slider:opacity-100 shadow-xl"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4 md:px-8"
          >
            {juryData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 5) * 0.1, duration: 0.4 }}
                className="flex-shrink-0 w-48 md:w-56 flex flex-col items-center cursor-pointer group snap-center"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-zinc-800 group-hover:border-orange-500 transition-all duration-300 bg-zinc-900 shadow-lg group-hover:shadow-[0_0_30px_rgba(234,88,12,0.3)] relative">
                  {/* Удалили классы grayscale и group-hover:grayscale-0 */}
                  <img
                    src={member.img}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image not found
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=18181b&color=f97316&size=256`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="mt-6 text-xl font-black uppercase tracking-wider text-center group-hover:text-orange-500 transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-zinc-500 text-center mt-2 font-medium px-2 line-clamp-2">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto bg-zinc-900 shrink-0 relative">
                {/* Добавили класс object-top для выравнивания по лицу */}
                <img
                  src={selectedMember.img}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=18181b&color=f97316&size=512`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950" />
              </div>

              {/* Info Side */}
              <div className="p-8 md:p-10 w-full md:w-3/5 overflow-y-auto custom-scrollbar flex flex-col">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-orange-500 font-bold uppercase tracking-widest mb-8 text-sm md:text-base">
                  {selectedMember.role}
                </p>
                
                <div className="w-12 h-1 bg-zinc-800 mb-8" />

                <div 
                  className="text-zinc-300 leading-relaxed space-y-4 text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: selectedMember.bio }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}