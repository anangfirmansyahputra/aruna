import React, { act, useState } from 'react'
import { Card, Checkbox, Col, Form, Row, Typography, Button, Space } from 'antd'
import { Shield, ShieldCheck } from 'lucide-react'
import { Permission } from '@/types/index'

interface PermissionFormProps {
  permissions: Permission[]
  selectedPermissions: number[]
  setSelectedPermissions: React.Dispatch<React.SetStateAction<number[]>>
}

function formatPermissionName(permission: string) {
  const words = permission.split('.')
  const name = words[0]
  let action = words[1]

  switch (action) {
    case 'index':
      action = ' View'
      break
    case 'create':
      action = ' Create'
      break
    case 'store':
      action = ' Store'
      break
    case 'show':
      action = ' Show'
      break
    case 'edit':
      action = ' Edit'
      break
    case 'update':
      action = ' Update'
      break
    case 'destroy':
      action = ' Delete'
      break
    default:
      action = ''
  }

  return String(name[0]).toUpperCase() + String(name).slice(1) + action
}

export default function PermissionForm({
  permissions,
  selectedPermissions,
  setSelectedPermissions,
}: PermissionFormProps) {
  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      const words = permission.name.includes('.')
        ? permission.name.split('.')
        : permission.name
      if (words.length < 2) return acc

      const category = permission.name.includes('.')
        ? words[0]
        : (words as string[])
      if (!acc[category as string]) acc[category as string] = []
      acc[category as string].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>
  )

  const sortedGroupedPermissions = Object.fromEntries(
    Object.entries(groupedPermissions).sort((a, b) => b[1].length - a[1].length)
  )

  const handleCheckboxChange = (category: string, checkedValues: number[]) => {
    const otherCategories = Object.entries(groupedPermissions)
      .filter(([key]) => key !== category)
      .flatMap(([, perms]) => perms.map((p) => p.id))

    const currentSelected = selectedPermissions.filter((id) =>
      otherCategories.includes(id)
    )
    setSelectedPermissions([...currentSelected, ...checkedValues])
  }

  const handleSelectAll = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map((p) => p.id)
    const otherSelected = selectedPermissions.filter(
      (id) => !categoryPermissions.includes(id)
    )
    setSelectedPermissions([...otherSelected, ...categoryPermissions])
  }

  const handleUnselectAll = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map((p) => p.id)
    setSelectedPermissions(
      selectedPermissions.filter((id) => !categoryPermissions.includes(id))
    )
  }

  return (
    <Card
      title={
        <Space>
          <Shield className="text-blue-600" size={20} />
          <span>Permission Settings</span>
        </Space>
      }
      style={{
        marginTop: 20,
      }}
    >
      <Form layout="vertical">
        <Row gutter={[24, 24]}>
          {Object.entries(sortedGroupedPermissions).map(([category, perms]) => (
            <Col
              style={{
                width: '100%',
              }}
              sm={24}
              xl={8}
              key={category}
            >
              <Card
                size="small"
                title={
                  <div className="flex items-center justify-between">
                    <Typography.Title
                      level={5}
                      style={{ margin: 0 }}
                      className="capitalize"
                    >
                      {category}
                    </Typography.Title>
                    <div className="lg:block hidden">
                      <Space>
                        <Button
                          size="small"
                          type="text"
                          onClick={() => handleSelectAll(category)}
                        >
                          Select All
                        </Button>
                        <Button
                          size="small"
                          type="text"
                          onClick={() => handleUnselectAll(category)}
                        >
                          Unselect All
                        </Button>
                      </Space>
                    </div>
                  </div>
                }
                className="bg-gray-50"
              >
                <Checkbox.Group
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                  value={selectedPermissions}
                  onChange={(checkedValues) =>
                    handleCheckboxChange(category, checkedValues as number[])
                  }
                >
                  {perms.map((perm) => (
                    <Checkbox key={perm.id} value={perm.id}>
                      <Space>
                        <ShieldCheck size={16} className="text-gray-500" />
                        {formatPermissionName(perm.name)}
                        {/* {perm.name} */}
                      </Space>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Card>
            </Col>
          ))}
        </Row>
      </Form>
    </Card>
  )
}
