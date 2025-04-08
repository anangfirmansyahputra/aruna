import { checkPermission } from '@/lib/permission'
import { ProductFeature } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import { Button, message, Popconfirm, Space, TableProps } from 'antd'
import * as LucideIcons from 'lucide-react'

interface FeatureColumnProps {
  permissions: string[]
}

export const featureColumn = (
  permissions: string[]
): TableProps<ProductFeature>['columns'] => {
  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/product-features/${id}`)
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  return [
    {
      title: 'ID Title',
      dataIndex: 'id_title',
      key: 'id_title',
      width: 200,
    },
    {
      title: 'EN Title',
      dataIndex: 'en_title',
      key: 'en_title',
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
      title: 'ID Description',
      dataIndex: 'id_description',
      key: 'id_description',
      width: 200,
    },
    {
      title: 'EN Description',
      dataIndex: 'en_description',
      key: 'en_description',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(permissions, 'product-features.edit') && (
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
}
