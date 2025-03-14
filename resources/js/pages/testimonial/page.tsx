import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Testimonial } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
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
import { JSX } from 'react'

interface TestimonialPageProps {
  data: Testimonial[]
}

const breadcrumbs = ['Dashboard', 'Testimonial']

export default function TestimonialPage({ data }: TestimonialPageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/testimonials/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<Testimonial>['columns'] = [
    {
      title: 'Image',
      key: 'image_url',
      dataIndex: 'image_url',
      render: (_, record) => {
        return <Image width={150} src={record.image_url} />
      },
      width: 200,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      width: 200,
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
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
          {checkPermission(permissions as string[], 'testimonials.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/testimonials/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(permissions as string[], 'testimonials.destroy') && (
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
      <Head title="Testimonial" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Testimonial</Typography.Title>
          {checkPermission(permissions as string[], 'testimonials.create') && (
            <Button
              onClick={() =>
                router.visit('/dashboard/testimonials/create', {
                  preserveState: true,
                })
              }
              type="primary"
            >
              Add testimonials
            </Button>
          )}
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

TestimonialPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
