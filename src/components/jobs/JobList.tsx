import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Briefcase, ArrowLeft, Search, Loader2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { JobCard } from './JobCard'
import { JobDetailModal } from './JobDetailModal'
import { ApplyModal } from './ApplyModal'
import { listJobsFn } from '@/server/functions/jobs'
import { Input } from '@/components/ui/input'

interface Job {
  id: string
  title: string
  description: string
  contact: string
  createdAt: string
}

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await listJobsFn()
        setJobs(result.jobs)
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsDetailOpen(true)
  }

  const handleApply = () => {
    setIsDetailOpen(false)
    setIsApplyOpen(true)
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
              to="/post-job"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Post Job
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Browse Jobs
          </h1>
          <p
            className="text-slate-400 mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find your next freelance opportunity
          </p>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Job List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-slate-600" />
              </div>
              <p
                className="text-slate-400"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {searchQuery
                  ? 'No jobs match your search'
                  : 'No jobs posted yet'}
              </p>
              {!searchQuery && (
                <Link
                  to="/post-job"
                  className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Be the first to post a job →
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job)}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApply={handleApply}
      />
      <ApplyModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  )
}
