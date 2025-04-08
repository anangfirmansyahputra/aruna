import { useFormHandler } from '@/hooks/use-form-handler'
import { checkPermission } from '@/lib/permission'
import { ProductFeature } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
  Tabs,
  Typography,
} from 'antd'
import * as LucideIcons from 'lucide-react'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface FeatureFormProps {
  permissions: string[]
  features: ProductFeature[]
  productId: number
}

export default function FeatureForm({
  permissions,
  features,
  productId,
}: FeatureFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<ProductFeature | null>(null)

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/product-features/${data.id}`
      : `/dashboard/product-features`,
    method: data ? 'put' : 'post',
  })

  const showModal = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    try {
      form.setFieldValue('product_id', productId)
      await form.validateFields()
      submit()
      setIsModalOpen(false)
      setData(null)
    } catch (err: any) {
      console.log(err)

      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    } finally {
      form.resetFields()
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const confirm = (id: number) => {
    try {
      router.delete(`/dashboard/product-features/${id}`, {
        preserveScroll: true,
      })
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const handleEdit = (record: ProductFeature) => {
    setData(record)
    showModal()
    form.setFieldsValue(record)
  }

  const columns: TableProps<ProductFeature>['columns'] = [
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
              onClick={() => handleEdit(record)}
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

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Typography.Title level={4}>Feature</Typography.Title>
        <Button
          type="primary"
          size="middle"
          icon={<Plus />}
          onClick={showModal}
        />
      </div>
      <Divider />

      <Table
        columns={columns}
        dataSource={features}
        scroll={{
          x: 'max-content',
        }}
      />

      <Modal
        title="Feature Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form disabled={isLoading} form={form} layout="vertical">
          <Tabs>
            {['id', 'en'].map((locale) => (
              <Tabs.TabPane key={locale} tab={locale.toUpperCase()} forceRender>
                <Form.Item
                  name={`${locale}_title`}
                  label="Title"
                  rules={[{ required: true, message: 'Please enter title' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={`product_id`}
                  style={{
                    display: 'none',
                  }}
                >
                  <Input value={productId} />
                </Form.Item>

                <Form.Item
                  name={`${locale}_description`}
                  label="Description"
                  rules={[
                    { required: true, message: 'Please enter description' },
                  ]}
                >
                  <Input.TextArea rows={5} />
                </Form.Item>

                <Form.Item
                  name="icon"
                  label="Icon"
                  rules={[{ required: true, message: 'Select an icon' }]}
                >
                  <Select
                    showSearch
                    options={iconOptions}
                    filterOption={(input, option) =>
                      (option?.value ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Tabs.TabPane>
            ))}
          </Tabs>

          <Space>
            {/* {checkPermission(
              permissions as string[],
              data ? 'product-features.update' : 'product-features.store'
            ) && (
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )} */}
          </Space>
        </Form>
      </Modal>
    </div>
  )
}
