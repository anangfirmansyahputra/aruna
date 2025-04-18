import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import {
  DepositoInfo,
} from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Space,
  Tabs,
  Typography,
} from 'antd'

import { useEffect, useState } from 'react'
import Tiptap from '@/components/tiptap'

interface FormPageProps {
  data?: DepositoInfo
}

export default function FormPage({ data }: FormPageProps) {
  const { permissions } = usePage().props
  const [content, setContent] = useState(
    data
      ? {
          id: data.id_content,
          en: data.en_content,
        }
      : {
          id: '',
          en: '',
        }
  )

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/deposito-info/${data.id}`
      : `/dashboard/deposito-info`,
    method: data ? 'put' : 'post',
  })

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      const values = await form.validateFields()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      submit(formData)
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
      breadcrumbs={['Dashboard', 'Deposito Info', data ? 'Update' : 'Create']}
    >
      <Head title="Create Deposito Info" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Deposito Info Form</Typography.Title>
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
                    name={`${locale}_title`}
                    label="Title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name={`${locale}_content`} label="Content">
                    <Tiptap
                      content={content[locale as 'id' | 'en']}
                      setContent={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          [locale as 'id' | 'en']: e,
                        }))
                      }
                    />
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/deposito-info')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'deposito-info.update' : 'deposito-info.store'
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
