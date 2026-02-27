import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "order" | "track" | "rating" | "support" | "profile";

const DRIVER = {
  name: "Алексей Ворнев",
  car: "Kia Rio • А270ВО",
  rating: 4.9,
  rides: 1248,
  eta: "4 мин",
  photo: "🧑‍✈️",
};

const NOTIFICATIONS = [
  { id: 1, text: "Водитель выехал к вам", time: "2 мин назад", icon: "Car" },
  { id: 2, text: "Скидка 20% на вечерние поездки", time: "1 ч назад", icon: "Tag" },
  { id: 3, text: "Ваш заказ завершён", time: "Вчера", icon: "CheckCircle" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("order");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tariff, setTariff] = useState("econom");
  const [ordered, setOrdered] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "support", text: "Здравствуйте! Чем могу помочь?" },
  ]);
  const [showNotif, setShowNotif] = useState(false);

  const tariffs = [
    { id: "econom", label: "Эконом", price: "от 199 ₽", icon: "🚗", time: "~5 мин" },
    { id: "comfort", label: "Комфорт", price: "от 349 ₽", icon: "🚙", time: "~3 мин" },
    { id: "business", label: "Бизнес", price: "от 699 ₽", icon: "🚘", time: "~7 мин" },
  ];

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages((m) => [...m, { from: "user", text: chatMsg }]);
    setChatMsg("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "support", text: "Принято! Мы разберёмся в течение 5 минут." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-end md:justify-center pb-0 md:pb-8">
      {/* Notification bell */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="relative glass rounded-2xl p-3 hover:neon-border-yellow transition-all"
        >
          <Icon name="Bell" size={20} className="text-yellow-400" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping-dot" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full" />
        </button>

        {showNotif && (
          <div className="absolute right-0 top-14 w-72 glass-strong rounded-2xl overflow-hidden animate-slide-up shadow-2xl border border-white/10">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-display text-sm text-white/80 uppercase tracking-wider">Уведомления</span>
              <button onClick={() => setShowNotif(false)}>
                <Icon name="X" size={16} className="text-white/40" />
              </button>
            </div>
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={n.icon as any} size={14} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-white/90">{n.text}</p>
                  <p className="text-xs text-white/40 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="fixed top-4 left-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center neon-glow-yellow">
            <Icon name="Zap" size={18} className="text-black" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white tracking-widest">DRIVE</span>
            <div className="text-[10px] text-yellow-400/70 font-body -mt-1">270-270</div>
          </div>
        </div>
      </div>

      {/* Phone frame */}
      <div className="w-full max-w-sm mx-auto h-[calc(100vh-0px)] md:h-[750px] flex flex-col relative overflow-hidden md:rounded-[2.5rem] md:shadow-2xl">

        {/* ── TAB CONTENT ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ===== ЗАКАЗ ===== */}
          {tab === "order" && (
            <div className="h-full flex flex-col animate-fade-in">
              {/* Header */}
              <div className="px-5 pt-16 pb-4">
                <p className="text-white/50 text-sm font-body">Доброе утро 👋</p>
                <h1 className="font-display text-3xl font-bold text-white mt-1">КУДА ЕДЕМ?</h1>
              </div>

              {!ordered ? (
                <div className="px-5 flex flex-col gap-4 pb-6">
                  {/* From / To */}
                  <div className="glass rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 neon-glow-yellow flex-shrink-0" />
                      <input
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Откуда"
                        className="bg-transparent text-white placeholder-white/30 text-sm flex-1 outline-none font-body"
                      />
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 flex-shrink-0" style={{boxShadow:"0 0 10px #34d39988"}} />
                      <input
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Куда"
                        className="bg-transparent text-white placeholder-white/30 text-sm flex-1 outline-none font-body"
                      />
                    </div>
                  </div>

                  {/* Tariff selector */}
                  <div>
                    <p className="text-white/50 text-xs font-body uppercase tracking-wider mb-2 px-1">Тариф</p>
                    <div className="flex gap-2">
                      {tariffs.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTariff(t.id)}
                          className={`flex-1 rounded-2xl p-3 text-left transition-all ${
                            tariff === t.id
                              ? "bg-yellow-400/20 border border-yellow-400/50 neon-border-yellow"
                              : "glass border border-transparent hover:border-white/15"
                          }`}
                        >
                          <div className="text-xl mb-1">{t.icon}</div>
                          <div className={`text-xs font-display font-semibold ${tariff === t.id ? "text-yellow-400" : "text-white/80"}`}>
                            {t.label}
                          </div>
                          <div className="text-[10px] text-white/40 font-body mt-0.5">{t.price}</div>
                          <div className="text-[10px] text-white/30 font-body">{t.time}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon name="CreditCard" size={16} className="text-white/60" />
                      </div>
                      <span className="text-sm text-white/70 font-body">Карта •••• 4242</span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-white/30" />
                  </div>

                  {/* Order button */}
                  <button
                    onClick={() => setOrdered(true)}
                    className="w-full bg-yellow-400 rounded-2xl py-4 font-display text-black text-lg font-bold uppercase tracking-widest neon-glow-yellow hover:bg-yellow-300 active:scale-95 transition-all"
                  >
                    Вызвать такси
                  </button>

                  {/* Quick destinations */}
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-body mb-2 px-1">Недавние</p>
                    <div className="flex flex-col gap-2">
                      {["Аэропорт Домодедово", "Торговый центр «Галерея»"].map((place) => (
                        <button
                          key={place}
                          onClick={() => setTo(place)}
                          className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <Icon name="Clock" size={14} className="text-white/30" />
                          <span className="text-sm text-white/60 font-body">{place}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Order in progress
                <div className="px-5 pb-6 flex flex-col gap-4 animate-slide-up">
                  <div className="glass-strong rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider font-body">Водитель едет</p>
                        <p className="font-display text-4xl text-yellow-400 font-bold">{DRIVER.eta}</p>
                      </div>
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-3xl animate-car-move">
                          🚕
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background" style={{boxShadow:"0 0 8px #34d399"}} />
                      </div>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full animate-pulse-slow" />
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-2xl">
                      {DRIVER.photo}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white font-body">{DRIVER.name}</p>
                      <p className="text-xs text-white/50 font-body">{DRIVER.car}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-white">{DRIVER.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 glass rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                      <Icon name="Phone" size={16} className="text-emerald-400" />
                      <span className="text-sm text-white/70 font-body">Позвонить</span>
                    </button>
                    <button className="flex-1 glass rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                      <Icon name="MessageCircle" size={16} className="text-yellow-400" />
                      <span className="text-sm text-white/70 font-body">Написать</span>
                    </button>
                    <button
                      onClick={() => setOrdered(false)}
                      className="flex-1 glass rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors"
                    >
                      <Icon name="X" size={16} className="text-red-400" />
                      <span className="text-sm text-white/70 font-body">Отменить</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== ОТСЛЕЖИВАНИЕ ===== */}
          {tab === "track" && (
            <div className="h-full flex flex-col animate-fade-in">
              <div className="px-5 pt-16 pb-4">
                <p className="text-white/50 text-sm font-body">В реальном времени</p>
                <h1 className="font-display text-3xl font-bold text-white mt-1">МАРШРУТ</h1>
              </div>

              {/* Mock map */}
              <div className="mx-5 rounded-3xl overflow-hidden relative" style={{height: 280}}>
                <div className="absolute inset-0 map-grid" style={{background: "linear-gradient(135deg, #0d1117 0%, #111827 100%)"}}>
                  <div className="map-grid absolute inset-0" />
                </div>
                {/* Roads */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 280">
                  <path d="M0,180 Q90,150 180,140 Q270,130 360,100" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none"/>
                  <path d="M0,180 Q90,150 180,140 Q270,130 360,100" stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none" strokeDasharray="20 10"/>
                  <path d="M60,0 Q80,140 100,280" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none"/>
                  <path d="M60,0 Q80,140 100,280" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none"/>
                  <path d="M200,0 Q220,140 240,280" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none"/>
                  {/* Route highlight */}
                  <path d="M40,230 Q120,160 180,140 Q240,120 300,90" stroke="url(#routeGrad)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#facc15"/>
                      <stop offset="100%" stopColor="#34d399"/>
                    </linearGradient>
                  </defs>
                  {/* Start pin */}
                  <circle cx="40" cy="230" r="8" fill="#facc15" opacity="0.9"/>
                  <circle cx="40" cy="230" r="14" fill="#facc15" opacity="0.2"/>
                  {/* End pin */}
                  <circle cx="300" cy="90" r="8" fill="#34d399" opacity="0.9"/>
                  <circle cx="300" cy="90" r="14" fill="#34d399" opacity="0.2"/>
                  {/* Car */}
                  <text x="168" y="148" fontSize="22" style={{animation:"car-move 3s ease-in-out infinite"}}>🚕</text>
                </svg>
                <div className="absolute bottom-3 left-3 right-3 glass rounded-2xl px-4 py-2.5 flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-xs text-white/60 font-body">Ул. Ленина, 12</span>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-white/30" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-emerald-400" />
                    <span className="text-xs text-white/60 font-body">Аэропорт</span>
                  </div>
                </div>
              </div>

              {/* Trip info */}
              <div className="px-5 mt-4 grid grid-cols-3 gap-3 pb-6">
                {[
                  { label: "Осталось", value: "4 мин", icon: "Clock", color: "text-yellow-400" },
                  { label: "Расстояние", value: "2.3 км", icon: "Route", color: "text-emerald-400" },
                  { label: "Стоимость", value: "349 ₽", icon: "Wallet", color: "text-blue-400" },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-2xl p-3 text-center">
                    <Icon name={item.icon as any} size={18} className={`${item.color} mx-auto mb-1`} />
                    <p className={`font-display text-lg font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-[11px] text-white/40 font-body">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-6 glass mx-5 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-2xl">🚕</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white font-body">{DRIVER.name}</p>
                  <p className="text-xs text-white/40 font-body">{DRIVER.car}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <Icon name="Phone" size={15} className="text-emerald-400" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <Icon name="MessageCircle" size={15} className="text-yellow-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== РЕЙТИНГ ===== */}
          {tab === "rating" && (
            <div className="px-5 pt-16 pb-6 animate-fade-in">
              <p className="text-white/50 text-sm font-body">Ваше мнение важно</p>
              <h1 className="font-display text-3xl font-bold text-white mt-1 mb-6">РЕЙТИНГ</h1>

              {!reviewSent ? (
                <>
                  {/* Driver card */}
                  <div className="glass-strong rounded-3xl p-5 mb-5 text-center">
                    <div className="text-5xl mb-3 animate-bounce-subtle">🧑‍✈️</div>
                    <p className="font-display text-xl text-white font-bold">{DRIVER.name}</p>
                    <p className="text-sm text-white/40 font-body mb-1">{DRIVER.car}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 font-bold">{DRIVER.rating}</span>
                      <span className="text-white/30 text-sm font-body">· {DRIVER.rides} поездок</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="glass rounded-2xl p-5 mb-4 text-center">
                    <p className="text-white/60 text-sm font-body mb-4">Оцените поездку</p>
                    <div className="flex justify-center gap-3 star-rating mb-2">
                      {[1,2,3,4,5].map((s) => (
                        <span
                          key={s}
                          className="text-4xl cursor-pointer"
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(s)}
                        >
                          {s <= (hoverRating || rating) ? "⭐" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/30 font-body">
                      {rating === 0 ? "Нажмите на звезду" : ["", "Плохо", "Неплохо", "Хорошо", "Отлично", "Превосходно!"][rating]}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <p className="text-white/40 text-xs uppercase tracking-wider font-body mb-2">Что понравилось?</p>
                    <div className="flex flex-wrap gap-2">
                      {["Чистый салон", "Вежливый", "Быстро", "Тихая езда", "Помог с багажом"].map((tag) => (
                        <button key={tag} className="glass rounded-xl px-3 py-1.5 text-xs text-white/60 hover:text-yellow-400 hover:border-yellow-400/30 transition-all border border-transparent font-body">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Оставьте отзыв о поездке..."
                    rows={3}
                    className="w-full glass rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none font-body border border-transparent focus:border-yellow-400/30 transition-colors mb-4"
                  />

                  <button
                    onClick={() => rating > 0 && setReviewSent(true)}
                    className={`w-full rounded-2xl py-4 font-display text-lg font-bold uppercase tracking-widest transition-all ${
                      rating > 0
                        ? "bg-yellow-400 text-black neon-glow-yellow hover:bg-yellow-300 active:scale-95"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Отправить отзыв
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 animate-slide-up">
                  <div className="text-7xl mb-4 animate-bounce-subtle">🎉</div>
                  <h2 className="font-display text-2xl text-white font-bold mb-2">Спасибо!</h2>
                  <p className="text-white/50 text-center font-body text-sm">Ваш отзыв поможет улучшить сервис</p>
                  <button
                    onClick={() => { setReviewSent(false); setRating(0); setReviewText(""); }}
                    className="mt-8 glass rounded-xl px-6 py-3 text-white/60 text-sm hover:text-white transition-colors font-body"
                  >
                    Ещё один отзыв
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===== ПОДДЕРЖКА ===== */}
          {tab === "support" && (
            <div className="h-full flex flex-col animate-fade-in">
              <div className="px-5 pt-16 pb-4">
                <p className="text-white/50 text-sm font-body">Мы на связи 24/7</p>
                <h1 className="font-display text-3xl font-bold text-white mt-1">ПОДДЕРЖКА</h1>
              </div>

              {/* Contacts */}
              <div className="px-5 flex flex-col gap-3 mb-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "270-270", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
                  { icon: "MessageCircle", label: "Telegram", value: "@drive_support", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
                  { icon: "Mail", label: "Email", value: "help@drive.ru", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
                ].map((c) => (
                  <button key={c.label} className={`glass rounded-2xl px-4 py-3.5 flex items-center gap-4 hover:bg-white/5 transition-colors border ${c.bg}`}>
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <Icon name={c.icon as any} size={18} className={c.color} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/40 font-body">{c.label}</p>
                      <p className={`text-sm font-semibold ${c.color} font-body`}>{c.value}</p>
                    </div>
                    <Icon name="ChevronRight" size={14} className="text-white/20 ml-auto" />
                  </button>
                ))}
              </div>

              {/* Chat */}
              <div className="px-5 flex-1 flex flex-col">
                <p className="text-white/40 text-xs uppercase tracking-wider font-body mb-3">Чат с поддержкой</p>
                <div className="glass rounded-3xl flex-1 flex flex-col overflow-hidden" style={{maxHeight: 260}}>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm font-body ${
                          m.from === "user"
                            ? "bg-yellow-400 text-black"
                            : "bg-white/8 text-white/80 border border-white/10"
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 flex items-center gap-2 px-3 py-2.5">
                    <input
                      value={chatMsg}
                      onChange={(e) => setChatMsg(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Напишите сообщение..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none font-body"
                    />
                    <button
                      onClick={sendMessage}
                      className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 active:scale-90 transition-all"
                    >
                      <Icon name="Send" size={14} className="text-black" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-4" />
            </div>
          )}

          {/* ===== ПРОФИЛЬ ===== */}
          {tab === "profile" && (
            <div className="px-5 pt-16 pb-6 animate-fade-in">
              <p className="text-white/50 text-sm font-body">Личный кабинет</p>
              <h1 className="font-display text-3xl font-bold text-white mt-1 mb-6">ПРОФИЛЬ</h1>

              {/* Avatar */}
              <div className="glass-strong rounded-3xl p-5 flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-400 flex items-center justify-center text-2xl font-display font-black text-black">
                  АИ
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl font-bold text-white">Андрей Иванов</p>
                  <p className="text-sm text-white/40 font-body">+7 (921) 270-27-00</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-yellow-400 font-body">4.8 · 47 поездок</span>
                  </div>
                </div>
                <button className="w-9 h-9 rounded-xl glass flex items-center justify-center">
                  <Icon name="Edit2" size={14} className="text-white/50" />
                </button>
              </div>

              {/* Payment methods */}
              <div className="mb-5">
                <p className="text-white/40 text-xs uppercase tracking-wider font-body mb-2">Способы оплаты</p>
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Visa •••• 4242", icon: "💳", active: true },
                    { name: "Наличные", icon: "💵", active: false },
                  ].map((p) => (
                    <div key={p.name} className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 ${p.active ? "border border-yellow-400/30" : ""}`}>
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-sm text-white/70 flex-1 font-body">{p.name}</span>
                      {p.active && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                    </div>
                  ))}
                  <button className="glass rounded-2xl px-4 py-3 flex items-center gap-3 border border-dashed border-white/15 hover:border-yellow-400/30 transition-colors">
                    <Icon name="Plus" size={16} className="text-white/40" />
                    <span className="text-sm text-white/40 font-body">Добавить карту</span>
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider font-body mb-2">Настройки</p>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Уведомления", icon: "Bell", badge: "Вкл" },
                    { label: "Избранные адреса", icon: "MapPin" },
                    { label: "История поездок", icon: "Clock" },
                    { label: "Помощь", icon: "HelpCircle" },
                    { label: "Выйти", icon: "LogOut", danger: true },
                  ].map((s) => (
                    <button key={s.label} className={`glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${s.danger ? "hover:bg-red-500/5" : ""}`}>
                      <Icon name={s.icon as any} size={16} className={s.danger ? "text-red-400/70" : "text-white/40"} />
                      <span className={`text-sm flex-1 text-left font-body ${s.danger ? "text-red-400/70" : "text-white/70"}`}>{s.label}</span>
                      {s.badge && (
                        <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-body">{s.badge}</span>
                      )}
                      {!s.badge && !s.danger && <Icon name="ChevronRight" size={14} className="text-white/20" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM NAV ── */}
        <div className="glass-strong border-t border-white/8 px-4 py-3 flex items-center justify-around flex-shrink-0">
          {[
            { id: "order", icon: "Car", label: "Заказ" },
            { id: "track", icon: "Map", label: "Маршрут" },
            { id: "rating", icon: "Star", label: "Рейтинг" },
            { id: "support", icon: "Headphones", label: "Помощь" },
            { id: "profile", icon: "User", label: "Профиль" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as Tab)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all ${
                tab === item.id ? "nav-item-active" : "hover:bg-white/5"
              }`}
            >
              <Icon
                name={item.icon as any}
                size={20}
                className={tab === item.id ? "text-yellow-400" : "text-white/40"}
              />
              <span className={`text-[10px] font-body ${tab === item.id ? "text-yellow-400" : "text-white/30"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
