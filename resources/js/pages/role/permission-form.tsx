import React, { useState } from 'react'
import { Card, Checkbox, Col, Form, Row, Typography, Button, Space } from 'antd'
import { Shield, ShieldCheck } from 'lucide-react'
import { Permission } from '@/types/index'

interface PermissionFormProps {
  permissions: Permission[]
  selectedPermissions: number[]
  setSelectedPermissions: React.Dispatch<React.SetStateAction<number[]>>
}

export default function PermissionForm({
  permissions,
  selectedPermissions,
  setSelectedPermissions,
}: PermissionFormProps) {
  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      const words = permission.name.split(' ')
      if (words.length < 2) return acc

      const category = words[1]
      if (!acc[category]) acc[category] = []
      acc[category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>
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
          {Object.entries(groupedPermissions).map(([category, perms]) => (
            <Col span={8} key={category}>
              <Card
                size="small"
                title={
                  <div className="flex items-center justify-between">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {category}
                    </Typography.Title>
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
                        {perm.name}
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
