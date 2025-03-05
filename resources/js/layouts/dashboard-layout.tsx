import {
  PieChartOutlined,
  ReadOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'

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

const items = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Products', '/dashboard/products', <ShoppingOutlined />, [
    getItem('Category', '/dashboard/categories'),
    getItem('Product', '/dashboard/products'),
  ]),
  getItem('News', '/dashboard/news', <ReadOutlined />),
] as MenuItem[]

const DashboardLayout = ({
  children,
  breadcrumbs,
  removeBg = false,
}: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const currentPath = window.location.pathname
    .replace('/create', '')
    .replace(/\/\d+\/edit$/, '')

  console.log(currentPath)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <img src={Logo} className="mx-auto" /> */}
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
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
