import { useFormHandler } from '@/hooks/use-form-handler'
import { checkPermission } from '@/lib/permission'
import { ProductFAQ, ProductFeature } from '@/types'
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
import TabPane from 'antd/es/tabs/TabPane'
import * as LucideIcons from 'lucide-react'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

interface FAQFormProps {
  permissions: string[]
  faqs: ProductFAQ[]
  productId?: number
}

export default function FAQForm({
  permissions,
  faqs,
  productId,
}: FAQFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<ProductFAQ | null>(null)

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/product-faqs/${data.id}`
      : `/dashboard/product-faqs`,
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
      submit(null, {
        ...form.getFieldsValue(),
        product_id: productId,
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
      router.delete(`/dashboard/product-faqs/${id}`, {
        preserveScroll: true,
      })
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const handleEdit = (record: ProductFAQ) => {
    setData(record)
    showModal()
    form.setFieldsValue(record)
  }

  const columns: TableProps<ProductFAQ>['columns'] = [
    {
      title: 'ID Question',
      dataIndex: 'id_question',
      key: 'id_question',
      width: 200,
    },
    {
      title: 'EN Question',
      dataIndex: 'en_question',
      key: 'en_question',
      width: 200,
    },
    {
      title: 'ID Answer',
      dataIndex: 'id_answer',
      key: 'id_answer',
      width: 200,
    },
    {
      title: 'EN Answer',
      dataIndex: 'en_answer',
      key: 'en_answer',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(permissions, 'product-faqs.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          )}

          {checkPermission(permissions as string[], 'product-faqs.destroy') && (
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
        dataSource={faqs}
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
              <TabPane key={locale} tab={locale.toUpperCase()} forceRender>
                <Form.Item
                  name={`${locale}_question`}
                  label="Question"
                  rules={[{ required: true, message: 'Enter question' }]}
                >
                  <Input placeholder="Enter question" />
                </Form.Item>

                <Form.Item name={`${locale}_answer`} label="Answer">
                  <Input.TextArea rows={5} />
                </Form.Item>
              </TabPane>
            ))}
          </Tabs>
        </Form>
      </Modal>
    </div>
  )
}
