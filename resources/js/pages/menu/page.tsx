import DashboardLayout from '@/layouts/dashboard-layout'
import { Menu } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import { JSX } from 'react'
import * as Icons from '@ant-design/icons'
import { checkPermission } from '@/lib/permission'

const iconsMap: any = Icons

const breadcrumbs = ['Dashboard', 'Menu']

interface MenuPageProps {
  data: Menu[]
}

export default function MenuPage({ data }: MenuPageProps) {
  const { permissions } = usePage().props

  const columns: TableProps<Menu>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (_, record) => {
        const IconComponent = iconsMap[record.icon]
        return (
          <div className="flex items-center gap-2">
            <IconComponent /> {record.icon}
          </div>
        )
      },
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
          {checkPermission(permissions as string[], 'menus.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() => router.visit(`/dashboard/menus/${record.id}/edit`)}
            />
          )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Head title="Menu" />

      <Typography.Title level={4}>Menu</Typography.Title>
      <Divider />
      <Table columns={columns} dataSource={data} className="mt-5" />
    </>
  )
}

MenuPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
