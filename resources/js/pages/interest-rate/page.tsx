import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { InterestRate, Product } from '@/types'
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

interface InterestRatePageProps {
  data: InterestRate[]
  products: Product[]
}

const breadcrumbs = ['Dashboard', 'Interest Rate']

export default function InterestRatePage({
  data,
  products,
}: InterestRatePageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/interest-rates/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<InterestRate>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: (_, record) => <div>{record.product.name}</div>,
      filters: products.map((product) => ({
        text: product.name,
        value: product.id,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.product_id === value,
    },
    {
      title: 'Tenor',
      dataIndex: 'tenor',
      key: 'tenor',
      width: 200,
      render: (_, record) => <div>{record.tenor} Month</div>,
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      width: 200,
      render: (_, record) => <div>{record.interest}%</div>,
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
          {checkPermission(permissions as string[], 'interest-rates.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/interest-rates/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'interest-rates.destroy'
          ) && (
            <Popconfirm
              title="Delete the category"
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
      <Head title="Category" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Category</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/interest-rates/create')}
            type="primary"
          >
            Add category
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
    </>
  )
}

InterestRatePage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
