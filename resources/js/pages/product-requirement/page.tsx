import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import {
  Product,
  ProductFAQ,
  ProductRequirement,
  ProductTranslation,
} from '@/types'
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

interface ProductRequirementProps {
  data: ProductRequirement[]
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

const breadcrumbs = ['Dashboard', 'Product Requirement']

export default function FAQPage({ data, products }: ProductRequirementProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/product-requirements/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<ProductRequirement>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'id_title',
      key: 'id_title',
      width: 200,
      filters: products.map((product) => ({
        text: product.translations[0].name,
        value: product.id,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.product_id === value,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: (_, record) => <div>{record.product.translations[0].name}</div>,
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
          {checkPermission(
            permissions as string[],
            'product-requirements.edit'
          ) && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(
                  `/dashboard/product-requirements/${record.id}/edit`
                )
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'product-requirements.destroy'
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
      <Head title="Product Requirement" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Product Requirement</Typography.Title>
          <Button
            onClick={() =>
              router.visit('/dashboard/product-requirements/create')
            }
            type="primary"
          >
            Add requirement
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

FAQPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
