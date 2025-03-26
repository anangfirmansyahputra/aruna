import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Product, ProductFAQ, ProductTranslation } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  List,
  message,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'

interface FormPageProps {
  faq?: ProductFAQ
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

export default function FormPage({ faq, products }: FormPageProps) {
  const { permissions } = usePage().props
  const [items, setItems] = React.useState({
    en: [],
    id: [],
  })

  const breadcrumbs = ['Dashboard', 'FAQ', faq ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: faq,
    url: faq ? `/dashboard/faqs/${faq.id}` : `/dashboard/faqs`,
    method: faq ? 'put' : 'post',
  })

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      submit()
    } catch (err: any) {
      console.log(err)

      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create FAQ" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>FAQ Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2 gap-5">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Tabs>
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
                onClick={() => router.visit('/dashboard/faqs')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                faq ? 'faqs.update' : 'faqs.store'
              ) && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>

          <List
            header={
              <div className="flex items-center justify-end">
                <Button type="primary">Add item</Button>
              </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
