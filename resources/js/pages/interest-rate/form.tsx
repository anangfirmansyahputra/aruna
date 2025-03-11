import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { InterestRate, Product } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button, Divider, Form, Input, Select, Space, Typography } from 'antd'

interface FormPageProps {
  interestRate?: InterestRate
  products: Product[]
}

export default function FormPage({ interestRate, products }: FormPageProps) {
  const { permissions } = usePage().props

  const breadcrumbs = [
    'Dashboard',
    'Interest Rate',
    interestRate ? 'Update' : 'Create',
  ]

  const { form, submit, isLoading } = useFormHandler({
    initialValues: interestRate,
    url: interestRate
      ? `/dashboard/interest-rates/${interestRate.id}`
      : `/dashboard/interest-rates`,
    method: interestRate ? 'put' : 'post',
  })

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create interestRate" />

      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Interest Rate Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Form.Item
              name="product_id"
              label="Product"
              rules={[{ required: true, message: 'Select product' }]}
            >
              <Select
                showSearch
                options={products.map((product) => ({
                  label: product.name,
                  value: product.id,
                }))}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item
              name="tenor"
              label="Tenor"
              rules={[{ required: true, message: 'Please enter tenor' }]}
            >
              <Input suffix="Month" type="number" placeholder="0" />
            </Form.Item>

            <Form.Item
              name="interest"
              label="Interest"
              rules={[{ required: true, message: 'Please enter interest' }]}
            >
              <Input suffix="%" placeholder="0" />
            </Form.Item>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/interest-rates')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                interestRate ? 'interest-rates.update' : 'interest-rates.store'
              ) && (
                <Button type="primary" onClick={() => submit()}>
                  Submit
                </Button>
              )}
            </Space>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  )
}
