import DashboardLayout from '@/layouts/dashboard-layout'
import { News, Product } from '@/types'
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

interface NewsPage {
  data: News[]
}

const breadcrumbs = ['Dashboard', 'News']

export default function NewsPage({ data }: NewsPage) {
  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/news/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<News>['columns'] = [
    {
      title: 'Image',
      key: 'image_url',
      dataIndex: 'image_url',
      render: (_, record) => {
        return <Image width={150} src={record.image_url} />
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      render: (_, record) => {
        return record.keywords
          .split(',')
          .map((keyword) => <Tag color="green">{keyword}</Tag>)
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => {
        return record.tags
          .split(',')
          .map((tag) => <Tag color="green">{tag}</Tag>)
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
          <Button
            icon={<EditOutlined />}
            onClick={() => router.visit(`/dashboard/news/${record.id}`)}
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
      <Head title="News" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>News</Typography.Title>
          <Button
            onClick={() =>
              router.visit('/dashboard/news/create', {
                preserveState: true,
              })
            }
            type="primary"
          >
            Add news
          </Button>
        </div>
        <Divider />
        <Table columns={columns} dataSource={data} className="mt-5" />
      </>
    </>
  )
}

NewsPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
