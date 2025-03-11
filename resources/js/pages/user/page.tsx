import DashboardLayout from '@/layouts/dashboard-layout'
import { User } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Head, router } from '@inertiajs/react'
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

interface UserPageProps {
  data: User[]
}

const breadcrumbs = ['Dashboard', 'User']

export default function UserPage({ data }: UserPageProps) {
  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/users/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => (
        <div>{record.roles.map((item) => item.name).join(',')}</div>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => router.visit(`/dashboard/users/${record.id}/edit`)}
          />

          <Popconfirm
            title="Delete the user"
            description="Are yoy sure to delete this data?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="User" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>User</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/users/create')}
            type="primary"
          >
            Add user
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
        />
      </>
    </DashboardLayout>
  )
}
