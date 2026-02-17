import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// 1. ANALIZ PAGE UCHUN TO'LIQ MATNLAR VA POWER BI LINKLARI
const analysisDetails = {
  "customs-base": {
    content: `1. Обработка данных таможенный базы. Сегментация импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- обработка данных регистрации (гаи), сегментация регистрации грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- хронометраж потока импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,5 тн;
- опрос водителей экспулататоров автомобилей нашего сегмента.  
Данные обрабатываются для анализов рынка всех конкурентных автомобилей раз в квартал.`,
    // SIZ BERGAN LINK SHU YERGA QO'YILDI:
    powerBiUrl: "https://app.powerbi.com/reportEmbed?reportId=f3c90cbb-ca2a-4cca-b239-faac4141af9a&autoAuth=true&ctid=da2706b3-7ece-4fda-b3b6-c67263d0408b"
  },

  "cargo-market": {
    content: `2. Анализ рынка грузовой техники 14-40 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам тягачей, самосвалов, спецтехник, шасси и бортовых автомобилей. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: "" // Kelajakda link qo'yish uchun joy
  },

  "trailer-market": {
    content: `3. Анализ прицепной техники. Анализ импорта и регистрации. Сравнение цен по всем видам прицепов и полуприцепов. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: ""
  },

  "minitruck-market": {
    content: `4. Анализ рынка минигрузовиков 2-3,5 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам минигрузовиков этого сегмента. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: ""
  },

  "fin-committee": {
    content: `5. В материалы финкомитета входят: анализ цен, таблица для заполнения, отчеты по реализации и остаткам. 
Данные готовятся ежемесячно.`,
    powerBiUrl: ""
  },

  "cis-market": {
    content: `6. Анализы рынка РФ и Казахстан получаем от ВТК для изучения. 
Данные берутся ежеквартально.`,
    powerBiUrl: ""
  },

  "pp-324": {
    content: `7. Анализ исполнения ПП-324 от 12.09.2024 года готовятся на основе данных реализации по форме данными от Минфина. 
Данные готовятся ежемесячно.`,
    powerBiUrl: ""
  }
};

// 2. MA'LUMOTLAR STRUKTURASI
const dashboardData = [
  {
    id: "col-1",
    title: "Анализ",
    items: [
      { id: "customs-base", text: "Обработка таможенной базы, регистрация, статистики. Хронометраж. Опрос." },
      { id: "cargo-market", text: "Анализ рынка грузовой техники 14-40 тн" },
      { id: "trailer-market", text: "Анализ рынка прицепной техники" },
      { id: "minitruck-market", text: "Анализ рынка минигрузовиков" },
      { id: "fin-committee", text: "Материалы по Финкомитету" },
      { id: "cis-market", text: "Анализ рынка РФ и Казахстан" },
      { id: "pp-324", text: "Анализ исполнения ПП-324, 12.09.2024." },
    ]
  },
  {
    id: "col-2",
    title: "Производство",
    items: [
      {
        id: "prod-list",
        isList: true,
        subItems: [
          { id: "prod-1", text: "1. Анализ сырья" },
          { id: "prod-2", text: "2. Анализ плана производства" },
          { id: "prod-3", text: "3. Анализ деятельности ОТК" },
          { id: "prod-4", text: "4. Анализ условий для рабочих и работы с их обращениями" },
          { id: "prod-5", text: "5. Анализ логистики готовой продукции" },
          { id: "prod-6", text: "6. Анализ дилерских сетей" }
        ]
      }
    ]
  },
  {
    id: "col-3",
    title: "Реклама",
    items: [
      { id: "site-seo", text: "Сайт, приложение (сео оптимизация, контекстная реклама)" },
      { id: "instagram", text: "Инстаграм (видеоролики, таргет)" },
      { id: "telegram-ads", text: "Телеграм канал и бот, Автоэлон, ОЛХ, билборды и другие рекламные площадки" },
      { id: "youtube-tv", text: "Ютуб, блогеры, телевидение" },
      { id: "catalogs-kp", text: "Каталоги, прайсы, электронные и почтовые отправки КП" },
      { id: "exhibitions", text: "Выставки, корпоративные встречи" }
    ]
  },
  {
    id: "col-4",
    title: "Коммуникация, взаимодействия и анализ отделов",
    items: [
      {
        id: "call-center-list",
        text: "Колл-центр",
        isList: true,
        subItems: [
          { id: "amo-crm", text: "1. Амо-CRM" },
          { id: "cold-calls", text: "2. Холодные звонки" },
          { id: "feedback", text: "3. Обратная связь" }
        ]
      },
      { id: "sales-marketing", text: "Маркетинг и отдел продаж, дилеры" },
      { id: "hr-marketing", text: "Маркетинг и отдел кадров, профсоюз" },
      { id: "supply-marketing", text: "Маркетинг и отдел снабжения (закупа)" },
      { id: "finance-marketing", text: "Маркетинг и финансовый отдел" },
      { id: "service-marketing", text: "Маркетинг и отдел сервиса" }
    ]
  },
  {
    id: "col-5",
    title: "Итог",
    items: [
      { id: "offers", text: "Предложения" },
      { id: "event-plan", text: "План мероприятий" },
      { id: "marketing-strategy", text: "Маркетинговая стратегия" }
    ]
  }
];

// 3. DASHBOARD SAHIFASI
const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 py-5 px-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-xl font-bold text-slate-800 text-center tracking-wide">
            Структура деятельности департамента маркетинга
          </h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
          {dashboardData.map((column) => (
            <div key={column.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h2 className="text-xs font-bold text-white text-center uppercase tracking-wider">{column.title}</h2>
              </div>
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                {column.items.map((item) => (
                  item.isList ? (
                    <div key={item.id} className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3 shadow-sm">
                      <p className="text-[11px] font-bold text-white mb-2.5 text-center pb-2 border-b border-white/30">{item.text}</p>
                      <div className="space-y-2">
                        {item.subItems.map(sub => (
                          <Link key={sub.id} to={`/detail/${sub.id}`} className="block text-[14px] bg-white/20 hover:bg-white text-white hover:text-blue-700 px-2.5 py-2 rounded transition-all duration-200 font-medium">
                            {sub.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.id} to={`/detail/${item.id}`}
                      className="block px-3 py-3 rounded-lg text-[14px] font-semibold text-center transition-all duration-200 leading-tight min-h-[60px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:scale-[1.02] active:scale-[0.98]">
                      {item.text}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 py-3 px-6 mt-auto text-center text-xs text-slate-500">
        © 2025 Департамент маркетинга
      </footer>
    </div>
  );
};

// 4. DETAIL SAHIFASI (IFrame integratsiyasi bilan)
const DetailPage = () => {
  const { id } = useParams();
  const detail = analysisDetails[id];

  // Sarlavhani topish
  let currentTitle = "Информационная страница";
  dashboardData.forEach(col => {
    col.items.forEach(item => {
      if (item.id === id) currentTitle = item.text;
      if (item.subItems) item.subItems.forEach(sub => { if (sub.id === id) currentTitle = sub.text; });
    });
  });

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden">
      {/* Detail Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Назад в меню
        </Link>
        <h2 className="text-slate-800 font-bold uppercase text-sm tracking-widest">{currentTitle}</h2>
        <div className="w-32"></div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* CHAP TOMON: MATNLAR (1/3 qism) */}
        <div className="w-1/3 bg-white p-8 overflow-y-auto border-r border-slate-200 shadow-inner">
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-line font-medium italic">
                {detail ? detail.content : "Здесь будут представлены полные отчеты и статистика по выбранному направлению."}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-[12px] text-blue-800 font-bold uppercase tracking-widest">Аналитика активна</span>
            </div>
          </div>
        </div>

        {/* O'NG TOMON: POWER BI HISOBOTI (2/3 qism) */}
        <div className="w-2/3 bg-slate-100 p-4 flex flex-col">
          {detail && detail.powerBiUrl ? (
            <div className="flex-1 bg-white rounded-[7px] shadow-2xl overflow-hidden border border-slate-300">
              <iframe
                title="Info Product"
                width="100%"
                height="100%"
                src={detail.powerBiUrl}
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="flex-1 border-4 border-dashed border-slate-300 rounded-[50px] flex flex-col items-center justify-center text-slate-400 gap-6 bg-white/50 shadow-inner">
              <div className="text-center">
                <span className="text-6xl mb-4 block">📊</span>
                <p className="text-slate-500 font-semibold bg-white px-8 py-3 rounded-full shadow-md border border-slate-200">
                  Отчет Power BI для этого раздела еще не подключен
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}