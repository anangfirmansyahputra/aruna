import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import {
  InterestRate,
  Product,
  ProductFeature,
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
import React, { JSX } from 'react'
import * as LucideIcons from 'lucide-react'

interface ProductFeaturePageProps {
  data: (ProductFeature & {
    product: Product & {
      translations: ProductTranslation[]
    }
  })[]
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

const breadcrumbs = ['Dashboard', 'Product Feature']

export default function ProductFeaturePage({
  data,
  products,
}: ProductFeaturePageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/product-features/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const iconOptions = Object.entries(LucideIcons)
    .filter(
      // @ts-ignore
      ([_, Component]) => typeof Component === 'object' && Component?.render
    ) // Pastikan hanya mengambil komponen valid
    .map(([iconName, IconComponent]) => ({
      label: (
        <div className="flex items-center gap-2">
          {React.createElement(IconComponent as React.ElementType, {
            size: 16,
          })}
          <span>{iconName}</span>
        </div>
      ),
      value: iconName,
    }))

  const columns: TableProps<
    ProductFeature & {
      product: Product & {
        translations: ProductTranslation[]
      }
    }
  >['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: (_, record) => <div>{record.product.translations[0].name}</div>,
      filters: products.map((product) => ({
        text: product.translations[0].name,
        value: product.id,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.product.id === value,
    },
    {
      title: 'Title',
      dataIndex: 'id_title',
      key: 'id_title',
      width: 200,
      render: (_, record) => <div>{record.id_title} Month</div>,
    },
    {
      title: 'Description',
      dataIndex: 'id_description',
      key: 'id_description',
      width: 200,
      render: (_, record) => <div>{record.id_description}</div>,
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 200,
      render: (_, record) => {
        // @ts-ignore
        const IconComponent = LucideIcons[record.icon] // Ambil ikon berdasarkan nama

        return IconComponent ? (
          <div className="flex items-center gap-2">
            <IconComponent size={16} />
            {record.icon}
          </div>
        ) : null
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(
            permissions as string[],
            'product-features.edit'
          ) && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/product-features/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'product-features.destroy'
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
      <Head title="Product Feature" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Product Feature</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/product-features/create')}
            type="primary"
          >
            Add product feature
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

ProductFeaturePage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
