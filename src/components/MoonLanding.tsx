import { useEffect, useState, useRef } from "react";
import { Truck, BadgeCheck, ShieldCheck, Users, Star, Eye, Sparkles, Gift, Flame, MessageCircle } from "lucide-react";
import heroImg from "@/assets/moon-lamp-hero.jpg";
import lamp2 from "@/assets/moon-lamp-2.jpg";

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
  { name: "سارة م.", city: "الدار البيضاء", text: "والله زوينة بزاف! بدّلات جو الصالون ديالي تماماً، الإضاءة دافية ورومانسية." , avatar: "https://i.pravatar.cc/100?img=47" },
  { name: "يوسف ا.", city: "الرباط", text: "شريتها كادو لخطيبتي، عجباتها بزاف. الجودة فوق الممتاز والتوصيل كان سريع.", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "خديجة ر.", city: "مراكش", text: "كنشعلها كل ليلة قبل النعاس، كتعطي جو هادي ومريح. ننصح بيها بقوة!", avatar: "https://i.pravatar.cc/100?img=32" },
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
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { h, m, s } = useCountdown(2 * 3600 + 47 * 60);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
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
                width={1280}
                height={1280}
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

      {/* Offers */}
      <section className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl mb-2">اختار العرض اللي يناسبك</h2>
        <p className="text-center text-muted-foreground mb-8">عروض حصرية بأسعار ما كتلقاهاش فبلاصة أخرى</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Option 1 */}
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

          {/* Option 2 */}
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

      {/* Lifestyle image */}
      <section className="px-5 py-6 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-card relative moon-glow">
          <img src={lamp2} alt="مصباح القمر فالصالون" loading="lazy" width={1024} height={1024} className="relative z-10 w-full h-auto" />
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
            {[
              { v: h, l: "ساعة" }, { v: m, l: "دقيقة" }, { v: s, l: "ثانية" },
            ].map((x, i) => (
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

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold flex items-center justify-center mb-4 shadow-glow">
                <BadgeCheck className="w-9 h-9 text-primary-foreground" />
              </div>
              <h3 className="text-2xl mb-2 text-gold">تم تأكيد طلبك! 🎉</h3>
              <p className="text-muted-foreground">غادي نتواصلو معاك فأقرب وقت لتأكيد التوصيل. شكراً على ثقتك!</p>
            </div>
          ) : (
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

              <button type="submit" className="btn-gold pulse-glow w-full text-lg">
                تأكيد الطلب ✓
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-gold" /> الدفع عند الاستلام</span>
                <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-gold" /> توصيل مجاني</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl mb-2">شنو كيقولو <span className="text-gold">زبائننا</span></h2>
        <p className="text-center text-muted-foreground mb-8">+5000 زبون راضي فجميع المدن المغربية</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-border/60 rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} loading="lazy" className="w-12 h-12 rounded-full border-2 border-gold/40" />
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
          <a href="https://wa.me/212600000000" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold hover:scale-105 transition">
            <MessageCircle className="w-5 h-5" />
            تواصل معنا على واتساب
          </a>
          <p className="text-xs text-muted-foreground pt-2">© 2026 Moon Luxe — جميع الحقوق محفوظة</p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden p-3 bg-background/95 backdrop-blur border-t border-gold/30">
        <button onClick={scrollToForm} className="btn-gold pulse-glow w-full text-base">
          اطلب الآن 🌙 — 149 DH
        </button>
      </div>
      <div className="md:hidden h-20" />
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
        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
      />
    </div>
  );
}
