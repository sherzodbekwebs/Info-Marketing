import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

// 1. ANALIZ PAGE UCHUN TO'LIQ MATNLAR (O'zgarishsiz)
const analysisDetails = {
  "customs-base": {
    content: `Обработка данных таможенный базы. Сегментация импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- обработка данных регистрации (гаи), сегментация регистрации грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- хронометраж потока импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,5 тн;
- опрос водителей экспулататоров автомобилей нашего сегмента.  
Данные обрабатываются для анализов рынка всех конкурентных автомобилей раз в квартал.`,
    powerBiUrl: "https://app.powerbi.com/reportEmbed?reportId=f3c90cbb-ca2a-4cca-b239-faac4141af9a&autoAuth=true&ctid=da2706b3-7ece-4fda-b3b6-c67263d0408b",
    excelUrl: "", pptUrl: ""
  },
  "cargo-market": {
    content: `Анализ рынка грузовой техники 14-40 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам тягачей, самосвалов, спецтехник, шасси и бортовых автомобилей. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  },
  "trailer-market": {
    content: `Анализ прицепной техники. Анализ импорта и регистрации. Сравнение цен по всем видам прицепов и полуприцепов. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  },
  "minitruck-market": {
    content: `Анализ рынка минигрузовиков 2-3,5 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам минигрузовиков этого сегмента. 
Данные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  },
  "fin-committee": {
    content: `В материалы финкомитета входят: анализ цен, таблица для заполнения, отчеты по реализации и остаткам. 
Данные готовятся ежемесячно.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  },
  "cis-market": {
    content: `Анализы рынка РФ и Казахстан получаем от ВТК для изучения. 
Данные берутся ежеквартально.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  },
  "pp-324": {
    content: `Анализ исполнения ПП-324 от 12.09.2024 года готовятся на основе данных реализации по форме данными от Минфина. 
Данные готовятся ежемесячно.`,
    powerBiUrl: "", excelUrl: "", pptUrl: ""
  }
};

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
  { id: "col-2", title: "Производство", items: [{ id: "prod-list", text: "Производственные показатели", isList: true, subItems: [{ id: "prod-1", text: "1. Анализ сырья" }, { id: "prod-2", text: "2. Анализ плана производства" }, { id: "prod-3", text: "3. Анализ деятельности ОТК" }, { id: "prod-4", text: "4. Анализ условий для рабочих и работы с их обращениями" }, { id: "prod-5", text: "5. Анализ логистики готовой продукции" }, { id: "prod-6", text: "6. Анализ дилерских сетей" }] }] },
  { id: "col-3", title: "Реклама", items: [{ id: "site-seo", text: "Сайт, приложение (сео оптимизация, contextная реклама)" }, { id: "instagram", text: "Инстаграм (видеоролики, таргет)" }, { id: "telegram-ads", text: "Телеграм канал и бот, Автоэлон, ОЛХ, билборды и другие рекламные площадки" }, { id: "youtube-tv", text: "Ютуб, блогеры, телевидение" }, { id: "catalogs-kp", text: "Каталоги, прайсы, электронные и почтовые отправки КП" }, { id: "exhibitions", text: "Выставки, корпоративные встречи" }] },
  { id: "col-4", title: "Взаимодействие", items: [{ id: "call-center-list", text: "Колл-центр", isList: true, subItems: [{ id: "amo-crm", text: "1. Амо-CRM" }, { id: "cold-calls", text: "2. Холодные звонки" }, { id: "feedback", text: "3. Обратная связь" }] }, { id: "sales-marketing", text: "Маркетинг и отдел продаж, дилеры" }, { id: "hr-marketing", text: "Маркетинг и отдел кадров, профсоюз" }, { id: "supply-marketing", text: "Маркетинг и отдел снабжения (закупа)" }, { id: "finance-marketing", text: "Маркетинг и финансовый отдел" }, { id: "service-marketing", text: "Маркетинг и отдел сервиса" }] },
  { id: "col-5", title: "Итог", items: [{ id: "offers", text: "Предложения" }, { id: "event-plan", text: "План мероприятий" }, { id: "marketing-strategy", text: "Маркетинговая стратегия" }] }
];

const Dashboard = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col font-sans">
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 py-5 px-6 shadow-sm sticky top-0 z-10 text-center">
      <h1 className="text-xl font-bold text-slate-800 tracking-wide uppercase italic">
        Структура деятельности департамента маркетинга
      </h1>
    </header>
    <main className="flex-1 px-4 py-6 max-w-[1800px] mx-auto w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dashboardData.map((column) => (
          <div key={column.id} className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white text-xs font-bold text-center uppercase tracking-wider">{column.title}</div>
            <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
              {column.items.map((item) => (
                item.isList ? (
                  <div key={item.id} className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3 text-white">
                    <p className="text-[11px] font-bold mb-2.5 text-center pb-2 border-b border-white/30 uppercase">{item.text}</p>
                    <div className="space-y-2">
                      {item.subItems.map(sub => (
                        <Link key={sub.id} to={`/detail/${sub.id}`} className="block text-[14px] bg-white/20 hover:bg-white text-white hover:text-blue-700 px-2.5 py-2 rounded transition-all font-medium italic">{sub.text}</Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.id} to={`/detail/${item.id}`} className="block px-3 py-3 rounded-lg text-[14px] font-semibold text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-[1.02] transition-all min-h-[60px] flex items-center justify-center italic leading-tight">
                    {item.text}
                  </Link>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

const BackgroundIframeManager = ({ activeId, activeTab }) => {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/detail');

  return (
    <div className="fixed inset-0 z-0 pointer-events-none ">
      {Object.keys(analysisDetails).map((id) => {
        const url = analysisDetails[id].powerBiUrl;
        if (!url) return null;

        const isShown = isDetail && activeId === id && activeTab === 'powerbi';

        return (
          <div
            key={id}
            className={`absolute transition-opacity duration-500 bg-white ${isShown ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: '140px', // Header va tugmalar ostiga tushdi
              left: '34.5%',
              right: '20px',
              bottom: '20px',
              zIndex: isShown ? 40 : -1,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: isShown ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
              pointerEvents: isShown ? 'auto' : 'none' // Click o'tishi uchun auto qilindi
            }}
          >
            <iframe title={id} width="100%" height="100%" src={url} frameBorder="0" allowFullScreen={true} />
          </div>
        );
      })}
    </div>
  );
};

const DetailPage = ({ setActiveId, activeTab, setActiveTab }) => {
  const { id } = useParams();
  const detail = analysisDetails[id];

  useEffect(() => {
    setActiveId(id);
    return () => setActiveId(null);
  }, [id, setActiveId]);

  let currentTitle = "";
  dashboardData.forEach(col => col.items.forEach(i => { if (i.id === id) currentTitle = i.text; if (i.subItems) i.subItems.forEach(s => { if (s.id === id) currentTitle = s.text; }); }));

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-50">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">
          ← НАЗАД В МЕНЮ
        </Link>
        <h2 className="text-slate-800 font-bold uppercase text-xs truncate max-w-xl italic">
          {currentTitle}
        </h2>
        <div className="w-32"></div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 bg-white p-8 overflow-y-auto border-r border-slate-200 z-50 shadow-lg">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 text-[15px] leading-relaxed whitespace-pre-line font-medium italic shadow-inner">
            {detail?.content}
          </div>
        </div>

        {/* pointer-events-none qo'shildi, vizual orqada bosilishi uchun */}
        <div className="w-2/3 p-4 flex flex-col z-30 pointer-events-none">
          <div className="flex gap-2 mb-4 z-50 relative pointer-events-auto">
            {['powerbi', 'excel', 'ppt'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 cursor-pointer py-2 rounded-l font-bold text-[10px] uppercase transition-all shadow-md border ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}`}>
                {tab === 'powerbi' ? '📊 Power BI' : tab === 'excel' ? '📗 Excel' : '📙 PowerPoint'}
              </button>
            ))}
          </div>

          {activeTab !== 'powerbi' && (
            <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-slate-200 flex items-center justify-center italic text-slate-400 z-50 pointer-events-auto">
              Контент {activeTab.toUpperCase()} еще не подключен
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [activeTab, setActiveTab] = useState('powerbi');

  return (
    <Router>
      <BackgroundIframeManager activeId={activeId} activeTab={activeTab} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailPage setActiveId={setActiveId} activeTab={activeTab} setActiveTab={setActiveTab} />} />
      </Routes>
    </Router>
  );
}