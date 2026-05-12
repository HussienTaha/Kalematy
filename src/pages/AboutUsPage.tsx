
import { useNavigate } from "react-router-dom";

const objectives = [
  {
    icon: "🧠",
    title: "تنمية اللغة الاستقبالية",
    points: [
      "التعرف على المفردات الأساسية المرتبطة بالبيئة اليومية",
      "التمييز بين الصور المختلفة والاستجابة للأوامر البسيطة",
      "ربط الكلمة المنطوقة بالصورة المناسبة",
    ],
  },
  {
    icon: "🗣",
    title: "تنمية اللغة التعبيرية",
    points: [
      "نطق الكلمات بشكل تدريجي وواضح",
      "استخدام المفردات للتعبير عن الاحتياجات",
      "تقليد الأصوات والكلمات داخل البرنامج",
    ],
  },
  {
    icon: "🎯",
    title: "تنمية الانتباه والتركيز",
    points: [
      "الحفاظ على الانتباه أثناء الأنشطة",
      "تتبع المثيرات البصرية والسمعية",
      "تقليل التشتت أثناء التفاعل",
    ],
  },
  {
    icon: "🧩",
    title: "تنمية الإدراك الحسي والمعرفي",
    points: [
      "تمييز الفئات المختلفة",
      "التصنيف والمطابقة",
      "الربط بين الصوت والصورة والمعنى",
    ],
  },
  {
    icon: "🧏",
    title: "تنمية مهارات التقليد",
    points: [
      "تقليد أصوات البيئة والحيوانات",
      "تقليد الكلمات والنماذج اللغوية",
      "محاكاة السلوكيات اليومية",
    ],
  },
  {
    icon: "👥",
    title: "تنمية مهارات التواصل الاجتماعي",
    points: [
      "التفاعل باستخدام الكلمات",
      "الاستجابة للاسم والنداءات",
      "استخدام اللغة (طلب - رفض - اختيار)",
    ],
  },
  {
    icon: "💪",
    title: "تنمية الاستقلالية الوظيفية",
    points: [
      "التعبير عن الاحتياجات اليومية",
      "تقليل الاعتماد على الإشارات",
    ],
  },
]

function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f7f4] px-4 py-8 text-slate-700 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* زر الرجوع */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-orange-500 px-4 py-2 text-white shadow-md transition hover:bg-orange-600"
          >
            الرجوع للرئيسية
          </button>
        </div>

        {/* HERO SECTION (زي ما هو بالكامل) */}
        <section className="rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
            <div className="w-full space-y-4 text-center md:w-2/3 md:text-right">
              <h1 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                من نحن
              </h1>

              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                منصة تعليمية تفاعلية صممت لدعم تعلم الأطفال من ذوي الاحتياجات
                الخاصة بأسلوب بسيط وممتع يراعي الفروق الفردية ويعزز النمو اللغوي
                والمعرفي والاجتماعي.
              </p>
            </div>

            <div className="w-full md:w-1/3">
              <div className="mx-auto w-full max-w-[220px] rounded-2xl bg-white p-3 shadow-medium ring-1 ring-slate-200 group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <img
                  src="images/jobs/unv.png"
                  alt="شعار الجامعة"
                  className="h-40 w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* معلومات المشروع (زي ما هو) */}
        <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            معلومات المشروع
          </h2>
          <div className="rounded-2xl bg-slate-50 p-5 text-center shadow-sm ring-1 ring-slate-200 sm:p-6">
            <p className="text-lg font-semibold text-slate-700">
              مشروع تخرج طلاب قسم تكنولوجيا التعليم لذوي الاحتياجات الخاصة
            </p>
            <p className="mt-2 text-base text-slate-600">كلية التربية</p>
            <p className="text-base text-slate-600">جامعة العاصمة</p>
          </div>
        </section>

        {/* الصور (زي ما هو) */}
        <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
          <div className=" flex items-center justify-between  max-w-4xl mx-auto mb-5 ">
            <div className="">
              {" "}
              <h2 className="mb-4 text-2xl font-bold text-slate-800">
                صور المشروع
              </h2>
            </div>
            <div className="">
              {" "}
              <h2 className="mb-4 text-2xl font-bold text-slate-800">
                صور القسم
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-6 md:grid-cols-2">
            {/* صورة القسم */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <img
                src="images/jobs/dep.png"
                alt="شعار القسم"
                className="h-64 w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* صورة الجامعة */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <img
                src="images/jobs/unv.png"
                alt="صورة الجامعة"
                className="h-64 w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </section>

        {/* الأهداف (زي ما هو) */}
       <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
  <h2 className="mb-6 text-2xl font-bold text-slate-800">
    أهداف التطبيق
  </h2>

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {objectives.map((item) => (
      <article
        key={item.title}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-5 shadow-md ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      >
        {/* icon */}
        <div className="mb-3 text-3xl transition-transform duration-500 group-hover:scale-110">
          {item.icon}
        </div>

        {/* title */}
        <h3 className="mb-3 text-base font-bold text-slate-800">
          {item.title}
        </h3>

        {/* points */}
        <ul className="space-y-2 text-sm text-slate-600">
          {item.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 text-orange-500">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {/* hover glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-orange-50/20" />
      </article>
    ))}
  </div>
</section>

        {/* الفريق (زي ما هو) */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-800">
              فريق العمل
            </h2>
            <p className="text-base text-slate-700">
              الطالبة: آلاء محمد علي عفيفي
            </p>
            <p className="text-base text-slate-700">نورهان ياسر</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-800">
              تحت الإشراف
            </h2>
            <p className="text-base text-slate-700">أ.د / انشراح عبد العزيز</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutUsPage;
