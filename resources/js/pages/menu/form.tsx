import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Menu } from '@/types'
import * as Icons from '@ant-design/icons' // Import semua ikon dari Ant Design
import { Head, router, usePage } from '@inertiajs/react'
import { Button, Divider, Form, Input, Select, Space, Typography } from 'antd'
import { JSX, useState } from 'react'

interface MenuFormPageProps {
  menu?: Menu
}

const breadcrumbs = ['Dashboard', 'Menu']

const iconsMap: any = Icons

const iconNames = Object.keys(iconsMap).filter((key) =>
  key.endsWith('Outlined')
)

export default function MenuFormPage({ menu }: MenuFormPageProps) {
  const { permissions } = usePage().props

  const { form, isLoading, submit } = useFormHandler({
    url: menu ? `/dashboard/menus/${menu.id}` : '/dashboard/menus',
    initialValues: menu,
    method: menu ? 'put' : 'post',
  })

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  return (
    <>
      <Head title="Menu" />
      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Menu Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter a menu name' }]}
            >
              <Input placeholder="Enter menu name" />
            </Form.Item>

            <Form.Item
              name="path"
              label="Path"
              rules={[
                {
                  required: true,
                  message: 'Enter path',
                },
              ]}
            >
              <Input disabled placeholder="ex. /dashboard/categories" />
            </Form.Item>

            <Form.Item
              name="icon"
              label="Select Icon"
              rules={[{ required: true, message: 'Please select an icon' }]}
            >
              <Select
                showSearch
                placeholder="Select an icon"
                optionFilterProp="children"
                onChange={(value) => setSelectedIcon(value)}
                filterOption={(input, option) =>
                  ((option?.label ?? '') as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {iconNames.map((iconName) => {
                  const IconComponent = iconsMap[iconName]
                  return (
                    <Select.Option
                      key={iconName}
                      value={iconName}
                      label={iconName}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent /> {iconName}
                      </div>
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item name="group" label="Group">
              <Input placeholder="ex. Product" />
            </Form.Item>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/menus')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(permissions as string[], 'menus.update') && (
                <Button type="primary" onClick={() => submit()}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>
        </div>
      </div>
    </>
  )
}

MenuFormPage.layout = (page: JSX.Element) => (
  <DashboardLayout breadcrumbs={breadcrumbs}>{page}</DashboardLayout>
)
