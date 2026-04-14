import { Link } from 'react-router-dom'
import CategoryCard from '../components/home/CategoryCard'
import CategoryModal from '../components/home/CategoryModal'
import { useCategorySlider } from '../context/CategorySliderContext'
import { categories } from '../data/categories'

function HomeContent() {
  const { openCategory, progressByCategory, soundEnabled, toggleSound } = useCategorySlider()

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 px-4 py-10 sm:py-12  ">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 ">
            تعلّم للأطفال
          </p>
          <h1 className="mt-3 text-4xl font-black text-orange-500 sm:text-5xl lg:text-6xl ">
            مرحباً بك في كلماتي
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg ">
            اضغط على فئة ملوّنة لبدء استكشاف الكلمات.
          </p>
          <button
            type="button"
            onClick={toggleSound}
            className="mt-5 rounded-full bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-700"
          >
            {soundEnabled ? 'الصوت: يعمل' : 'الصوت: متوقف'}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/game"
              className="rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-slate-800 shadow-lg transition hover:bg-white   "
              aria-label="الذهاب إلى صفحة اللعبة"
            >
              لعبة للأطفال
            </Link>

            <Link
              to="/game/choose-word"
              className="rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-slate-800 shadow-lg transition hover:bg-white   "
              aria-label="الذهاب إلى لعبة انظر واختر"
            >
              لعبة: انظر واختر
            </Link>

            <Link
              to="/game/memory"
              className="rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-slate-800 shadow-lg transition hover:bg-white   "
              aria-label="الذهاب إلى لعبة الذاكرة"
            >
              لعبة الذاكرة
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={openCategory}
                clickCount={progressByCategory[category.id]?.clickCount ?? 0}
                completionText={`${progressByCategory[category.id]?.viewedItemIds?.length ?? 0}/${category.items.length} مكتمل`}
              />
            ))}
        </div>
      </div>

      <CategoryModal />
    </section>
  )
}

function HomePage() {
  return <HomeContent />
}

export default HomePage
