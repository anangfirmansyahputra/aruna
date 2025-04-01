import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { InboxOutlined } from '@ant-design/icons'
import {
  Product,
  ProductFeature,
  ProductTranslation,
  TeamProfile,
} from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Select,
  Space,
  Tabs,
  Typography,
  UploadFile,
  UploadProps,
} from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import * as LucideIcons from 'lucide-react'

import React, { useEffect, useState } from 'react'

interface FormPageProps {
  data?: TeamProfile
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function FormPage({ data }: FormPageProps) {
  const { permissions } = usePage().props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/team-profiles/${data.id}`
      : `/dashboard/team-profiles`,
    method: data ? 'put' : 'post',
  })

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      const values = await form.validateFields()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image_url', fileList[0].originFileObj)
      }

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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const uploadProps: UploadProps = {
    name: 'image_url',
    multiple: false,
    beforeUpload: () => false,
    accept: 'image/*',
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    maxCount: 1,
    listType: 'picture',
  }

  useEffect(() => {
    if (data?.image_url) {
      setFileList([
        {
          uid: '-1',
          name: 'product-image',
          status: 'done',
          url: data.image_url,
        },
      ])
    }
  }, [data])

  return (
    <DashboardLayout
      breadcrumbs={['Dashboard', 'Team Profile', data ? 'Update' : 'Create']}
    >
      <Head title="Create Team Profile" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Team Profile Form</Typography.Title>
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
                    name={`name`}
                    label="Name"
                    rules={[{ required: true, message: 'Please enter name' }]}
                  >
                    <Input />
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
                    label="Image"
                    name="image_url"
                    // rules={[{ required: true, message: 'Please insert 1 image' }]}
                  >
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for single or bulk upload. Do not upload
                        prohibited files.
                      </p>
                    </Dragger>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/team-profiles')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'team-profiles.update' : 'team-profiles.store'
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
