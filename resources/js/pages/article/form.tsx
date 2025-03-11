import Tiptap from '@/components/tiptap'
import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Category, Article } from '@/types'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
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
  Select,
  Space,
  Typography,
  Upload,
} from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { JSX, useEffect, useState } from 'react'

interface FormPageProps {
  article?: Article
  categories: Category[]
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

export default function FormPage({ article }: FormPageProps) {
  const breadcrumbs = ['Dashboard', 'Article', article ? 'Update' : 'Create']

  const { permissions } = usePage().props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState(article ? article.content : '')
  const [detailInformation, setDetailInformation] = useState(
    article ? article.detail_information : ''
  )

  useEffect(() => {
    if (article?.image_url) {
      setFileList([
        {
          uid: '-1',
          name: 'article-image',
          status: 'done',
          url: article.image_url,
        },
      ])
    }
  }, [article])

  const { form, submit, isLoading } = useFormHandler({
    initialValues: article,
    url: article ? `/dashboard/articles/${article.id}` : `/dashboard/articles`,
    method: article ? 'put' : 'post',
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
      formData.append(key, value as string)
    })

    formData.append('content', content)
    formData.append('detail_information', detailInformation as string)

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
      <Head title={article ? 'Edit Article' : 'Create Article'} />
      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Article Form</Typography.Title>
        <Divider />

        <Form
          form={form}
          disabled={isLoading}
          layout="vertical"
          onValuesChange={(changedValues) => {
            if (changedValues.title) {
              setSlug(generateSlug(changedValues.title))
              form.setFieldsValue({ slug: generateSlug(changedValues.title) })
            }
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: 'Please insert slug' }]}
              >
                <Input placeholder="Enter slug" value={slug} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="keywords"
                label="Keywords"
                rules={[{ required: true, message: 'Please enter keyword' }]}
              >
                <Select placeholder="Enter keywords" mode="tags" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: 'Please enter tags' }]}
              >
                <Select placeholder="Enter tags" mode="tags" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please insert category' }]}
              >
                <Input placeholder="Enter category" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="meta_description"
            label="Meta description"
            rules={[
              { required: true, message: 'Please enter meta description' },
            ]}
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

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <Tiptap content={content} setContent={setContent} />
          </Form.Item>

          <Form.Item name="detail_information" label="Detail Information">
            <Tiptap
              content={detailInformation}
              setContent={setDetailInformation}
            />
          </Form.Item>

          <Space className="flex justify-end mt-4">
            <Button onClick={() => router.visit('/dashboard/articles')}>
              Cancel
            </Button>
            {checkPermission(
              permissions as string[],
              article ? 'articles.update' : 'articles.store'
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
