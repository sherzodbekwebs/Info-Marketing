import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// 1. MA'LUMOTLAR
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
        // text: "Производство",
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
      // { id: "ads-main", text: "Реклама", isHeader: true },
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
      // { id: "comm-analysis", text: "Взаимодействие отделов", isHeader: true },
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

// 2. DASHBOARD SAHIFASI
const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 py-5 px-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-xl font-bold text-slate-800 text-center tracking-wide">
            Структура деятельности департамента маркетинга
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
          {dashboardData.map((column) => (
            <div
              key={column.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Column Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h2 className="text-xs font-bold text-white text-center uppercase tracking-wider">
                  {column.title}
                </h2>
              </div>

              {/* Column Content */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                {column.items.map((item) => (
                  item.isList ? (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3 shadow-sm"
                    >
                      <p className="text-[11px] font-bold text-white mb-2.5 text-center pb-2 border-b border-white/30">
                        {item.text}
                      </p>
                      <div className="space-y-2">
                        {item.subItems.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/detail/${sub.id}`}
                            className="block text-[14px] bg-white/20 hover:bg-white text-white hover:text-blue-700 px-2.5 py-2 rounded transition-all duration-200 font-medium"
                          >
                            {sub.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.id}
                      to={`/detail/${item.id}`}
                      className={`
                        block px-3 py-3 rounded-lg text-[14px] font-semibold text-center
                        transition-all duration-200 leading-tight min-h-[60px] flex items-center justify-center
                        ${item.isHeader
                          ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md hover:shadow-lg'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md'
                        }
                        hover:scale-[1.02] active:scale-[0.98]
                      `}
                    >
                      {item.text}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 py-3 px-6 mt-auto">
        <p className="text-center text-xs text-slate-500">
          © 2025 Департамент маркетинга
        </p>
      </footer>
    </div>
  );
};

// 3. DETAIL SAHIFASI
const DetailPage = () => {
  const { id } = useParams();

  let foundText = "Информационная страница";
  dashboardData.forEach(col => {
    col.items.forEach(item => {
      if (item.id === id) foundText = item.text;
      if (item.subItems) {
        item.subItems.forEach(sub => {
          if (sub.id === id) foundText = sub.text;
        });
      }
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад в меню
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <span className="text-blue-100 font-semibold text-xs tracking-widest uppercase block mb-2">
              Раздел аналитики
            </span>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {foundText}
            </h1>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Здесь будут представлены полные отчеты, KPI показатели и детальная статистика по выбранному направлению.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-blue-600 font-bold text-sm mb-1">Отчеты</div>
                <div className="text-slate-600 text-xs">Аналитические данные</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-blue-600 font-bold text-sm mb-1">KPI</div>
                <div className="text-slate-600 text-xs">Ключевые показатели</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-blue-600 font-bold text-sm mb-1">Статистика</div>
                <div className="text-slate-600 text-xs">Детальный анализ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. MAIN APP
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