import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import {
  CreditProposal,
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
  Image,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import React, { JSX } from 'react'
import * as LucideIcons from 'lucide-react'

interface CreditProposalPageProps {
  data: (CreditProposal & {
    product: Product & {
      translations: ProductTranslation[]
    }
  })[]
}

const breadcrumbs = ['Dashboard', 'Credit Proposal']

export default function CreditProposalPage({ data }: CreditProposalPageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/credit-proposals/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<
    CreditProposal & {
      product: Product & {
        translations: ProductTranslation[]
      }
    }
  >['columns'] = [
    {
      title: 'Debtor Name',
      dataIndex: 'debtor_name',
      key: 'debtor_name',
      width: 200,
    },
    {
      title: 'Photo KTP',
      dataIndex: 'collateral_photo_ktp',
      key: 'collateral_photo_ktp',
      width: 200,
      render: (_, record) => {
        return <Image src={record.collateral_photo_ktp} />
      },
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: (_, record) => {
        return <div>{record.product.translations[0].name}</div>
      },
    },
    {
      title: 'Plafond Amount',
      dataIndex: 'plafond_amount',
      key: 'plafond_amount',
      width: 200,
    },
    {
      title: 'NPWP',
      dataIndex: 'debtor_npwp',
      key: 'debtor_npwp',
      width: 200,
    },
    {
      title: 'KTP',
      dataIndex: 'debtor_no_ktp',
      key: 'debtor_no_ktp',
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
          {checkPermission(
            permissions as string[],
            'credit-proposals.edit'
          ) && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/credit-proposals/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'credit-proposals.destroy'
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
      <Head title="Credit Proposal" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Credit Proposal</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/credit-proposals/create')}
            type="primary"
          >
            Add credit proposal
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

CreditProposalPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
