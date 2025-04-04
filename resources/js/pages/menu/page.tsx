import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Menu } from '@/types'
import * as Icons from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import { Button, Divider, Space, Table, TableProps, Typography } from 'antd'
import { JSX } from 'react'

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
      render: (_, record) => {
        return record.path ?? '-'
      },
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      render: (_, record) => {
        return record.group ?? '-'
      },
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (_, record) => {
        if (record.icon) {
          const IconComponent = iconsMap[record.icon]
          return (
            <div className="flex items-center gap-2">
              <IconComponent /> {record.icon}
            </div>
          )
        } else {
          return <div>-</div>
        }
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
  )
}

MenuPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
