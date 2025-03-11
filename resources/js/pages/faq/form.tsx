import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Product, ProductFAQ } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button, Divider, Form, Input, Select, Space, Typography } from 'antd'

interface FormPageProps {
  faq?: ProductFAQ
  products: Product[]
}

export default function FormPage({ faq, products }: FormPageProps) {
  const { permissions } = usePage().props

  const breadcrumbs = ['Dashboard', 'FAQ', faq ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: faq,
    url: faq ? `/dashboard/faqs/${faq.id}` : `/dashboard/faqs`,
    method: faq ? 'put' : 'post',
  })

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create FAQ" />

      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>FAQ Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="product_id"
              label="Product"
              rules={[{ required: true, message: 'Select product' }]}
            >
              <Select
                showSearch
                options={products.map((product) => ({
                  label: product.name,
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
              name="question"
              label="Question"
              rules={[{ required: true, message: 'Enter question' }]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>

            <Form.Item name="answer" label="Answer">
              <Input.TextArea rows={5} />
            </Form.Item>

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
                <Button type="primary" onClick={() => submit()}>
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
