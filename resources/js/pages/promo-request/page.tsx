import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Promo, PromoRequest, Testimonial } from '@/types'
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

interface PromoRequestPageProps {
  data: (PromoRequest & {
    promo: Promo
  })[]
}

const breadcrumbs = ['Dashboard', 'Promo Request']

export default function PromoRequestPage({ data }: PromoRequestPageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/promo-requests/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<PromoRequest>['columns'] = [
    {
      title: 'Promo',
      key: 'promo',
      dataIndex: 'promo',
      render: (_, record) => record.promo.id_title,
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
          {/* {checkPermission(permissions as string[], 'promo-requests.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/promo-requests/${record.id}/edit`)
              }
            />
          )} */}

          {checkPermission(
            permissions as string[],
            'promo-requests.destroy'
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
      <Head title="Promo Request" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Promo Request</Typography.Title>
          {/* {checkPermission(permissions as string[], 'promo-requests.create') && (
            <Button
              onClick={() =>
                router.visit('/dashboard/promo-requests/create', {
                  preserveState: true,
                })
              }
              type="primary"
            >
              Add promo-requests
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

PromoRequestPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
