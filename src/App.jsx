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
  { id: "col-3", title: "Реклама", items: [{ id: "site-seo", text: "Сайт, приложение (сео оптимизация, contextную реклама)" }, { id: "instagram", text: "Инстаграм (видеоролики, таргет)" }, { id: "telegram-ads", text: "Телеграм канал и бот, Автоэлон, ОЛХ, билборды и другие рекламные площадки" }, { id: "youtube-tv", text: "Ютуб, блогеры, телевидение" }, { id: "catalogs-kp", text: "Каталоги, прайсы, электронные и почтовые отправки КП" }, { id: "exhibitions", text: "Выставки, корпоративные встречи" }] },
  { id: "col-4", title: "Взаимодействие", items: [{ id: "call-center-list", text: "Колл-центр", isList: true, subItems: [{ id: "amo-crm", text: "1. Амо-CRM" }, { id: "cold-calls", text: "2. Холодные звонки" }, { id: "feedback", text: "3. Обратная связь" }] }, { id: "sales-marketing", text: "Маркетинг и отдел продаж, дилеры" }, { id: "hr-marketing", text: "Маркетинг и отдел кадров, профсоюз" }, { id: "supply-marketing", text: "Маркетинг и отдел снабжения (закупа)" }, { id: "finance-marketing", text: "Маркетинг и финансовый отдел" }, { id: "service-marketing", text: "Маркетинг и отдел сервиса" }] },
  { id: "col-5", title: "Итог", items: [{ id: "offers", text: "Предложения" }, { id: "event-plan", text: "План мероприятий" }, { id: "marketing-strategy", text: "Маркетинговая стратегия" }] }
];

// ─── COLUMN ACCENT COLORS ────────────────────────────────────────────────────
const colAccents = {
  "col-1": { glow: "#7c5cfc", border: "rgba(124,92,252,0.35)", bg: "rgba(124,92,252,0.12)", text: "#b89eff", listBg: "rgba(124,92,252,0.18)" },
  "col-2": { glow: "#00aaff", border: "rgba(0,170,255,0.35)", bg: "rgba(0,170,255,0.12)", text: "#60c8ff", listBg: "rgba(0,170,255,0.18)" },
  "col-3": { glow: "#ff6b6b", border: "rgba(255,107,107,0.35)", bg: "rgba(255,107,107,0.12)", text: "#ff9f9f", listBg: "rgba(255,107,107,0.18)" },
  "col-4": { glow: "#00e5c4", border: "rgba(0,229,196,0.35)", bg: "rgba(0,229,196,0.12)", text: "#44f5d8", listBg: "rgba(0,229,196,0.18)" },
  "col-5": { glow: "#ffd166", border: "rgba(255,209,102,0.35)", bg: "rgba(255,209,102,0.12)", text: "#ffe599", listBg: "rgba(255,209,102,0.18)" },
};

// ─── GLOBAL STYLES injected once ─────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #071230;
    color: #dcdcf0;
    font-family: 'Manrope', sans-serif;
    min-height: 100vh;
  }

  /* Subtle grid overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(124,92,252,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,92,252,0.035) 1px, transparent 1px);
    background-size: 52px 52px;
  }

  /* Ambient glow orbs */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 600px 400px at 10% 0%, rgba(124,92,252,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 500px 350px at 90% 100%, rgba(0,229,196,0.06) 0%, transparent 70%);
  }

  .app-wrap { position: relative; z-index: 1; }

  /* ── DASHBOARD HEADER ── */
  .dash-header {
    background: rgba(10,10,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 18px 32px;
    position: sticky;
    top: 0;
    z-index: 50;
    text-align: center;
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }

  .dash-header h1 {
    font-family: 'Bebas Neue', cursive;
    font-size: clamp(18px, 2.5vw, 28px);
    letter-spacing: 5px;
    background: linear-gradient(110deg, #ffffff 20%, #9b7eff 55%, #00e5c4 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── DASHBOARD MAIN ── */
  .dash-main {
    flex: 1;
    padding: 28px 20px;
    max-width: 1800px;
    margin: 0 auto;
    width: 100%;
  }

  .dash-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    align-items: start;
  }

  /* ── COLUMN ── */
  .col-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: colRise 0.55s ease both;
  }
  .col-wrap:nth-child(1) { animation-delay: 0.05s; }
  .col-wrap:nth-child(2) { animation-delay: 0.13s; }
  .col-wrap:nth-child(3) { animation-delay: 0.21s; }
  .col-wrap:nth-child(4) { animation-delay: 0.29s; }
  .col-wrap:nth-child(5) { animation-delay: 0.37s; }

  @keyframes colRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .col-head {
    padding: 12px 16px;
    border-radius: 12px;
    font-family: 'Bebas Neue', cursive;
    font-size: 17px;
    letter-spacing: 3px;
    text-align: center;
    border: 1px solid;
    transition: box-shadow 0.3s;
  }

  /* ── ITEM CARD ── */
  .item-card {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 14px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    border: 2px solid rgba(255, 255, 255, 0.06);
    background: rgba(20,20,35,0.7);
    color: #cfcfe6;
    min-height: 58px;
    text-decoration: none;
    transition: all 0.22s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .item-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    border-radius: 3px 0 0 3px;
    opacity: 0;
    transition: opacity 0.22s;
  }

  .item-card:hover {
    color: #ffffff;
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-2px) scale(1.01);
    background: rgba(28,28,46,0.9);
  }

  .item-card:hover::before { opacity: 1; }

  /* ── LIST BLOCK ── */
  .list-block {
    border-radius: 12px;
    border: 1px solid;
    overflow: hidden;
  }

  .list-block-header {
    padding: 10px 14px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .list-block-body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .list-sub-link {
    display: block;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    text-decoration: none;
    color: #d5d5e6;
    background: rgba(255,255,255,0.04);
    border: 1px solid transparent;
    transition: all 0.2s ease;
    line-height: 1.45;
  }

  .list-sub-link:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.1);
    transform: translateX(3px);
  }

  /* ── DETAIL PAGE ── */
  .detail-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #08080f;
    font-family: 'Manrope', sans-serif;
  }

  .detail-topbar {
    background: rgba(10,10,20,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
    z-index: 50;
    flex-shrink: 0;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    background: rgba(124,92,252,0.15);
    border: 1px solid rgba(124,92,252,0.35);
    color: #b89eff;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s ease;
    font-family: 'Manrope', sans-serif;
  }

  .back-btn:hover {
    background: rgba(124,92,252,0.3);
    color: #ffffff;
    box-shadow: 0 0 20px rgba(124,92,252,0.3);
  }

  .detail-title {
    font-family: 'Bebas Neue', cursive;
    font-size: 15px;
    letter-spacing: 3px;
    color: #9090b0;
    max-width: 600px;
    text-align: center;
    text-transform: uppercase;
  }

  .detail-body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .detail-sidebar {
    width: 33.333%;
    background: rgba(12,12,22,0.95);
    border-right: 1px solid rgba(255,255,255,0.06);
    padding: 28px;
    overflow-y: auto;
    z-index: 50;
    flex-shrink: 0;
  }

  .detail-content-box {
    background: rgba(20,20,36,0.8);
    border: 1px solid rgba(124,92,252,0.2);
    border-radius: 16px;
    padding: 24px;
    color: #c0c0dc;
    font-size: 14px;
    line-height: 1.75;
    white-space: pre-line;
    font-weight: 500;
    box-shadow: inset 0 2px 20px rgba(0,0,0,0.3);
  }

  .detail-right {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    z-index: 30;
    pointer-events: none;
  }

  .tab-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    z-index: 50;
    position: relative;
    pointer-events: auto;
  }

  .tab-btn {
    flex: 1;
    padding: 10px 8px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(20,20,35,0.8);
    color: #6060a0;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Manrope', sans-serif;
  }

  .tab-btn.active {
    background: rgba(124,92,252,0.25);
    border-color: rgba(124,92,252,0.5);
    color: #c0a0ff;
    box-shadow: 0 0 16px rgba(124,92,252,0.2);
  }

  .tab-btn:hover:not(.active) {
    background: rgba(255,255,255,0.06);
    color: #a0a0cc;
  }

  .tab-empty {
    flex: 1;
    background: rgba(14,14,26,0.8);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #40406a;
    font-size: 13px;
    font-weight: 500;
    pointer-events: auto;
    letter-spacing: 1px;
  }

  /* ── IFRAME OVERLAY ── */
  .iframe-overlay {
    position: fixed;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,92,252,0.2);
    transition: opacity 0.4s ease;
    background: #fff;
  }
`;

// Inject styles once
if (!document.getElementById('app-global-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'app-global-styles';
  styleEl.textContent = globalStyles;
  document.head.appendChild(styleEl);
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = () => (
  <div className="app-wrap" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <header className="dash-header">
      <h1>Структура деятельности департамента маркетинга</h1>
    </header>
    <main className="dash-main">
      <div className="dash-grid">
        {dashboardData.map((column) => {
          const ac = colAccents[column.id] || colAccents["col-1"];
          return (
            <div key={column.id} className="col-wrap">
              {/* Column header */}
              <div
                className="col-head"
                style={{
                  background: ac.bg,
                  borderColor: ac.border,
                  color: ac.text,
                  boxShadow: `0 0 20px ${ac.glow}22`,
                }}
              >
                {column.title}
              </div>

              {/* Items */}
              {column.items.map((item) =>
                item.isList ? (
                  <div
                    key={item.id}
                    className="list-block"
                    style={{ background: ac.listBg, borderColor: ac.border }}
                  >
                    <div
                      className="list-block-header"
                      style={{ color: ac.text, background: `${ac.bg}` }}
                    >
                      {item.text}
                    </div>
                    <div className="list-block-body">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/detail/${sub.id}`}
                          className="list-sub-link"
                          style={{ '--hover-color': ac.glow }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = ac.border;
                            e.currentTarget.style.color = ac.text;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.color = '';
                          }}
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
                    className="item-card"
                    style={{ '--card-glow': ac.glow }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 8px 28px ${ac.glow}28`;
                      e.currentTarget.style.borderColor = ac.border;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <span
                      className="item-card-bar"
                      style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: 3, background: ac.glow, borderRadius: '3px 0 0 3px',
                        opacity: 0, transition: 'opacity 0.22s',
                      }}
                    />
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

// ─── BACKGROUND IFRAME MANAGER ────────────────────────────────────────────────
const BackgroundIframeManager = ({ activeId, activeTab }) => {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/detail');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {Object.keys(analysisDetails).map((id) => {
        const url = analysisDetails[id].powerBiUrl;
        if (!url) return null;

        const isShown = isDetail && activeId === id && activeTab === 'powerbi';

        return (
          <div
            key={id}
            className="iframe-overlay"
            style={{
              top: '140px',
              left: '34.5%',
              right: '20px',
              bottom: '20px',
              zIndex: isShown ? 40 : -1,
              opacity: isShown ? 1 : 0,
              pointerEvents: isShown ? 'auto' : 'none',
            }}
          >
            <iframe title={id} width="100%" height="100%" src={url} frameBorder="0" allowFullScreen={true} />
          </div>
        );
      })}
    </div>
  );
};

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
      {/* Top bar */}
      <div className="detail-topbar">
        <Link to="/" className="back-btn">← Назад в меню</Link>
        <h2 className="detail-title">{currentTitle}</h2>
        <div style={{ width: 140 }} />
      </div>

      {/* Body */}
      <div className="detail-body">
        {/* Sidebar */}
        <div className="detail-sidebar">
          <div className="detail-content-box">
            {detail?.content}
          </div>
        </div>

        {/* Right panel */}
        <div className="detail-right">
          {/* Tab bar */}
          <div className="tab-bar">
            {['powerbi', 'excel', 'ppt'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'powerbi' ? '📊 Power BI' : tab === 'excel' ? '📗 Excel' : '📙 PowerPoint'}
              </button>
            ))}
          </div>

          {activeTab !== 'powerbi' && (
            <div className="tab-empty" style={{ pointerEvents: 'auto' }}>
              Контент {activeTab.toUpperCase()} еще не подключен
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
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