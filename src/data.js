export const dashboardData = [
  {
    id: "market-analysis",
    title: "Анализ рынка",
    items: [
      { id: "customs-base", text: "Обработка таможенной базы, регистрация, статистики. Хронометраж. Опрос." },
      { id: "cargo-market", text: "Анализ рынка грузовой техники 14-40 тн" },
      { id: "trailer-market", text: "Анализ рынка прицепной техники" },
      { id: "minitruck-market", text: "Анализ рынка минигрузовиков" },
      { id: "fin-committee", text: "Материалы по Финкомитету" },
      { id: "cis-market", text: "Анализ рынка РФ и Казахстан" }
    ]
  },
  {
    id: "production-section",
    title: "Производство и Исполнение",
    items: [
      { id: "pp-324", text: "Анализ исполнения ПП-324, 12.09.2024." },
      { 
        id: "production-list", 
        text: "Производство", 
        isHeader: true,
        subItems: [
          { id: "prod-1", text: "1. Анализ сырья;" },
          { id: "prod-2", text: "2. Анализ плана производства;" },
          { id: "prod-3", text: "3. Анализ деятельности ОТК;" },
          { id: "prod-4", text: "4. Анализ условий для рабочих и работы с их обращениями;" },
          { id: "prod-5", text: "5. Анализ логистики готовой продукции.;" },
          { id: "prod-6", text: "6. Анализ дилерских сетей." }
        ]
      }
    ]
  },
  {
    id: "advertising-marketing",
    title: "Реклама и Продвижение",
    items: [
      { id: "ads-main", text: "Реклама" },
      { id: "site-seo", text: "Сайт, приложение (seo оптимизация, контекстная реклама)" },
      { id: "instagram", text: "Инстаграм (видеоролики, таргет)" },
      { id: "telegram-ads", text: "Телеграм канал и бот, Автоэлон, ОЛХ, билборды и другие рекламные площадки" },
      { id: "youtube-tv", text: "Ютуб, блогеры, телевидение" },
      { id: "catalogs-kp", text: "Каталоги, прайсы, электронные и почтовые отправки КП" },
      { id: "exhibitions", text: "Выставки, корпоративные встречи" }
    ]
  },
  {
    id: "department-comm",
    title: "Взаимодействие",
    items: [
      { id: "comm-analysis", text: "Коммуникация, взаимодействия и анализ отделов" },
      { 
        id: "call-center", 
        text: "Колл-центр, анализ:", 
        subItems: [
          { id: "amo-crm", text: "1. Амо-CRM;" },
          { id: "cold-calls", text: "2. Холодных звонков" },
          { id: "feedback", text: "3. Обратных связей" }
        ]
      },
      { id: "sales-dealers", text: "Маркетинг и отдел продаж, дилеры" },
      { id: "hr-union", text: "Маркетинг и отдел кадров, профсоюз" },
      { id: "supply-dept", text: "Маркетинг и отдел снабжения (закупа)" },
      { id: "finance-dept", text: "Маркетинг и финансовый отдел" },
      { id: "service-dept", text: "Маркетинг и отдел сервиса" }
    ]
  },
  {
    id: "strategy-offers",
    title: "Стратегия",
    items: [
      { id: "offers", text: "Предложения" },
      { id: "event-plan", text: "План мероприятий" },
      { id: "marketing-strategy", text: "Маркетинговая стратегия" }
    ]
  }
];