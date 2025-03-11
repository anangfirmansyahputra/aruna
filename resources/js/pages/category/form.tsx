import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Category } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button, Divider, Form, Input, Space, Typography } from 'antd'

interface FormPageProps {
  category?: Category
}

export default function FormPage({ category }: FormPageProps) {
  const { permissions } = usePage().props

  const breadcrumbs = ['Dashboard', 'Category', category ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: category,
    url: category
      ? `/dashboard/categories/${category.id}`
      : `/dashboard/categories`,
    method: category ? 'put' : 'post',
  })

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />

      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Category Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
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
              {checkPermission(
                permissions as string[],
                category ? 'categories.update' : 'categories.store'
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
