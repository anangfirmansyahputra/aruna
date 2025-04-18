import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { CareerRequest, Promo, PromoRequest, Testimonial } from '@/types'
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Image,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import { Download } from 'lucide-react'
import { JSX } from 'react'

interface CareerRequestProps {
  data: CareerRequest[]
}

const breadcrumbs = ['Dashboard', 'Career Request']

export default function CareerRequestPage({ data }: CareerRequestProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/career-requests/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<CareerRequest>['columns'] = [
    {
      title: 'Career',
      key: 'career',
      dataIndex: 'career',
      width: 200,
      render: (_, record) => record.career.id_title,
    },
    {
      title: 'CV',
      key: 'cv',
      dataIndex: 'cv',
      width: 200,
      render: (_, record) => (
        <Button
          download={`${record.name} - CV`}
          icon={<DownloadOutlined />}
          href={`/storage/${record.cv}`}
        >
          Download
        </Button>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'No HP',
      dataIndex: 'no_hp',
      key: 'no_hp',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Created date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          {/* {checkPermission(permissions as string[], 'career-requests.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/career-requests/${record.id}/edit`)
              }
            />
          )} */}

          {checkPermission(
            permissions as string[],
            'career-requests.destroy'
          ) && (
            <Popconfirm
              title="Delete data"
              description="Are yoy sure to delete this data?"
              onConfirm={() => confirm(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Head title="Career Request" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Career Request</Typography.Title>
          {/* {checkPermission(permissions as string[], 'career-requests.create') && (
            <Button
              onClick={() =>
                router.visit('/dashboard/career-requests/create', {
                  preserveState: true,
                })
              }
              type="primary"
            >
              Add career-requests
            </Button>
          )} */}
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          className="mt-5"
          scroll={{
            x: 'max-content',
          }}
          rowKey={'id'}
        />
      </>
    </>
  )
}

CareerRequestPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
