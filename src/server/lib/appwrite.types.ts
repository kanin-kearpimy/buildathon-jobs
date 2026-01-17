import { type Models } from 'node-appwrite'

export type Jobs = Models.Row & {
  createdBy: string
  title: string
  description: string
  contact: string
}

export type Applications = Models.Row & {
  createdBy: string
  jobId: string
  applicantName: string
  applicantContact: string
  message: string | null
}
