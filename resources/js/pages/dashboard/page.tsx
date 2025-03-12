import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { Card, Col, Layout, Row, Statistic, Table, Typography } from 'antd'
import {
  BanknoteIcon as BanknotesIcon,
  PiggyBankIcon,
  TrendingUpIcon,
  Users2Icon,
} from 'lucide-react'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  // Sample data for the dashboard
  const stats = [
    {
      title: 'Total Products',
      value: 12,
      icon: <BanknotesIcon className="h-8 w-8 text-blue-600" />,
      prefix: '',
    },
    {
      title: 'Active Customers',
      value: 2584,
      icon: <Users2Icon className="h-8 w-8 text-green-600" />,
      prefix: '',
    },
    {
      title: 'Total Deposits',
      value: 15789000000,
      icon: <PiggyBankIcon className="h-8 w-8 text-purple-600" />,
      prefix: 'Rp',
    },
    {
      title: 'Total Loans',
      value: 12450000000,
      icon: <TrendingUpIcon className="h-8 w-8 text-orange-600" />,
      prefix: 'Rp',
    },
  ]

  const products = [
    {
      key: '1',
      name: 'Tabungan Sejahtera',
      type: 'Savings',
      customers: 1245,
      totalValue: 'Rp 5.2B',
    },
    {
      key: '2',
      name: 'Kredit Modal Usaha',
      type: 'Business Loan',
      customers: 456,
      totalValue: 'Rp 8.7B',
    },
    {
      key: '3',
      name: 'Deposito Plus',
      type: 'Time Deposit',
      customers: 789,
      totalValue: 'Rp 4.1B',
    },
    {
      key: '4',
      name: 'Kredit Mikro',
      type: 'Micro Loan',
      customers: 912,
      totalValue: 'Rp 2.9B',
    },
  ]

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Active Customers',
      dataIndex: 'customers',
      key: 'customers',
    },
    {
      title: 'Total Value',
      dataIndex: 'totalValue',
      key: 'totalValue',
    },
  ]

  return (
    <DashboardLayout breadcrumbs={['Dashboard']}>
      <Head title="Dashboard" />
      <Typography.Title
        level={4}
        style={{
          marginBottom: 20,
        }}
      >
        Dashboard
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <Statistic
                    value={stat.value}
                    prefix={stat.prefix}
                    valueStyle={{ color: '#1890ff' }}
                    formatter={(value) =>
                      new Intl.NumberFormat('id-ID').format(value as number)
                    }
                  />
                </div>
                {stat.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        className="mt-6"
        style={{
          marginTop: 20,
        }}
      >
        <Title level={5}>Product Performance</Title>
        <Table
          dataSource={products}
          columns={columns}
          pagination={false}
          className="mt-4"
        />
      </Card>
    </DashboardLayout>
  )
}

export default App
