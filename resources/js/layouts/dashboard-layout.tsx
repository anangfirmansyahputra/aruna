import {
  PieChartOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons'
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
import React, { ReactNode, useState } from 'react'
import Logo from '../../../public/assets/logo.png'
import { Menu as MenuType } from '@/types'
import * as Icons from '@ant-design/icons'

const iconsMap: any = Icons

const { Title, Text } = Typography

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
  const { auth, menus } = usePage().props

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
        message.success('Logout success')
      },
      onError: (error) => {
        console.log(error)
        message.error('Internal server error')
      },
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <img src={Logo} className="mx-auto p-5" />
        <Menu
          onClick={({ key }) => {
            router.get(key)
          }}
          theme="dark"
          selectedKeys={[currentPath]} // Set active menu sesuai halaman
          mode="inline"
          items={items} // Tambahkan items ke Menu
        />
      </Sider>
      <Layout>
        <Header
          className="!px-5 flex justify-center items-center"
          style={{ background: colorBgContainer }}
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
