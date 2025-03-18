import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Category } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from 'antd'
import { useEffect } from 'react'

interface FormPageProps {
  data?: Category
}

const generateForm = (locale: 'ID' | 'EN') => {
  return (
    <>
      <Form.Item
        name={`${locale}__name`}
        label="Name"
        rules={[{ required: true, message: 'Please enter a category name' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item name={`${locale}__description`} label="Description">
        <Input.TextArea rows={5} />
      </Form.Item>
    </>
  )
}

export default function FormPage({ data }: FormPageProps) {
  const { permissions } = usePage().props

  const breadcrumbs = ['Dashboard', 'Category', data ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data ? `/dashboard/categories/${data.id}` : `/dashboard/categories`,
    method: data ? 'put' : 'post',
  })

  const tabs: TabsProps['items'] = [
    {
      key: 'ID',
      label: 'ID',
      children: generateForm('ID'),
      forceRender: true,
    },
    {
      key: 'EN',
      label: 'EN',
      children: generateForm('EN'),
      forceRender: true,
    },
  ]

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      const locales = ['ID', 'EN']

      const translations = locales.map((locale) => {
        const translation: Record<string, any> = {
          language_code: locale,
        }

        Object.keys(values).forEach((key) => {
          if (key.startsWith(`${locale}__`)) {
            const fieldName = key.replace(`${locale}__`, '')
            translation[fieldName] = values[key]
          }
        })

        return translation
      })

      const payload = {
        translations,
      }

      submit(null, payload)
    } catch (err: any) {
      if (err?.errorFields) {
        message.error(err.errorFields[0].errors[0])
      } else {
        message.error('An unexpected error occurred')
      }
    }
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Category Form</Typography.Title>
        <Divider />

        <div className="grid lg:grid-cols-2">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Tabs items={tabs} />

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/categories')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'categories.update' : 'categories.store'
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
