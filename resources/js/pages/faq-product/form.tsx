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
  message,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

interface FormPageProps {
  faq?: ProductFAQ
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

export default function FormPage({ faq, products }: FormPageProps) {
  const { permissions } = usePage().props

  console.log(faq)

  const breadcrumbs = ['Dashboard', 'FAQ', faq ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: faq,
    url: faq ? `/dashboard/product-faqs/${faq.id}` : `/dashboard/product-faqs`,
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
      <Head title={`${faq ? 'Update' : 'Create'} FAQ Product`} />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>FAQ Product Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
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

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/product-faqs')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                faq ? 'product-faqs.update' : 'product-faqs.store'
              ) && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  )
}
