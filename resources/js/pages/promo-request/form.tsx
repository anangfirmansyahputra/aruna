import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Testimonial } from '@/types'
import { InboxOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography,
} from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useEffect, useState } from 'react'

interface FormPageProps {
  testimonial?: Testimonial
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export default function FormPage({ testimonial }: FormPageProps) {
  const breadcrumbs = [
    'Dashboard',
    'Testimonial',
    testimonial ? 'Update' : 'Create',
  ]

  const { permissions } = usePage().props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (testimonial?.image_url) {
      setFileList([
        {
          uid: '-1',
          name: 'article-image',
          status: 'done',
          url: testimonial.image_url,
        },
      ])
    }
  }, [testimonial])

  const { form, submit, isLoading } = useFormHandler({
    initialValues: testimonial,
    url: testimonial
      ? `/dashboard/testimonials/${testimonial.id}`
      : `/dashboard/testimonials`,
    method: testimonial ? 'put' : 'post',
  })

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  // Handle Submit Form
  const handleSubmit = async () => {
    const formData = new FormData()
    const formValues = form.getFieldsValue()

    Object.entries(formValues).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string)
      }
    })

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('image_url', fileList[0].originFileObj)
    }

    // Kirim ke server
    submit(formData)
  }

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

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title={testimonial ? 'Edit Article' : 'Create Article'} />
      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Article Form</Typography.Title>
        <Divider />

        <Form form={form} disabled={isLoading} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="job"
                label="Job"
                rules={[{ required: true, message: 'Please insert job' }]}
              >
                <Input placeholder="Enter job" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="text"
            label="Text"
            rules={[{ required: true, message: 'Please enter text' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image_url"
            rules={[{ required: true, message: 'Please insert 1 image' }]}
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>

          <Space className="flex justify-end mt-4">
            <Button onClick={() => router.visit('/dashboard/testimonials')}>
              Cancel
            </Button>
            {checkPermission(
              permissions as string[],
              testimonial ? 'testimonials.update' : 'testimonials.store'
            ) && (
              <Button type="primary" onClick={handleSubmit} loading={isLoading}>
                {isLoading ? 'Saving...' : 'Submit'}
              </Button>
            )}
          </Space>
        </Form>
      </div>
    </DashboardLayout>
  )
}
