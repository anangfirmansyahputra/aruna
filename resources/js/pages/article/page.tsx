import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Article } from '@/types'
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
  Tag,
  Typography,
} from 'antd'
import { JSX } from 'react'

interface ArticlePage {
  data: Article[]
}

const breadcrumbs = ['Dashboard', 'Article']

export default function ArticlePage({ data }: ArticlePage) {
  const { permissions } = usePage().props

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/articles/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const columns: TableProps<Article>['columns'] = [
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 200,
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-y-1">
            {record.keywords.split(',').map((keyword, index) => (
              <Tag color="green" key={index}>
                {keyword}
              </Tag>
            ))}
          </div>
        )
      },
      width: 200,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-y-1">
            {record.tags.split(',').map((tag, index) => (
              <Tag color="green" key={index}>
                {tag}
              </Tag>
            ))}
          </div>
        )
      },
      width: 200,
    },
    {
      title: 'Created date',
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
          {checkPermission(permissions as string[], 'articles.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/articles/${record.id}/edit`)
              }
            />
          )}

          {checkPermission(permissions as string[], 'articles.destroy') && (
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
      <Head title="Article" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>Article</Typography.Title>
          {checkPermission(permissions as string[], 'articles.create') && (
            <Button
              onClick={() =>
                router.visit('/dashboard/articles/create', {
                  preserveState: true,
                })
              }
              type="primary"
            >
              Add articles
            </Button>
          )}
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          className="mt-5"
          scroll={{
            x: 'max-content',
          }}
          rowKey={'id'}
        />
      </>
    </>
  )
}

ArticlePage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
