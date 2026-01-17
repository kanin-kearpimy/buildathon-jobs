import { motion, AnimatePresence } from 'motion/react'
import { X, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Job {
  id: string
  title: string
  description: string
  contact: string
  createdAt: string
}

interface JobDetailModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onApply: () => void
}

export function JobDetailModal({
  job,
  isOpen,
  onClose,
  onApply,
}: JobDetailModalProps) {
  if (!job) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getContactIcon = (contact: string) => {
    if (contact.includes('@')) return <Mail className="w-4 h-4" />
    if (contact.toLowerCase().includes('whatsapp') || contact.startsWith('+'))
      return <MessageCircle className="w-4 h-4" />
    return <Send className="w-4 h-4" />
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-xl font-semibold text-white"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {job.title}
                    </h2>
                    <p
                      className="text-slate-500 text-sm mt-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Posted on {formatDate(job.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Description
                </h3>
                <p
                  className="text-slate-300 whitespace-pre-wrap leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {job.description}
                </p>

                {/* Contact Info */}
                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl">
                  <h3
                    className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Contact
                  </h3>
                  <div className="flex items-center gap-2 text-emerald-400">
                    {getContactIcon(job.contact)}
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>
                      {job.contact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                <Button
                  onClick={onApply}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium py-6"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Apply for this Job
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
