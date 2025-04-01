import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { CompanyValue } from '@/types'
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
import * as LucideIcons from 'lucide-react'
import { JSX } from 'react'

interface CompanyValueProps {
  data: CompanyValue[]
}

const breadcrumbs = ['Dashboard', 'Company Value']

export default function CompanyValuePage({ data }: CompanyValueProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/company-values/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<CompanyValue>['columns'] = [
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
          {checkPermission(permissions as string[], 'company-values.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/company-values/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'company-values.destroy'
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
      <Head title="Company Value" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Company value</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/company-values/create')}
            type="primary"
          >
            Add company value
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

CompanyValuePage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
