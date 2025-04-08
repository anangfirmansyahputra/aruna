import { useFormHandler } from '@/hooks/use-form-handler'
import { checkPermission } from '@/lib/permission'
import { ProductFeature, ProductRequirement } from '@/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  List,
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

interface RequirementFormProps {
  permissions: string[]
  requirements: ProductRequirement[]
  productId: number
}

export default function RequirementForm({
  permissions,
  requirements,
  productId,
}: RequirementFormProps) {
  const { locale } = usePage().props
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenItem, setIsModalOpenItem] = useState(false)
  const [data, setData] = useState<ProductRequirement | null>(null)
  const [isEdit, setIsEdit] = useState<number | null>(null)
  const [items, setItems] = useState<{
    en: string[]
    id: string[]
  }>(
    data
      ? JSON.parse(data.items)
      : {
          en: [],
          id: [],
        }
  )

  const [newItem, setNewItem] = useState('')

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/product-requirements/${data.id}`
      : `/dashboard/product-requirements`,
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

      if (items.en.length === 0 || items.id.length === 0) {
        return message.error('Please add at least 1 item for each language')
      }

      submit(null, {
        product_id: form.getFieldValue('product_id'),
        id_title: form.getFieldValue('id_title'),
        en_title: form.getFieldValue('en_title'),
        items: JSON.stringify(items),
      })
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
      router.delete(`/dashboard/product-requirements/${id}`, {
        preserveScroll: true,
      })
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const handleEdit = (record: ProductRequirement) => {
    setData(record)
    showModal()
    form.setFieldsValue(record)
  }

  const columns: TableProps<ProductRequirement>['columns'] = [
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
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(permissions, 'product-requirements.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          )}

          {checkPermission(
            permissions as string[],
            'product-requirements.destroy'
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

  const handleOkItem = () => {
    setIsModalOpenItem(false)
    if (isEdit) {
      setItems((prev) => ({
        ...prev,
        [lang]: prev[lang].map((item, index) => {
          return index === isEdit ? newItem : item
        }),
      }))
    } else {
      setItems((prev) => ({
        ...prev,
        [lang]: [...prev[lang], newItem],
      }))
    }

    setNewItem('')
    setIsEdit(null)
  }

  const handleCancelItem = () => {
    setIsEdit(null)
    setIsModalOpenItem(false)
    setNewItem('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Typography.Title level={4}>Requirement</Typography.Title>
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
        dataSource={requirements}
        scroll={{
          x: 'max-content',
        }}
      />

      <Modal
        title="Requirement Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form disabled={isLoading} form={form} layout="vertical">
          <Tabs onChange={(e) => setLang(e as 'id' | 'en')}>
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
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Form>
        <div className="flex items-center justify-between mb-5">
          <Typography.Title level={5}>Item</Typography.Title>
          <Button type="primary" onClick={() => setIsModalOpenItem(true)}>
            Add item
          </Button>
        </div>
        <List
          dataSource={items[lang as 'id' | 'en']}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    setIsEdit(index)
                    setIsModalOpenItem(true)
                    setNewItem(item)
                  }}
                >
                  edit
                </a>,
                <a
                  key="list-loadmore-more"
                  onClick={() => {
                    setItems((prev) => ({
                      ...prev,
                      [lang]: prev[lang].filter((_, i) => i !== index),
                    }))
                  }}
                >
                  delete
                </a>,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Item requirement"
        open={isModalOpenItem}
        onOk={handleOkItem}
        onCancel={handleCancelItem}
      >
        <Form layout="vertical">
          <Form.Item label="Text">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="New item"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
