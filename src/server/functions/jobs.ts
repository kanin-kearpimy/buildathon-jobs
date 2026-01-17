import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/server/lib/db'
import { Query } from 'node-appwrite'
import { authMiddleware } from './auth'

// Get job count
export const getJobCountFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const result = await db.jobs.list([Query.limit(1)])
    return { count: result.total }
  },
)

// List all jobs
export const listJobsFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const result = await db.jobs.list([
      Query.orderDesc('$createdAt'),
      Query.limit(100),
    ])
    return {
      jobs: result.rows.map((job) => ({
        id: job.$id,
        title: job.title,
        description: job.description,
        contact: job.contact,
        createdAt: job.$createdAt,
      })),
    }
  },
)

// Get single job
export const getJobFn = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const job = await db.jobs.get(data.id)
    return {
      job: {
        id: job.$id,
        title: job.title,
        description: job.description,
        contact: job.contact,
        createdAt: job.$createdAt,
      },
    }
  })

// Create job
const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  contact: z.string().min(1, 'Contact is required').max(500),
})

export const createJobFn = createServerFn({ method: 'POST' })
  .inputValidator(createJobSchema)
  .handler(async ({ data }) => {
    const { currentUser } = await authMiddleware()

    const job = await db.jobs.create({
      title: data.title.trim(),
      description: data.description.trim(),
      contact: data.contact.trim(),
      createdBy: currentUser?.$id ?? 'anonymous',
    })

    return {
      job: {
        id: job.$id,
        title: job.title,
        description: job.description,
        contact: job.contact,
        createdAt: job.$createdAt,
      },
    }
  })

// Create application
const createApplicationSchema = z.object({
  jobId: z.string(),
  applicantName: z.string().min(1, 'Name is required').max(200),
  applicantContact: z.string().min(1, 'Contact is required').max(500),
  message: z.string().max(2000).nullable().optional(),
})

export const createApplicationFn = createServerFn({ method: 'POST' })
  .inputValidator(createApplicationSchema)
  .handler(async ({ data }) => {
    const { currentUser } = await authMiddleware()

    const application = await db.applications.create({
      jobId: data.jobId,
      applicantName: data.applicantName.trim(),
      applicantContact: data.applicantContact.trim(),
      message: data.message?.trim() ?? null,
      createdBy: currentUser?.$id ?? 'anonymous',
    })

    return {
      application: {
        id: application.$id,
        jobId: application.jobId,
        applicantName: application.applicantName,
        applicantContact: application.applicantContact,
        message: application.message,
      },
    }
  })
