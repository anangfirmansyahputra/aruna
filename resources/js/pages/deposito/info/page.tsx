import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { DepositoInfo } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import { JSX } from 'react'

interface DepositoInfoPageProps {
  data: DepositoInfo[]
}

const breadcrumbs = ['Dashboard', 'e-Deposito Info']

export default function DepositoInfoPage({ data }: DepositoInfoPageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/deposito-info/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<DepositoInfo>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'id_title',
      key: 'id_title',
      width: 200,
    },
    {
      title: 'Content',
      dataIndex: 'id_content',
      key: 'id_content',
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
          {checkPermission(permissions as string[], 'deposito-info.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/deposito-info/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'deposito-info.destroy'
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
      <Head title="e-Deposito Info" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>e-Deposito Info</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/deposito-info/create')}
            type="primary"
          >
            Add info item
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

DepositoInfoPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
