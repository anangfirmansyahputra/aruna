import DashboardLayout from '@/layouts/dashboard-layout'
import { Product } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Head, router } from '@inertiajs/react'
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
import { JSX } from 'react'

interface ProductPage {
  data: Product[]
}

const breadcrumbs = ['Dashboard', 'Product']

export default function ProductPage({ data }: ProductPage) {
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
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      key: 'category_id',
      render: (_, record) => {
        return <div>{record.category?.name}</div>
      },
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
    },
    {
      title: 'Calculator name',
      dataIndex: 'collateral_name',
      key: 'collateral_name',
    },
    {
      title: 'Created date',
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
              router.visit(`/dashboard/products/${record.id}/edit`)
            }
          />

          <Popconfirm
            title="Delete data"
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
      <Head title="Product" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Product</Typography.Title>
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
        </div>
        <Divider />
        <Table columns={columns} dataSource={data} className="mt-5" />
      </>
    </>
  )
}

ProductPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
