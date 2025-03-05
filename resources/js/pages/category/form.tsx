import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Category } from '@/types'
import { Head, router } from '@inertiajs/react'
import { Button, Divider, Form, Input, Space, Typography } from 'antd'
import { JSX } from 'react'

const breadcrumbs = ['Dashboard', 'Category', 'Create']

interface FormPageProps {
  category?: Category
}

export default function FormPage({ category }: FormPageProps) {
  const { form, submit, isLoading } = useFormHandler({
    initialValues: category,
    url: category
      ? `/dashboard/categories/${category.id}`
      : `/dashboard/categories`,
    method: category ? 'put' : 'post',
    // name: 'category',
  })

  return (
    <>
      <Head title="Create Category" />

      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Category Form</Typography.Title>
        <Divider />

        <div className="grid grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Please enter a category name' },
              ]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={5} />
            </Form.Item>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/categories')}
                type="default"
              >
                Cancel
              </Button>
              <Button type="primary" onClick={() => submit()}>
                Submit
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </>
  )
}

FormPage.layout = (page: JSX.Element) => (
  <DashboardLayout removeBg={true} breadcrumbs={breadcrumbs}>
    {page}
  </DashboardLayout>
)
