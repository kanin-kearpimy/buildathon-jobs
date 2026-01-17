import { createFileRoute } from '@tanstack/react-router'
import { JobList } from '@/components/jobs/JobList'

export const Route = createFileRoute('/_public/jobs')({
  component: JobsPage,
})

function JobsPage() {
  return <JobList />
}
