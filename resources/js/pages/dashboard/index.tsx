import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { JSX } from 'react'

const breadcrumbs = ['Dashboard']

export default function DashboardPage() {
  return (
    <>
      <Head title="Dashboard" />
    </>
  )
}

DashboardPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
