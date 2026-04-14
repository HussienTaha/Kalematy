interface PageHeaderProps {
  title: string
  subtitle: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 ">{title}</h2>
      <p className="mt-1 text-sm text-slate-600 ">{subtitle}</p>
    </div>
  )
}

export default PageHeader
