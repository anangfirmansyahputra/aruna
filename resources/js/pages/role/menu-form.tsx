import { Menu } from '@/types'
import * as Icons from '@ant-design/icons'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'

interface MenuFormProps {
  menus: Menu[]
  selectedMenus: number[]
  setSelectedMenus: React.Dispatch<React.SetStateAction<number[]>>
}

export default function MenuForm({
  menus,
  selectedMenus,
  setSelectedMenus,
}: MenuFormProps) {
  const groupedMenus = menus.reduce(
    (acc, menu) => {
      if (!acc[menu.group]) acc[menu.group] = []
      acc[menu.group].push(menu)
      return acc
    },
    {} as Record<string, Menu[]>
  )

  const handleCheckboxChange = (group: string, checkedValues: number[]) => {
    const otherGroups = Object.entries(groupedMenus)
      .filter(([key]) => key !== group)
      .flatMap(([, items]) => items.map((m) => m.id))

    const currentSelected = selectedMenus.filter((id) =>
      otherGroups.includes(id)
    )
    setSelectedMenus([...currentSelected, ...checkedValues])
  }

  const handleSelectAll = (group: string) => {
    const groupMenus = groupedMenus[group].map((m) => m.id)
    const otherSelected = selectedMenus.filter((id) => !groupMenus.includes(id))
    setSelectedMenus([...otherSelected, ...groupMenus])
  }

  const handleUnselectAll = (group: string) => {
    const groupMenus = groupedMenus[group].map((m) => m.id)
    setSelectedMenus(selectedMenus.filter((id) => !groupMenus.includes(id)))
  }

  return (
    <Card
      title={
        <Space>
          <LayoutDashboard className="text-blue-600" size={20} />
          <span>Menu Configuration</span>
        </Space>
      }
    >
      <Form layout="vertical">
        <Row gutter={[24, 24]}>
          {Object.entries(groupedMenus).map(([group, items]) => (
            <Col span={8} key={group}>
              <Card
                size="small"
                title={
                  <div className="flex items-center justify-between">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {group}
                    </Typography.Title>
                    <Space>
                      <Button
                        size="small"
                        type="text"
                        onClick={() => handleSelectAll(group)}
                      >
                        Select All
                      </Button>
                      <Button
                        size="small"
                        type="text"
                        onClick={() => handleUnselectAll(group)}
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
                  value={selectedMenus}
                  onChange={(checkedValues) =>
                    handleCheckboxChange(group, checkedValues as number[])
                  }
                >
                  {items.map((menu) => (
                    <Checkbox key={menu.id} value={menu.id}>
                      <Tooltip title={`Path: ${menu.path}`}>
                        <Space>
                          {React.createElement(
                            Icons[menu.icon as keyof typeof Icons] as any
                          )}
                          <span>{menu.name}</span>
                        </Space>
                      </Tooltip>
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
