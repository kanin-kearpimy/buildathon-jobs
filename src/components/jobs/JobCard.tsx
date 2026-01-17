import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'

interface Job {
  id: string
  title: string
  description: string
  contact: string
  createdAt: string
}

interface JobCardProps {
  job: Job
  onClick: () => void
  index: number
}

export function JobCard({ job, onClick, index }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="w-full text-left group"
    >
      <div className="p-5 bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800 hover:border-emerald-500/30 rounded-xl transition-all duration-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors truncate"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {job.title}
            </h3>
            <p
              className="text-slate-500 text-sm mt-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Posted {formatDate(job.createdAt)}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </div>
    </motion.button>
  )
}
