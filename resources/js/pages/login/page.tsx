import { Button, Card, Form, Input, Typography } from 'antd'
import { Building2, Lock, Mail } from 'lucide-react'
import Logo from '../../../../public/assets/logo.png'
import { useFormHandler } from '@/hooks/use-form-handler'
import { Head } from '@inertiajs/react'

const { Title, Text } = Typography

export default function LoginPage() {
  const { form, isLoading, submit } = useFormHandler({
    url: '/login',
    method: 'post',
    initialValues: {
      email: '',
      password: '',
    },
  })

  return (
    <>
      <Head title="Login" />

      <div className="min-h-screen flex">
        {/* Left side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80"
            alt="Modern bank building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
            <div className="text-white text-center px-8">
              {/* <Building2 size={64} className="mx-auto mb-6" />
            <Title level={1} style={{ color: 'white', marginBottom: '1rem' }}>
              BPR Bank
            </Title> */}
              {/* <Text className="text-gray-200 text-lg">
              Trusted Banking Partner for Your Financial Journey
            </Text> */}
              <img src={Logo} />
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
          <Card
            className="w-full max-w-[420px] shadow-lg"
            style={{
              background: 'white',
            }}
          >
            <div className="text-center mb-8">
              <Title level={2} className="!mb-2">
                Welcome Back
              </Title>
              <Text type="secondary">Please sign in to continue</Text>
            </div>

            <Form
              disabled={isLoading}
              form={form}
              name="login"
              layout="vertical"
              size="large"
              className="space-y-4"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  prefix={<Mail className="mr-2 text-gray-400" size={20} />}
                  placeholder="Email Address"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  prefix={<Lock className="mr-2 text-gray-400" size={20} />}
                  placeholder="Password"
                  className="rounded-lg"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Text className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    Forgot password?
                  </Text>
                </Form.Item>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                style={{ borderRadius: '8px' }}
                onClick={() => submit()}
              >
                Sign In
              </Button>
            </Form>

            <div className="text-center mt-6">
              <Text type="secondary">
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Contact your branch
                </a>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
