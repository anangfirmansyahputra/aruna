import DashboardLayout from '@/layouts/dashboard-layout'
import { Category } from '@/types'
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
import { JSX } from 'react'

interface CategoryPageProps {
  data: Category[]
}

const breadcrumbs = ['Dashboard', 'Category']

export default function CategoryPage({ data }: CategoryPageProps) {
  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/categories/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
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
            onClick={() =>
              router.visit(`/dashboard/categories/${record.id}/edit`)
            }
          />

          <Popconfirm
            title="Delete the category"
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
    <>
      <Head title="Category" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Category</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/categories/create')}
            type="primary"
          >
            Add category
          </Button>
        </div>
        <Divider />
        <Table columns={columns} dataSource={data} className="mt-5" />
      </>
    </>
  )
}

CategoryPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
