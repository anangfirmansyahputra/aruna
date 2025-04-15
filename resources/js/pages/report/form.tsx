import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Report } from '@/types'
import { InboxOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  DatePicker,
  Divider,
  Form,
  GetProp,
  Input,
  message,
  Space,
  Tabs,
  Typography,
  UploadFile,
  UploadProps,
} from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface FormPageProps {
  report?: Report
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function FormPage({ report }: FormPageProps) {
  const { permissions } = usePage().props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const breadcrumbs = ['Dashboard', 'Report', report ? 'Update' : 'Create']

  const { form, submit, isLoading } = useFormHandler({
    initialValues: report,
    url: report ? `/dashboard/reports/${report.id}` : `/dashboard/reports`,
    method: report ? 'put' : 'post',
  })

  useEffect(() => {
    if (report) {
      form.setFieldValue('year', dayjs(report?.year, 'YYYY'))
    }

    if (report?.file) {
      setFileList([
        {
          uid: '-1',
          name: 'report',
          status: 'done',
          url: report.file,
        },
      ])
    }
  }, [report])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,
    accept: 'application/pdf',
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    maxCount: 1,
    listType: 'text',
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      const formValues = form.getFieldsValue()
      await form.validateFields()

      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      formData.delete('year')
      formData.append('year', form.getFieldValue('year').year())

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj)
      }

      submit(formData)
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
      <Head title="Create Report" />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Report Form</Typography.Title>
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
                    rules={[{ required: true, message: 'Enter title' }]}
                  >
                    <Input placeholder="Enter title" />
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: 'Select year' }]}
            >
              <DatePicker picker="year" format="YYYY" />
            </Form.Item>

            <Form.Item
              label="File"
              name="file"
              rules={[{ required: true, message: 'Please insert 1 file' }]}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">
                  Support for single or bulk upload. Do not upload prohibited
                  files.
                </p>
              </Dragger>
            </Form.Item>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/reports')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                report ? 'reports.update' : 'reports.store'
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
