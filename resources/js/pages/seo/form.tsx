import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { SEO } from '@/types'
import { Head } from '@inertiajs/react'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Tabs,
  TabsProps,
  Typography,
} from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'

type TypeState = 'home' | 'about'

interface SeoFormProps {
  data: SEO[]
}

function FormComp({ type, data }: { type: string; data: SEO[] }) {
  const seo = data.find((d) => d.type === type)

  const { form, submit, isLoading } = useFormHandler({
    initialValues: seo,
    url: '/dashboard/seo',
    method: 'post',
  })

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      const payload = {
        ...form.getFieldsValue(),
        type,
      }

      submit(null, payload)
    } catch (err: any) {
      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="ID Title"
            required
            name="id_title"
            rules={[
              {
                required: true,
                message: 'Please enter title',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="EN Title"
            required
            name="en_title"
            rules={[
              {
                required: true,
                message: 'Please enter title',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="ID Keywords"
            required
            name="id_keywords"
            rules={[
              {
                required: true,
                message: 'Please enter keywords',
              },
            ]}
          >
            <Select mode="tags" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="EN Keywords"
            required
            name="en_keywords"
            rules={[
              {
                required: true,
                message: 'Please enter keywords',
              },
            ]}
          >
            <Select mode="tags" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="ID Meta Descriptions"
            required
            name="id_meta_descriptions"
            rules={[
              {
                required: true,
                message: 'Please enter meta descriptions',
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="EN Meta Descriptions"
            required
            name="en_meta_descriptions"
            rules={[
              {
                required: true,
                message: 'Please enter meta descriptions',
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

const types = [
  {
    key: 'home',
    label: 'Home Page',
  },
  {
    key: 'about',
    label: 'About Page',
  },
  {
    key: 'contact',
    label: 'Contact Page',
  },
  {
    key: 'product',
    label: 'Product Page',
  },
  {
    key: 'article',
    label: 'Article Page',
  },
  {
    key: 'career',
    label: 'Career Page',
  },
  {
    key: 'promo',
    label: 'Promo Page',
  },
  {
    key: 'proposal',
    label: 'Proposal Page',
  },
  {
    key: 'deposito',
    label: 'Deposito Page',
  },
  {
    key: 'faq',
    label: 'FAQ Page',
  },
]

const items = (data: SEO[]) => {
  return types.map((type) => ({
    key: type.key,
    label: type.label,
    children: <FormComp type={type.key} data={data} />,
  }))
}

export default function SeoForm({ data }: SeoFormProps) {
  const breadcrumbs = ['Dashboard', 'SEO']
  const [type, setType] = useState<TypeState>('home')

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title={'SEO'} />
      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>SEO Form</Typography.Title>
        <Divider />
        <Tabs
          defaultActiveKey={type}
          onChange={(e) => setType(e as TypeState)}
          items={items(data)}
        />
      </div>
    </DashboardLayout>
  )
}
