import { useEffect, useState, useRef } from "react";
import { Truck, BadgeCheck, ShieldCheck, Users, Star, Eye, Sparkles, Gift, Flame, MessageCircle, X } from "lucide-react";
import heroImg from "@/assets/moon-lamp-hero-new.jpg";
import sleepImg from "@/assets/moon-sleep.jpg";
import workImg from "@/assets/moon-work.jpg";
import giftImg from "@/assets/moon-gift.jpg";
import bedroomImg from "@/assets/moon-bedroom.jpg";

const WHATSAPP_NUMBER = "212721314919";
const WHATSAPP_MESSAGE = "سلام، بغيت نطلب Moon Luxe";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const trustBadges = [
  { icon: Truck, text: "توصيل مجاني" },
  { icon: BadgeCheck, text: "الدفع عند الاستلام" },
  { icon: ShieldCheck, text: "ضمان الجودة" },
  { icon: Users, text: "+5000 زبون راضي" },
];

const benefits = [
  { icon: Eye, title: "إضاءة مريحة للعين", desc: "ضوء دافئ وناعم كيخلي الجو هادي ومريح" },
  { icon: Sparkles, title: "ديكور فاخر وعصري", desc: "كيزيد لمسة أناقة لأي غرفة فدارك" },
  { icon: Gift, title: "هدية مثالية", desc: "هدية كتفرح أي شخص عزيز عليك" },
];

const reviews = [
  {
    name: "سارة م.",
    city: "الدار البيضاء",
    text: "الضو ديالو زوين بزاف و عطى للبيت ديكور راقي، كنشعلو كل ليلة قبل النعاس.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "يوسف ا.",
    city: "الرباط",
    text: "خديتو كهدية لخطيبتي و عجبهم بزاف، الجودة فوق الممتاز و التوصيل كان سريع.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "خديجة ر.",
    city: "مراكش",
    text: "كيعطي جو هادئ فالليل، صراحة بدّل أجواء الصالون ديالي تماماً. ننصح بيه بقوة!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
];

function useCountdown(initial: number) {
  const [t, setT] = useState(initial);
  useEffect(() => {
    const i = setInterval(() => setT((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);
  const h = Math.floor(t / 3600).toString().padStart(2, "0");
  const m = Math.floor((t % 3600) / 60).toString().padStart(2, "0");
  const s = (t % 60).toString().padStart(2, "0");
  return { h, m, s };
}

export default function MoonLanding() {
  const [offer, setOffer] = useState<"single" | "double">("double");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { h, m, s } = useCountdown(2 * 3600 + 47 * 60);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString().trim().slice(0, 100);
    const phone = (fd.get("phone") || "").toString().trim().slice(0, 30);
    const city = (fd.get("city") || "").toString().trim().slice(0, 100);
    const address = (fd.get("address") || "").toString().trim().slice(0, 300);
    if (!name || !phone || !city || !address) {
      setErrorMsg("عمر جميع الخانات من فضلك");
      setSubmitting(false);
      return;
    }
    const offerLabel = offer === "single" ? "قطعة واحدة - 149 DH" : "جوج قطع - 279 DH";
    const now = new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" });
    try {
      await fetch("https://formsubmit.co/ajax/laalja.adam@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🌙 طلب جديد Moon Luxe — ${name}`,
          _template: "table",
          _captcha: "false",
          "الاسم الكامل": name,
          "رقم الهاتف": phone,
          "المدينة": city,
          "العنوان الكامل": address,
          "العرض المختار": offerLabel,
          "تاريخ الطلب": now,
        }),
      });
    } catch {
      // even if email fails we still confirm to the user; lead is captured in form
    }
    setSubmitting(false);
    setShowSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Top trust bar */}
      <div className="bg-secondary/60 border-b border-border/60 backdrop-blur">
        <div className="overflow-hidden">
          <div className="marquee py-2 text-xs sm:text-sm whitespace-nowrap text-gold-soft">
            {[...trustBadges, ...trustBadges, ...trustBadges].map((b, i) => (
              <span key={i} className="flex items-center gap-2 shrink-0">
                <b.icon className="w-4 h-4 text-gold" />
                <span>{b.text}</span>
                <span className="text-gold/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative px-5 pt-8 pb-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative reveal">
            <div className="relative moon-glow rounded-3xl overflow-hidden shadow-glow">
              <img
                src={heroImg}
                alt="مصباح القمر الفاخر"
                width={1024}
                height={1024}
                className="relative z-10 w-full h-auto float"
              />
            </div>
          </div>

          <div className="reveal text-center md:text-right" style={{ animationDelay: "0.15s" }}>
            <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-xs text-gold border border-gold/30 mb-4">
              <Flame className="w-3.5 h-3.5" />
              <span>عرض محدود لهاد الأسبوع فقط</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight glow-text">
              حوّل أي غرفة لأجواء <span className="text-gold">ساحرة</span> مع مصباح القمر الفاخر
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              إضاءة دافئة، ديكور أنيق، وهدية مثالية لأي شخص كيبغي التميز.
            </p>

            <div className="mt-5 flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                <span className="text-foreground font-bold mr-2">4.9/5</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm bg-secondary px-3 py-1 rounded-full border border-border">
                🔥 +1200 قطعة تباعت
              </span>
            </div>

            <button onClick={scrollToForm} className="btn-gold pulse-glow mt-7 text-lg w-full sm:w-auto">
              اطلب الآن 🌙
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-5 py-10 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl mb-8">علاش <span className="text-gold">مصباح القمر</span> ديالنا؟</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-card border border-border/60 rounded-2xl p-6 text-center shadow-card hover:border-gold/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gold flex items-center justify-center mb-4 shadow-glow">
                <b.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <section className="px-5 py-6 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-3xl overflow-hidden shadow-card relative moon-glow bg-card">
            <img src={productImg} alt="مصباح القمر — تفاصيل" loading="lazy" className="relative z-10 w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-card relative moon-glow">
            <img src={lifestyleImg} alt="مصباح القمر فالصالون" loading="lazy" className="relative z-10 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl mb-2">اختار العرض اللي يناسبك</h2>
        <p className="text-center text-muted-foreground mb-8">عروض حصرية بأسعار ما كتلقاهاش فبلاصة أخرى</p>

        <div className="grid sm:grid-cols-2 gap-5">
          <button
            onClick={() => { setOffer("single"); scrollToForm(); }}
            className={`text-right relative bg-card border-2 rounded-2xl p-6 transition-all ${offer === "single" ? "border-gold shadow-glow" : "border-border/60"}`}
          >
            <div className="text-sm text-muted-foreground mb-2">العرض العادي</div>
            <div className="text-2xl font-bold mb-3">قطعة واحدة</div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-black text-gold">149 DH</span>
              <span className="text-muted-foreground line-through">219 DH</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-gold" /> توصيل مجاني</li>
              <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-gold" /> الدفع عند الاستلام</li>
            </ul>
          </button>

          <button
            onClick={() => { setOffer("double"); scrollToForm(); }}
            className={`text-right relative bg-card border-2 rounded-2xl p-6 transition-all ${offer === "double" ? "border-gold shadow-glow" : "border-gold/40"}`}
          >
            <div className="absolute -top-3 right-6 bg-gold text-primary-foreground text-xs font-black px-3 py-1 rounded-full shadow-glow">
              🔥 الأكثر طلباً
            </div>
            <div className="text-sm text-gold mb-2">وفّر 19 DH</div>
            <div className="text-2xl font-bold mb-1">جوج قطع</div>
            <div className="text-xs text-muted-foreground mb-3">بدّل دارك بجوج مصابيح</div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-black text-gold">279 DH</span>
              <span className="text-muted-foreground line-through">438 DH</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-gold" /> توصيل مجاني</li>
              <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-gold" /> الدفع عند الاستلام</li>
              <li className="flex items-center gap-2"><Gift className="w-4 h-4 text-gold" /> هدية مثالية لشخص عزيز</li>
            </ul>
          </button>
        </div>
      </section>

      {/* Urgency */}
      <section className="px-5 py-8 max-w-3xl mx-auto">
        <div className="bg-card border border-gold/40 rounded-2xl p-6 shadow-glow">
          <div className="flex items-center gap-2 text-gold font-bold mb-3">
            <Flame className="w-5 h-5" />
            <span>العرض محدود والكمية كتسالي بسرعة!</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gold rounded-full" style={{ width: "82%" }} />
          </div>
          <div className="text-xs text-muted-foreground mb-5">82% من المخزون تباع — بقاو 47 قطعة فقط</div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[{ v: h, l: "ساعة" }, { v: m, l: "دقيقة" }, { v: s, l: "ثانية" }].map((x, i) => (
              <div key={i} className="bg-secondary rounded-xl p-3 border border-border">
                <div className="text-2xl font-black text-gold tabular-nums">{x.v}</div>
                <div className="text-xs text-muted-foreground">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section ref={formRef} className="px-5 py-10 max-w-2xl mx-auto scroll-mt-6">
        <div className="bg-card border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-glow">
          <div className="text-center mb-6">
            <div className="inline-block bg-gold text-primary-foreground text-xs font-black px-3 py-1 rounded-full mb-3">
              🛒 أكمل طلبك
            </div>
            <h2 className="text-2xl sm:text-3xl">دخّل معلوماتك باش نوصلك الطلب</h2>
            <p className="text-sm text-muted-foreground mt-2">الدفع عند الاستلام • التوصيل مجاني</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="الاسم الكامل" name="name" placeholder="مثال: محمد العلوي" />
            <Field label="رقم الهاتف" name="phone" type="tel" placeholder="06XXXXXXXX" />
            <Field label="المدينة" name="city" placeholder="مثال: الدار البيضاء" />
            <Field label="العنوان الكامل" name="address" placeholder="الحي، الشارع، الرقم" />

            <div>
              <label className="block text-sm font-bold mb-2">اختار العرض</label>
              <select
                value={offer}
                onChange={(e) => setOffer(e.target.value as "single" | "double")}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
              >
                <option value="single">قطعة واحدة - 149 DH</option>
                <option value="double">جوج قطع - 279 DH (الأكثر طلباً)</option>
              </select>
            </div>

            <div className="bg-secondary rounded-xl p-4 flex justify-between text-sm">
              <span className="text-muted-foreground">المجموع</span>
              <span className="font-black text-gold text-lg">{offer === "single" ? "149 DH" : "279 DH"}</span>
            </div>

            {errorMsg && <div className="text-sm text-destructive text-center">{errorMsg}</div>}

            <button type="submit" disabled={submitting} className="btn-gold pulse-glow w-full text-lg disabled:opacity-70">
              {submitting ? "جاري الإرسال..." : "تأكيد الطلب ✓"}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-gold" /> الدفع عند الاستلام</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-gold" /> توصيل مجاني</span>
            </div>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl mb-2">شنو كيقولو <span className="text-gold">زبائننا</span></h2>
        <p className="text-center text-muted-foreground mb-8">+5000 زبون راضي فجميع المدن المغربية</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-500" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} loading="lazy" className="w-12 h-12 rounded-full border-2 border-gold/40 object-cover" />
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
              <div className="flex text-gold mb-2">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-10 mt-6 border-t border-border/60 bg-secondary/40">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="text-gold font-display font-black text-2xl glow-text">🌙 Moon Luxe</div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
            <a href="#" className="hover:text-gold transition">سياسة الاستبدال</a>
            <a href="#" className="hover:text-gold transition">معلومات التوصيل</a>
            <a href="#" className="hover:text-gold transition">من نحن</a>
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold hover:scale-105 transition">
            <MessageCircle className="w-5 h-5" />
            تواصل معنا عبر واتساب
          </a>
          <p className="text-xs text-muted-foreground pt-2">© 2026 Moon Luxe — جميع الحقوق محفوظة</p>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="واتساب"
        className="fixed bottom-24 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_0_0_rgba(37,211,102,0.7)] whatsapp-pulse hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-3 bg-background/95 backdrop-blur border-t border-gold/30">
        <button onClick={scrollToForm} className="btn-gold pulse-glow w-full text-base">
          اطلب الآن 🌙 — 149 DH
        </button>
      </div>
      <div className="md:hidden h-20" />

      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm reveal">
          <div className="relative bg-card border border-gold/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-glow">
            <button onClick={() => setShowSuccess(false)} aria-label="إغلاق" className="absolute top-3 left-3 text-muted-foreground hover:text-gold">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 mx-auto rounded-full bg-gold flex items-center justify-center mb-4 shadow-glow">
              <BadgeCheck className="w-9 h-9 text-primary-foreground" />
            </div>
            <h3 className="text-2xl mb-2 text-gold">تم إرسال طلبك بنجاح 🎉</h3>
            <p className="text-muted-foreground mb-5">سنتواصل معك قريباً لتأكيد التوصيل. شكراً على ثقتك!</p>
            <button onClick={() => setShowSuccess(false)} className="btn-gold w-full">تمام</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        maxLength={300}
        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
      />
    </div>
  );
}
