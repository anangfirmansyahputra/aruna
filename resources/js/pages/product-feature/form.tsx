import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Product, ProductFeature, ProductTranslation } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd'
import * as LucideIcons from 'lucide-react'

import React from 'react'

interface FormPageProps {
  data?: ProductFeature
  products: (Product & { translations: ProductTranslation[] })[]
}

export default function FormPage({ data, products }: FormPageProps) {
  const { permissions } = usePage().props

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/product-features/${data.id}`
      : `/dashboard/product-features`,
    method: data ? 'put' : 'post',
  })

  const iconOptions = Object.entries(LucideIcons)
    .filter(
      // @ts-ignore
      ([_, Component]) => typeof Component === 'object' && Component?.render
    ) // Pastikan hanya mengambil komponen valid
    .map(([iconName, IconComponent]) => ({
      label: (
        <div className="flex items-center gap-2">
          {React.createElement(IconComponent as React.ElementType, {
            size: 16,
          })}
          <span>{iconName}</span>
        </div>
      ),
      value: iconName,
    }))

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      submit()
    } catch (err: any) {
      console.log(err)

      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  return (
    <DashboardLayout
      breadcrumbs={['Dashboard', 'Product Feature', data ? 'Update' : 'Create']}
    >
      <Head title="Create Product Feature" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Product Feature Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Tabs>
              {['id', 'en'].map((locale) => (
                <Tabs.TabPane
                  key={locale}
                  tab={locale.toUpperCase()}
                  forceRender
                >
                  <Form.Item
                    name="product_id"
                    label="Product"
                    rules={[{ required: true, message: 'Select product' }]}
                  >
                    <Select
                      showSearch
                      options={products.map((product) => ({
                        label: product.translations[0].name,
                        value: product.id,
                      }))}
                      onChange={(e) => form.setFieldValue('product_id', e)}
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name={`${locale}_title`}
                    label="Title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name={`${locale}_description`}
                    label="Description"
                    rules={[
                      { required: true, message: 'Please enter description' },
                    ]}
                  >
                    <Input.TextArea rows={5} />
                  </Form.Item>

                  <Form.Item
                    name="icon"
                    label="Icon"
                    rules={[{ required: true, message: 'Select an icon' }]}
                  >
                    <Select
                      showSearch
                      options={iconOptions}
                      filterOption={(input, option) =>
                        (option?.value ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/product-features')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'product-features.update' : 'product-features.store'
              ) && (
                <Button type="primary" onClick={handleSubmit}>
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
