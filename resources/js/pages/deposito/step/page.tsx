import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { DepositoStep } from '@/types'
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

interface DepositoStepPageProps {
  data: DepositoStep[]
}

const breadcrumbs = ['Dashboard', 'e-Deposito Step']

export default function DepositoStepPage({ data }: DepositoStepPageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/deposito-step/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<DepositoStep>['columns'] = [
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
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: 200,
    },
    {
      title: 'Highlighted',
      dataIndex: 'is_highlighted',
      key: 'is_highlighted',
      width: 200,
      render: (is_highlighted) => (is_highlighted ? 'Yes' : 'No'),
    },
    {
      title: 'Title',
      dataIndex: 'id_title',
      key: 'id_title',
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'id_description',
      key: 'id_description',
      width: 200,
    },
    {
      title: 'Created Date',
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
          {checkPermission(permissions as string[], 'deposito-step.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/deposito-step/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'deposito-step.destroy'
          ) && (
            <Popconfirm
              title="Delete the data"
              description="Are you sure to delete this item?"
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
      <Head title="Team profile" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>e-Deposito Step</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/deposito-step/create')}
            type="primary"
          >
            Add step item
          </Button>
        </div>
        <Divider />
        <Table
          scroll={{
            x: 'max-content',
          }}
          columns={columns}
          dataSource={data}
          className="mt-5"
          rowKey={'id'}
        />
      </>
    </>
  )
}

DepositoStepPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
