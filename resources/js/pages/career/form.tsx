import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Career } from '@/types'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tabs,
  Typography,
} from 'antd'
import { useState } from 'react'

interface FormPageProps {
  data?: Career
}

export default function FormPage({ data }: FormPageProps) {
  const { permissions } = usePage().props
  const [newRequirement, setNewRequirement] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data ? `/dashboard/careers/${data.id}` : `/dashboard/careers`,
    method: data ? 'put' : 'post',
  })

  const [items, setItems] = useState<{
    en: string[]
    id: string[]
  }>(
    data
      ? {
          en: JSON.parse(data.en_requirement) as string[],
          id: JSON.parse(data.id_requirement) as string[],
        }
      : {
          en: [],
          id: [],
        }
  )

  const showModal = () => {
    setIsEdit(null)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (isEdit !== null) {
      setItems((prev) => ({
        ...prev,
        [lang]: prev[lang].map((item, index) => {
          if (index === isEdit) {
            return newRequirement
          } else {
            return item
          }
        }),
      }))
    } else {
      setItems((prev) => ({
        ...prev,
        [lang]: [...prev[lang], newRequirement],
      }))
    }
    setNewRequirement(null)
    setIsModalOpen(false)
    setIsEdit(null)
  }

  const handleCancel = () => {
    setNewRequirement(null)
    setIsModalOpen(false)
    setIsEdit(null)
  }

  const handleSubmit = async () => {
    try {
      await form.validateFields()

      if (items.en.length === 0 || items.id.length === 0) {
        message.error('Please enter at least 1 requirement for each language')
        return
      }

      submit(null, {
        ...form.getFieldsValue(),
        id_requirement: JSON.stringify(items.id),
        en_requirement: JSON.stringify(items.en),
      })
    } catch (err: any) {
      console.log(err)

      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  const handleEdit = async (index: number, lang: 'id' | 'en') => {
    showModal()
    setIsEdit(index)
    const newText = items[lang].find((_, i) => i === index) || null
    setNewRequirement(newText)
  }

  const handleDelete = (index: number, lang: 'id' | 'en') => {
    setItems((prev) => ({
      ...prev,
      [lang]: prev[lang].filter((_, i) => i !== index),
    }))
  }

  const columns: TableProps<{
    id: number
    text: string
    lang: 'id' | 'en'
  }>['columns'] = [
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id, record.lang)}
          />

          <Popconfirm
            title="Delete the category"
            description="Are yoy sure to delete this data?"
            onConfirm={() => handleDelete(record.id, record.lang)}
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
    <DashboardLayout
      breadcrumbs={['Dashboard', 'Career', data ? 'Update' : 'Create']}
    >
      <Head title={data ? 'Update Career' : 'Create Career'} />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Career Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Tabs activeKey={lang} onChange={(e) => setLang(e as 'id' | 'en')}>
              {['id', 'en'].map((locale) => (
                <Tabs.TabPane
                  key={locale}
                  tab={locale.toUpperCase()}
                  forceRender
                >
                  <Form.Item
                    name={`${locale}_title`}
                    label="Title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <div className="space-y-5 mb-5">
              <div className="flex items-center justify-between">
                <p>Requirement</p>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={showModal}
                />
              </div>
              <Table
                dataSource={items[lang].map((item, index) => ({
                  text: item,
                  id: index,
                  lang,
                }))}
                columns={columns}
              />
            </div>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/careers')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'careers.update' : 'careers.store'
              ) && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>
        </div>

        <Modal
          title="Requirement Form"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Text">
              <Input
                value={newRequirement as string}
                onChange={(e) => setNewRequirement(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
