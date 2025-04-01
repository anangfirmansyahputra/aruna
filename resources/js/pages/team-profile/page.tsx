import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { TeamProfile } from '@/types'
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
import { JSX } from 'react'

interface TeamProfilePageProps {
  data: TeamProfile[]
}

const breadcrumbs = ['Dashboard', 'Team Profile']

export default function TeamProfilePage({ data }: TeamProfilePageProps) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/team-profiles/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<TeamProfile>['columns'] = [
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
      width: 200,
    },
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
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(permissions as string[], 'team-profiles.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/team-profiles/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(
            permissions as string[],
            'team-profiles.destroy'
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
      <Head title="Team profile" />

      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Team profile</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/team-profiles/create')}
            type="primary"
          >
            Add team profile
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

TeamProfilePage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
