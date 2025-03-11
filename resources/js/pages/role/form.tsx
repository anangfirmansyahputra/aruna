import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Menu, Permission, Role } from '@/types'
import * as Icons from '@ant-design/icons'
import { Head, router } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  Space,
  TableProps,
  Typography,
} from 'antd'
import { useState } from 'react'
import MenuForm from './menu-form'
import PermissionForm from './permission-form'

interface FormPageProps {
  role?: Role
  menus: Menu[]
  permissions: Permission[]
  selectedMenus?: number[]
  selectedPermissions?: number[]
}

const iconsMap: any = Icons

const columns = (
  setListMenu: React.Dispatch<React.SetStateAction<Menu[]>>,
  isSelect?: boolean
): TableProps<Menu>['columns'] => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Group',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    render: (_, record) => {
      const IconComponent = iconsMap[record.icon]
      return (
        <div className="flex items-center gap-2">
          <IconComponent /> {record.icon}
        </div>
      )
    },
  },
  {
    title: 'Created date',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Button
          danger={!isSelect ? true : false}
          icon={isSelect ? <Icons.PlusOutlined /> : <Icons.DeleteOutlined />}
          onClick={() => {
            if (isSelect) {
              setListMenu((prev) => [...prev, record])
            } else {
              setListMenu((prev) => [
                ...prev.filter((item) => item.id !== record.id),
              ])
            }
          }}
        />
      </Space>
    ),
  },
]

export default function FormPage({
  role,
  menus,
  permissions,
  selectedMenus: userMenus,
  selectedPermissions: userPermissions,
}: FormPageProps) {
  const breadcrumbs = ['Dashboard', 'Role', role ? 'Update' : 'Create']
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
    userPermissions ?? []
  )
  const [selectedMenus, setSelectedMenus] = useState<number[]>(userMenus ?? [])

  const { form, submit, isLoading } = useFormHandler({
    initialValues: role,
    url: role ? `/dashboard/roles/${role.id}` : `/dashboard/roles`,
    method: role ? 'put' : 'post',
  })

  const handleSubmit = () => {
    submit(null, {
      ...form.getFieldsValue(),
      menus: selectedMenus,
      permissions: selectedPermissions,
    })
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title={role ? 'Update Role' : 'Create Role'} />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Role Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter a role name' }]}
            >
              <Input placeholder="Enter role name" />
            </Form.Item>
          </Form>
        </div>

        <MenuForm
          menus={menus}
          selectedMenus={selectedMenus}
          setSelectedMenus={setSelectedMenus}
        />

        <PermissionForm
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          permissions={permissions}
        />

        <Space className="mt-5">
          <Button
            onClick={() => router.visit('/dashboard/roles')}
            type="default"
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Space>
      </div>
    </DashboardLayout>
  )
}
