import { useState } from 'react'
import { motion } from 'motion/react'
import { Briefcase, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createJobFn } from '@/server/functions/jobs'
import { toast } from 'sonner'

export function JobPostForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !contact.trim()) return

    setIsSubmitting(true)
    try {
      await createJobFn({
        data: {
          title: title.trim(),
          description: description.trim(),
          contact: contact.trim(),
        },
      })
      setIsSuccess(true)
      toast.success('Job posted successfully!')
      setTimeout(() => {
        router.navigate({ to: '/jobs' })
      }, 2000)
    } catch (error) {
      console.error('Failed to post job:', error)
      toast.error('Failed to post job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span
                className="font-semibold text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                JobMatch
              </span>
            </div>
            <Link
              to="/jobs"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Job Posted!
            </h2>
            <p
              className="text-slate-400 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Your job is now live and visible to applicants.
            </p>
            <p
              className="text-slate-500 text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Redirecting to job listings...
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Post a Job
            </h1>
            <p
              className="text-slate-400 mb-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Find the perfect freelancer for your task
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-slate-300 text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Job Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Build a landing page"
                  required
                  maxLength={200}
                  className="py-6 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <p
                  className="text-slate-500 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {title.length}/200 characters
                </p>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-slate-300 text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the task, requirements, timeline, and budget..."
                  required
                  maxLength={5000}
                  rows={8}
                  className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 resize-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <p
                  className="text-slate-500 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {description.length}/5000 characters
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label
                  htmlFor="contact"
                  className="text-slate-300 text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact Information
                </Label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email, WhatsApp, or Telegram"
                  required
                  maxLength={500}
                  className="py-6 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <p
                  className="text-slate-500 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  How applicants will reach you
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !title.trim() ||
                    !description.trim() ||
                    !contact.trim()
                  }
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium py-6 text-base disabled:opacity-50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    'Post Job'
                  )}
                </Button>
              </div>
            </form>

            {/* Info */}
            <div className="mt-8 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
              <p
                className="text-slate-400 text-sm text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Your job will be visible to all users immediately after posting.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
