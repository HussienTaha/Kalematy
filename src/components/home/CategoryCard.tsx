import type { CategoryItem } from '../../data/categories'
import SafeImage from '../ui/SafeImage'

interface CategoryCardProps {
  category: CategoryItem
  onClick: (category: CategoryItem) => void
  clickCount: number
  completionText: string
}

function CategoryCard({ category, onClick, clickCount, completionText }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className="group rounded-3xl bg-white p-4 text-right shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 "
      aria-label={`فتح فئة ${category.name}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <SafeImage
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-extrabold tracking-wide text-white">{category.name}</h3>
          <p className="mt-1 text-xs font-semibold text-white/90">{clickCount} استماع</p>
          <p className="text-xs font-medium text-white/90">{completionText}</p>
        </div>
      </div>
    </button>
  )
}

export default CategoryCard
