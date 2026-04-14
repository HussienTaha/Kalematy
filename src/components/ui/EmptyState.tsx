import Card from './Card'

interface EmptyStateProps {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="border-dashed p-8 text-center">
      <p className="text-base font-medium text-slate-800 ">{title}</p>
      <p className="mt-2 text-sm text-slate-500 ">{description}</p>
    </Card>
  )
}

export default EmptyState
