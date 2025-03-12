import { Menu as MenuType } from '@/types'
import * as Icons from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { router, usePage } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu,
  message,
  Popover,
  Space,
  theme,
  Typography,
} from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import Logo from '../../../public/assets/logo.png'

const { Text } = Typography

interface DashboardLayoutProps {
  children: ReactNode
  breadcrumbs: string[]
  removeBg?: boolean
}

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const DashboardLayout = ({
  children,
  breadcrumbs,
  removeBg = false,
}: DashboardLayoutProps) => {
  const { auth, menus, flash } = usePage().props

  if (!auth || !menus) {
    router.get('/login')
  }

  const groupedMenus = (menus as MenuType[]).reduce<Record<string, MenuType[]>>(
    (acc, menu) => {
      if (!acc[menu.group]) {
        acc[menu.group] = []
      }
      acc[menu.group].push(menu)
      return acc
    },
    {}
  )

  const keys = Object.keys(groupedMenus)

  const items = keys.map((key) => {
    const childrens = groupedMenus[key] as MenuType[]
    const IconComponent = Icons[childrens[0].icon as keyof typeof Icons]

    // Jika tidak ada anak, maka langsung return tanpa children
    if (childrens.length === 1) {
      return getItem(
        childrens[0].name,
        childrens[0].path,
        React.createElement(IconComponent as any)
      )
    }

    return getItem(
      key,
      childrens[0].path,
      null,
      childrens.map((c) => {
        const IconComponent = Icons[c.icon as keyof typeof Icons]
        return getItem(
          c.name,
          c.path,
          IconComponent ? React.createElement(IconComponent as any) : null
        )
      })
    )
  })

  console.log(items)

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const currentPath = window.location.pathname
    .replace('/create', '')
    .replace(/\/\d+\/edit$/, '')

  const handleLogout = () => {
    router.delete('/logout', {
      onSuccess: () => {
        localStorage.removeItem('openKeys')
        message.success('Logout success')
      },
      onError: (error) => {
        console.log(error)
        message.error('Internal server error')
      },
    })
  }

  useEffect(() => {
    if ((flash as { error: string }).error) {
      message.error((flash as { error: string }).error)
    }
  }, [flash])

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('openKeys') || '[]')
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('openKeys', JSON.stringify(openKeys))
    }
  }, [openKeys])

  const handleMenuClick = ({ key }: { key: string }) => {
    router.get(key)
  }

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={siderStyle}
        breakpoint="lg"
        theme="dark"
        collapsedWidth="0"
        // collapsible
        // collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <img src={Logo} className="mx-auto p-5" />
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          selectedKeys={[currentPath]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="!px-5 flex justify-center items-center"
          style={{
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Popover
            content={
              <Space direction="vertical">
                <Text>Admin</Text>
                <Button
                  onClick={handleLogout}
                  type="link"
                  danger
                  icon={<UserOutlined />}
                >
                  Logout
                </Button>
              </Space>
            }
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                marginLeft: 'auto',
              }}
            />
          </Popover>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: removeBg ? 0 : 24,
              height: '100%',
              background: removeBg ? '' : colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
