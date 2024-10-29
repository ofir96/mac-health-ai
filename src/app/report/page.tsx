import { Suspense } from 'react'
import ReportContent from '@/app/report/ReportContent'

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading report...</p>
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}

