import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Product } from '@/types'
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
  Tag,
  Typography,
} from 'antd'

interface ProductPage {
  data: Product[]
}

const breadcrumbs = ['Dashboard', 'Product']

export default function ProductPage({ data }: ProductPage) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/products/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<Product>['columns'] = [
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
      width: 250,
    },
    {
      title: 'Category',
      key: 'category_id',
      render: (_, record) => {
        return <div>{record.category?.translations[0].name}</div>
      },
      width: 200,
    },
    {
      title: 'Credit',
      key: 'is_credit',
      render: (_, record) => {
        return (
          <Tag color={record.is_credit ? 'green' : 'yellow'}>
            {record.is_credit ? 'Yes' : 'No'}
          </Tag>
        )
      },
      width: 200,
    },
    {
      title: 'Calculator name',
      dataIndex: 'collateral_name',
      key: 'collateral_name',
      width: 250,
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
          {checkPermission(permissions as string[], 'products.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/products/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(permissions as string[], 'products.destroy') && (
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
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Product" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Product</Typography.Title>
          {checkPermission(permissions as string[], 'products.create') && (
            <Button
              onClick={() =>
                router.visit('/dashboard/products/create', {
                  preserveState: true,
                })
              }
              type="primary"
            >
              Add product
            </Button>
          )}
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
    </DashboardLayout>
  )
}
