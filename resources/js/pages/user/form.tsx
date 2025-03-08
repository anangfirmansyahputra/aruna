import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Role, User } from '@/types'
import { Head, router } from '@inertiajs/react'
import { Button, Divider, Form, Input, Select, Space, Typography } from 'antd'
import { JSX } from 'react'

const breadcrumbs = ['Dashboard', 'user', 'Create']

interface FormPageProps {
  user?: User
  roles: Role[]
}

export default function FormPage({ user, roles }: FormPageProps) {
  const { form, submit, isLoading } = useFormHandler({
    initialValues: user,
    url: user ? `/dashboard/users/${user.id}` : `/dashboard/users`,
    method: user ? 'put' : 'post',
  })

  return (
    <>
      <Head title="Create User" />

      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>User Form</Typography.Title>
        <Divider />

        <div className="grid grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter a user name' }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input placeholder="Enter a email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              name="role_id"
              label="Role"
              rules={[{ required: true, message: 'Please select role' }]}
            >
              <Select
                options={roles.map((role) => ({
                  label: role.name,
                  value: role.id,
                }))}
              />
            </Form.Item>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/users')}
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
