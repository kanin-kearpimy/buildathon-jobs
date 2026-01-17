import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createApplicationFn } from '@/server/functions/jobs'
import { toast } from 'sonner'

interface Job {
  id: string
  title: string
}

interface ApplyModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!job || !name.trim() || !contact.trim()) return

    setIsSubmitting(true)
    try {
      await createApplicationFn({
        data: {
          jobId: job.id,
          applicantName: name.trim(),
          applicantContact: contact.trim(),
          message: message.trim() || null,
        },
      })
      setIsSuccess(true)
      toast.success('Application submitted successfully!')
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      console.error('Failed to submit application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setName('')
    setContact('')
    setMessage('')
    setIsSuccess(false)
    onClose()
  }

  if (!job) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Application Sent!
                  </h2>
                  <p
                    className="text-slate-400"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    The job provider will contact you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-slate-800">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2
                          className="text-xl font-semibold text-white"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Apply for Job
                        </h2>
                        <p
                          className="text-slate-500 text-sm mt-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {job.title}
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-slate-300"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contact"
                        className="text-slate-300"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Your Contact (Email, WhatsApp, Telegram)
                      </Label>
                      <Input
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="your@email.com or +1234567890"
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-slate-300"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell the job provider why you're a good fit..."
                        rows={4}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !name.trim() || !contact.trim()}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium py-6 disabled:opacity-50"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
