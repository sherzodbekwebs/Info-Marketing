import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

// 1. DATA (O'zgarishsiz)
const analysisDetails = {
  "customs-base": {
    content: `Обработка данных таможенный базы. Сегментация импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- обработка данных регистрации (гаи), сегментация регистрации грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,55 тн;
- хронометраж потока импорта грузовых автомобилей 14-40 тн, прицепной техники и минигрузовиков полной массой 2-3,5 тн;
- опрос водителей экспулататоров автомобилей нашего сегмента.  
Данные обрабатываются для анализов рынка всех конкурентных автомобилей раз в квартал.`,
    powerBiUrl: "",
    excelUrl: "", pptUrl: ""
  },
  "cargo-market": {
    content: `Анализ рынка грузовой техники 14-40 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам тягачей, самосвалов, спецтехник, шасси и бортовых автомобилей. \nДанные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: "https://app.powerbi.com/reportEmbed?reportId=054cadeb-9ce0-4bae-a5bf-c5a77ce413ca&autoAuth=true&ctid=da2706b3-7ece-4fda-b3b6-c67263d0408b",
    excelUrl: "", pptUrl: ""
  },
  "trailer-market": {
    content: `Анализ прицепной техники. Анализ импорта и регистрации. Сравнение цен по всем видам прицепов и полуприцепов. \nДанные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: ""
  },
  "minitruck-market": {
    content: `Анализ рынка минигрузовиков 2-3,5 тн. Анализ местных производителей, импорта и регистрации. Сравнение цен по всем маркам miniгрузовиков этого сегмента. \nДанные готовятся раз квартал на Power Point и Power BI.`,
    powerBiUrl: ""
  },
  "fin-committee": {
    content: `В материалы финкомитета входят: анализ цен, таблица для заполнения, отчеты по реализации и остаткам. \nДанные готовятся ежемесячно.`,
    powerBiUrl: ""
  },
  "cis-market": {
    content: `Анализы рынка РФ и Казахстан получаем от ВТК для изучения. \nДанные берутся ежеквартально.`,
    powerBiUrl: ""
  },
  "pp-324": {
    content: `Анализ исполнения ПП-324 от 12.09.2024 года готовятся на основе данных реализации по форме данными от Минфина. \nДанные готовятся ежемесячно.`,
    powerBiUrl: ""
  }
};

const dashboardData = [
  { id: "col-1", title: "Анализ", items: [{ id: "customs-base", text: "Обработка таможенной базы, регистрация, статистики. Хронометраж. Опрос." }, { id: "cargo-market", text: "Анализ рынка грузовой техники 14-40 тн" }, { id: "trailer-market", text: "Анализ рынка прицепной техники" }, { id: "minitruck-market", text: "Анализ рынка минигрузовиков" }, { id: "fin-committee", text: "Материалы по Финкомитету" }, { id: "cis-market", text: "Анализ рынка РФ и Казахстан" }, { id: "pp-324", text: "Анализ исполнения ПП-324, 12.09.2024." }] },
  { id: "col-2", title: "Производство", items: [{ id: "prod-list", text: "Производственные показатели", isList: true, subItems: [{ id: "prod-1", text: "1. Анализ сырья" }, { id: "prod-2", text: "2. Анализ плана производства" }, { id: "prod-3", text: "3. Анализ деятельности ОТК" }, { id: "prod-4", text: "4. Анализ условий для рабочих и работы с их обращениями" }, { id: "prod-5", text: "5. Анализ логистики готовой продукции" }, { id: "prod-6", text: "6. Анализ дилерских сетей" }] }] },
  { id: "col-3", title: "Реклама", items: [{ id: "site-seo", text: "Сайт, приложение (сео оптимизация, contextную реклама)" }, { id: "instagram", text: "Инстаграм (видеоролики, таргет)" }, { id: "telegram-ads", text: "Телеграм канал и бот, Автоэлон, ОЛХ, билборды и другие рекламные площадки" }, { id: "youtube-tv", text: "Ютуб, блогеры, телевидение" }, { id: "catalogs-kp", text: "Каталоги, прайсы, электронные и почтовые отправки КП" }, { id: "exhibitions", text: "Выставки, корпоративные встречи" }] },
  { id: "col-4", title: "Взаимодействие", items: [{ id: "call-center-list", text: "Колл-центр", isList: true, subItems: [{ id: "amo-crm", text: "1. Амо-CRM" }, { id: "cold-calls", text: "2. Холодные звонки" }, { id: "feedback", text: "3. Обратная связь" }] }, { id: "sales-marketing", text: "Маркетинг и отдел продаж, дилеры" }, { id: "hr-marketing", text: "Маркетинг и отдел кадров, профсоюз" }, { id: "supply-marketing", text: "Маркетинг и отдел снабжения (закупа)" }, { id: "finance-marketing", text: "Маркетинг и финансовый отдел" }, { id: "service-marketing", text: "Маркетинг и отдел сервиса" }] },
  { id: "col-5", title: "Итог", items: [{ id: "offers", text: "Предложения" }, { id: "event-plan", text: "План мероприятий" }, { id: "marketing-strategy", text: "Маркетинговая стратегия" }] }
];

// ─── ACCENT COLORS ──────────────────────────────────────────────────────────
const colAccents = {
  "col-1": { bg: "#f0ebff", border: "#d6bcfa", text: "#5d3fd3" },
  "col-2": { bg: "#e6f4ff", border: "#90cdf4", text: "#0077cc" },
  "col-3": { bg: "#fff5f5", border: "#feb2b2", text: "#e63946" },
  "col-4": { bg: "#e6fffa", border: "#81e6d9", text: "#00a896" },
  "col-5": { bg: "#fffaf0", border: "#fbd38d", text: "#f59e0b" },
};

const globalStyles = `
  body { background: #f8fafc; color: #1e293b; font-family: 'Manrope', sans-serif; margin: 0; }
  .grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px); background-size: 40px 40px; opacity: 0.4; }

  .dash-header { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 32px; text-align: center; position: relative; z-index: 10; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .dash-header h1 { font-family: 'Bebas Neue', cursive; font-size: clamp(20px, 3vw, 28px); letter-spacing: 4px; color: #0f172a; margin: 0; }

  .dash-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; padding: 30px 20px; position: relative; z-index: 10; max-width: 1700px; margin: 0 auto; }
  
  .col-wrap { display: flex; flex-direction: column; gap: 12px; }
  .col-head { padding: 14px; border-radius: 12px; font-weight: 800; text-align: center; text-transform: uppercase; font-size: 14px; border: 2px solid transparent; }
  
  .item-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 16px; font-size: 13px; font-weight: 700; color: #334155; text-decoration: none; display: flex; align-items: center; justify-content: center; text-align: center; height: 65px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02); line-height: 1.5; }
  .item-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-color: #cbd5e1; color: #0f172a; }

  .list-block { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
  .list-block-header { padding: 10px; font-size: 11px; font-weight: 800; text-align: center; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; }
  .list-sub-link { display: block; padding: 10px 15px; font-size: 12px; text-decoration: none; color: #475569; font-weight: 600; border-bottom: 1px solid #f1f5f9; transition: all 0.2s; }
  .list-sub-link:hover { background: #f8fafc; color: #2563eb; padding-left: 20px; }

  .detail-wrap { height: 100vh; display: flex; flex-direction: column; background: #f1f5f9; }
  .detail-topbar { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; z-index: 50; }
  .back-btn { background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 12px; text-transform: uppercase; }
  .detail-title { font-weight: 800; font-size: 18px; color: #1e293b; text-transform: uppercase; margin: 0; flex: 1; text-align: center; }

  .detail-body { flex: 1; display: flex; overflow: hidden; padding: 20px; gap: 20px; position: relative; }
  .detail-sidebar { width: 25%; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 24px; overflow-y: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .detail-right { flex: 1; display: flex; flex-direction: column; gap: 15px; }

  .tab-bar { display: flex; gap: 10px; }
  .tab-btn { padding: 12px 24px; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #64748b; font-weight: 700; font-size: 12px; cursor: pointer; }
  .tab-btn.active { background: #5d3fd3; color: #ffffff; border-color: #5d3fd3; }

  .content-frame-container { flex: 1; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; position: relative; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
  .persistent-iframe-wrapper { position: fixed; visibility: hidden; pointer-events: none; border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid #e2e8f0; }
  .persistent-iframe-wrapper.visible { visibility: visible; pointer-events: auto; z-index: 40; }
`;

// ─── IFRAME CACHE ───────────────────────────────────────────────────────────
const IframeCache = ({ activeId, activeTab }) => {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/detail');

  return (
    <>
      {Object.entries(analysisDetails).map(([id, data]) => {
        if (!data.powerBiUrl) return null;
        const isVisible = isDetail && activeId === id && activeTab === 'powerbi';
        return (
          <div
            key={id}
            className={`persistent-iframe-wrapper ${isVisible ? 'visible' : ''}`}
            style={{
              top: '165px', left: 'calc(25% + 60px)', right: '40px', bottom: '40px',
            }}
          >
            <iframe title={id} src={data.powerBiUrl} width="100%" height="100%" frameBorder="0" allowFullScreen={true} />
          </div>
        );
      })}
    </>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = () => (
  <div className="app-wrap">
    <div className="grid-bg"></div>
    <header className="dash-header">
      <h1>Структура деятельности департамента маркетинга</h1>
    </header>
    <main className="dash-main">
      <div className="dash-grid">
        {dashboardData.map((column) => {
          const ac = colAccents[column.id];
          return (
            <div key={column.id} className="col-wrap">
              <div className="col-head" style={{ background: ac.bg, color: ac.text, borderColor: ac.border }}>
                {column.title}
              </div>
              {column.items.map((item) =>
                item.isList ? (
                  <div key={item.id} className="list-block">
                    <div className="list-block-header" style={{ background: ac.bg, color: ac.text }}>{item.text}</div>
                    <div className="list-block-body">
                      {item.subItems.map((sub) => (
                        <Link key={sub.id} to={`/detail/${sub.id}`} className="list-sub-link">
                          {sub.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.id} to={`/detail/${item.id}`} className="item-card">
                    {item.text}
                  </Link>
                )
              )}
            </div>
          );
        })}
      </div>
    </main>
  </div>
);

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
const DetailPage = ({ setActiveId, activeTab, setActiveTab }) => {
  const { id } = useParams();
  const detail = analysisDetails[id];

  useEffect(() => {
    setActiveId(id);
    return () => setActiveId(null);
  }, [id, setActiveId]);

  let currentTitle = "";
  dashboardData.forEach(col => col.items.forEach(i => {
    if (i.id === id) currentTitle = i.text;
    if (i.subItems) i.subItems.forEach(s => { if (s.id === id) currentTitle = s.text; });
  }));

  return (
    <div className="detail-wrap">
      <div className="grid-bg"></div>
      <header className="detail-topbar">
        <Link to="/" className="back-btn">← НАЗАД</Link>
        <h2 className="detail-title">{currentTitle}</h2>
        <div style={{ width: 100 }} />
      </header>

      <div className="detail-body">
        <aside className="detail-sidebar">
          <div style={{ color: '#334155', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
            {detail?.content || "Описание будет добавлено в ближайшее время."}
          </div>
        </aside>

        <main className="detail-right">
          <div className="tab-bar">
            {['powerbi', 'excel', 'ppt'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}>
                {tab === 'powerbi' ? '📊 Power BI' : tab === 'excel' ? '📗 Excel' : '📙 PowerPoint'}
              </button>
            ))}
          </div>

          <div className="content-frame-container">
            {activeTab !== 'powerbi' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontWeight: '600' }}>
                Контент {activeTab.toUpperCase()} еще не подключен
              </div>
            )}
            {activeTab === 'powerbi' && !detail?.powerBiUrl && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontWeight: '600' }}>
                Контент POWERBI еще не подключен
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [activeTab, setActiveTab] = useState('powerbi');

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = globalStyles;
    document.head.appendChild(styleEl);
  }, []);

  return (
    <Router>
      <IframeCache activeId={activeId} activeTab={activeTab} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailPage setActiveId={setActiveId} activeTab={activeTab} setActiveTab={setActiveTab} />} />
      </Routes>
    </Router>
  );
}