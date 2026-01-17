import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'motion/react'
import { AnimatedCounter } from './AnimatedCounter'
import { getJobCountFn } from '@/server/functions/jobs'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function HeroSection() {
  const [jobCount, setJobCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchJobCount = async () => {
    try {
      const result = await getJobCountFn()
      setJobCount(result.count)
    } catch (error) {
      console.error('Failed to fetch job count:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobCount()
    const interval = setInterval(fetchJobCount, 5000)
    return () => clearInterval(interval)
  }, [])

  const jobsUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/jobs` : '/jobs'

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Briefcase className="w-6 h-6 text-emerald-400" />
          </div>
          <span
            className="text-2xl font-semibold text-white tracking-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            JobMatch
          </span>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-slate-400 text-sm uppercase tracking-widest mb-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Active Job Postings
        </motion.p>

        {/* Animated Counter */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4"
        >
          {isLoading ? (
            <div className="h-32 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatedCounter value={jobCount} />
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-slate-500 text-lg mb-16"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          freelance tasks waiting for you
        </motion.p>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <p
            className="text-slate-400 text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Scan to browse jobs
          </p>

          <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-emerald-500/10">
            <QRCodeSVG
              value={jobsUrl}
              size={160}
              level="H"
              bgColor="#ffffff"
              fgColor="#0f172a"
            />
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>or</span>
          </div>

          <Link
            to="/jobs"
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-full transition-all duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Browse Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Post Job Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16"
        >
          <Link
            to="/post-job"
            className="text-slate-500 hover:text-emerald-400 text-sm transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Are you a job provider? Post a job →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
