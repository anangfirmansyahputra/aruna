import { Menu as MenuType } from '@/types'
import * as Icons from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { router, usePage } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Breadcrumb,
  Button,
  Drawer,
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

  const [openKeys, setOpenKeys] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('openKeys') || ''
    }
    return ''
  })

  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('selectedKeys') || '[]')
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('openKeys', openKeys)
  }, [openKeys])

  useEffect(() => {
    localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys))
  }, [selectedKeys])

  if (!auth || !menus) {
    router.get('/login')
  }

  const groupedMenus = (menus as MenuType[])
    .filter((menu) => !menu.submenu)
    .reduce<Record<string, MenuType[]>>((acc, menu) => {
      if (!acc[menu.group]) {
        acc[menu.group] = []
      }
      acc[menu.group].push(menu)
      return acc
    }, {})

  const keys = Object.keys(groupedMenus)

  const items = keys.map((key, index) => {
    const childrens = groupedMenus[key] as MenuType[]
    const IconComponent = Icons[childrens[0]?.icon as keyof typeof Icons]

    // Jika tidak ada anak, maka langsung return tanpa children
    if (childrens.length === 1) {
      return getItem(
        childrens[0].name,
        childrens[0]?.path,
        IconComponent ? React.createElement(IconComponent as any) : null
      )
    }

    return getItem(
      key,
      `${childrens[0].name}`,
      null,
      childrens.map((c) => {
        const IconComponent = Icons[c.icon as keyof typeof Icons]

        const submenu = (menus as MenuType[]).filter(
          (menu) => menu.submenu === c.name
        )

        if (submenu.length > 0) {
          return getItem(
            c.name,
            c.path,
            IconComponent ? React.createElement(IconComponent as any) : null,
            submenu.map((menu) => getItem(menu.name, menu.path))
          )
        } else {
          return getItem(
            c.name,
            c.path,
            IconComponent ? React.createElement(IconComponent as any) : null
          )
        }
      })
    )
  })

  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setOpen(false)

    setOpenKeys(e.key)

    localStorage.setItem('openKeys', e.key)

    router.get(e.key, {}, { preserveState: true })
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

  const [open, setOpen] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className="lg:block hidden"
        style={siderStyle}
        breakpoint="lg"
        theme="dark"
        collapsedWidth="80"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <img src={Logo} className="mx-auto p-5" />
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          defaultOpenKeys={selectedKeys}
          defaultSelectedKeys={[openKeys]}
          onOpenChange={(e) => {
            setSelectedKeys(e)
          }}
          mode="inline"
          items={items}
        />
      </Sider>

      {collapsed && (
        <Drawer
          title="Menu"
          placement="left"
          closable
          onClose={() => setOpen(false)}
          open={open}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <Menu
            onClick={handleMenuClick}
            defaultOpenKeys={selectedKeys}
            defaultSelectedKeys={[openKeys]}
            onOpenChange={(e) => {
              setSelectedKeys(e)
            }}
            mode="inline"
            items={items}
          />
        </Drawer>
      )}

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
          {collapsed && (
            <Button
              type="text"
              icon={<Icons.MenuOutlined />}
              onClick={() => setOpen(true)}
              className="p-3"
            />
          )}
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
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={breadcrumbs.map((breadcrumb) => ({
              title: breadcrumb,
            }))}
          />
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
