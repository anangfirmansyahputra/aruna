import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { DepositoStep } from '@/types'
import { DeleteOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons'
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
import { JSX, useState } from 'react'

interface DepositoStepPageProps {
  data: DepositoStep[]
}

const breadcrumbs = ['Dashboard', 'e-Deposito Step']

export default function DepositoStepPage({ data }: DepositoStepPageProps) {
  const { permissions } = usePage().props
  const [dataSource, setDataSource] = useState<DepositoStep[]>(data)
  const [loading, setLoading] = useState(false)
  const [dragItem, setDragItem] = useState<number | null>(null)

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/deposito-step/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const updatePositions = async (newData: DepositoStep[]) => {
    try {
      setLoading(true)
      const positionUpdates = newData.map((item, index) => ({
        id: item.id,
        position: index + 1,
      }))

      router.post('/dashboard/deposito-step/order', {
        positions: positionUpdates
      }, {
        preserveScroll: true,
        onSuccess: () => {
          message.success('Positions updated successfully')
        },
        onError: () => {
          message.error('Failed to update positions')
        },
        onFinish: () => {
          setLoading(false)
        }
      })
    } catch (error) {
      message.error('Failed to update positions')
      setLoading(false)
    }
  }

  const handleDragStart = (index: number) => {
    setDragItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (dropIndex: number) => {
    if (dragItem === null) return

    const newData = [...dataSource]
    const draggedItem = newData[dragItem]
    
    // Remove the item
    newData.splice(dragItem, 1)
    // Insert at new position
    newData.splice(dropIndex, 0, draggedItem)
    
    setDataSource(newData)
    setDragItem(null)
    updatePositions(newData)
  }

  const columns: TableProps<DepositoStep>['columns'] = [
    {
      title: 'Sort',
      key: 'sort',
      width: 80,
      render: (_, __, index) => (
        <div 
          className="cursor-grab"
          draggable
          onDragStart={() => handleDragStart(index)}
        >
          <MenuOutlined style={{ color: '#999' }} />
        </div>
      ),
    },
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
      title: 'Highlighted',
      dataIndex: 'is_highlighted',
      key: 'is_highlighted',
      width: 200,
      render: (is_highlighted) => (is_highlighted ? 'Yes' : 'No'),
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
          {checkPermission(permissions as string[], 'deposito-step.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.visit(`/dashboard/deposito-step/${record.id}/edit`)
              }
            />
          )}
          {checkPermission(
            permissions as string[],
            'deposito-step.destroy'
          ) && (
            <Popconfirm
              title="Delete the data"
              description="Are you sure to delete this item?"
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
      <Head title="e-Deposito Step" />
      <>
        <div className="flex items-center justify-between">
          <Typography.Title level={4}>e-Deposito Step</Typography.Title>
          <Button
            onClick={() => router.visit('/dashboard/deposito-step/create')}
            type="primary"
          >
            Add step item
          </Button>
        </div>
        <Divider />
        <div className="mt-5">
          <Table
            loading={loading}
            scroll={{
              x: 'max-content',
            }}
            columns={columns}
            dataSource={dataSource}
            rowKey={'id'}
            pagination={false}
            onRow={(_, index) => ({
              onDragOver: handleDragOver,
              onDrop: () => handleDrop(index!),
              className: dragItem === index ? 'bg-blue-50' : undefined
            })}
          />
        </div>
      </>
    </>
  )
}

DepositoStepPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)