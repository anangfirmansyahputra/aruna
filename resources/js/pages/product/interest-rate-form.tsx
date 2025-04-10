import { useFormHandler } from '@/hooks/use-form-handler'
import { checkPermission } from '@/lib/permission'
import { InterestRate } from '@/types'
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
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface InterestRateFormProps {
  permissions: string[]
  interests: InterestRate[]
  productId?: number
}

export default function InterestRateForm({
  permissions,
  interests,
  productId,
}: InterestRateFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<InterestRate | null>(null)

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/interest-rates/${data.id}`
      : `/dashboard/interest-rates`,
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
      router.delete(`/dashboard/interest-rates/${id}`, {
        preserveScroll: true,
      })
      message.success('Action success')
    } catch (err: any) {
      message.error('Internal server error')
    }
  }

  const handleEdit = (record: InterestRate) => {
    setData(record)
    showModal()
    form.setFieldsValue(record)
  }

  const columns: TableProps<InterestRate>['columns'] = [
    {
      title: 'Tenor',
      dataIndex: 'tenor',
      key: 'tenor',
      width: 200,
      render: (_, record) => <div>{record.tenor} Month</div>,
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      width: 200,
      render: (_, record) => <div>{record.interest}%</div>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,

      render: (_, record) => (
        <Space>
          {checkPermission(permissions, 'interest-rates.edit') && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          )}

          {checkPermission(
            permissions as string[],
            'interest-rates.destroy'
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
    <div>
      <div className="flex items-center justify-between mb-5">
        <Typography.Title level={4}>Interest Rate</Typography.Title>
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
        dataSource={interests}
        scroll={{
          x: 'max-content',
        }}
      />

      <Modal
        title="Interest Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item
          name={`product_id`}
          style={{
            display: 'none',
          }}
        >
          <Input value={productId} />
        </Form.Item>
        <Form disabled={isLoading} form={form} layout="vertical">
          <Form.Item
            name="tenor"
            label="Tenor"
            rules={[{ required: true, message: 'Please enter tenor' }]}
          >
            <Input addonAfter="Month" type="number" placeholder="0" />
          </Form.Item>

          <Form.Item
            name="interest"
            label="Interest"
            rules={[{ required: true, message: 'Please enter interest' }]}
          >
            <Input addonAfter="%" placeholder="0" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
