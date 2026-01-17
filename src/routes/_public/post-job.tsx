import { createFileRoute } from '@tanstack/react-router'
import { JobPostForm } from '@/components/jobs/JobPostForm'

export const Route = createFileRoute('/_public/post-job')({
  component: PostJobPage,
})

function PostJobPage() {
  return <JobPostForm />
}
