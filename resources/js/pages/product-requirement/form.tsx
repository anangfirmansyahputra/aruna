import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import {
  Product,
  ProductFAQ,
  ProductRequirement,
  ProductTranslation,
} from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'

interface FormPageProps {
  data?: ProductRequirement
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

export default function FormPage({ data, products }: FormPageProps) {
  const { permissions } = usePage().props
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const breadcrumbs = ['Dashboard', 'Requirement', data ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/product-requirements/${data.id}`
      : `/dashboard/product-requirements`,
    method: data ? 'put' : 'post',
  })

  const handleSubmit = async () => {
    try {
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
    } catch (err: any) {
      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
    setIsEdit(null)
    setNewItem('')
  }

  const handleOk = () => {
    setIsModalOpen(false)
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

  const handleCancel = () => {
    setIsEdit(null)
    setIsModalOpen(false)
    setNewItem('')
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create FAQ" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>FAQ Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2 gap-5">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Tabs onChange={(e) => setLang(e as 'id' | 'en')}>
              {['id', 'en'].map((locale) => (
                <TabPane key={locale} tab={locale.toUpperCase()} forceRender>
                  <Form.Item
                    name="product_id"
                    label="Product"
                    rules={[{ required: true, message: 'Select product' }]}
                  >
                    <Select
                      showSearch
                      options={products.map((product) => ({
                        label: product.translations[0].name,
                        value: product.id,
                      }))}
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name={`${locale}_title`}
                    label="Title"
                    rules={[{ required: true, message: 'Enter title' }]}
                  >
                    <Input placeholder="Enter title" />
                  </Form.Item>
                </TabPane>
              ))}
            </Tabs>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/product-requirements')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data
                  ? 'product-requirements.update'
                  : 'product-requirements.store'
              ) && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>

          <Card
            title="Requirement items"
            extra={
              <div className="flex items-center justify-end">
                <Button type="primary" onClick={showModal}>
                  Add item
                </Button>
              </div>
            }
          >
            <List
              dataSource={items[lang as 'id' | 'en']}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a
                      key="list-loadmore-edit"
                      onClick={() => {
                        setIsEdit(index)
                        setIsModalOpen(true)
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
          </Card>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
      </div>
    </DashboardLayout>
  )
}
