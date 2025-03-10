import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Category, Product } from '@/types'
import { InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Head, router, usePage } from '@inertiajs/react'
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
  Switch,
  Typography,
  Upload,
} from 'antd'
import { JSX, useEffect, useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import Tiptap from '@/components/tiptap'
import { checkPermission } from '@/lib/permission'

const breadcrumbs = ['Dashboard', 'Category', 'Create']

interface FormPageProps {
  product?: Product
  categories: Category[]
}

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function FormPage({ product, categories }: FormPageProps) {
  const { permissions } = usePage().props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isCredit, setIsCredit] = useState(product ? product.is_credit : false)
  const [content, setContent] = useState(product ? product.content : '')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    if (product?.image_url) {
      setFileList([
        {
          uid: '-1',
          name: 'product-image',
          status: 'done',
          url: product.image_url,
        },
      ])
    }
  }, [product])

  const { form, submit, isLoading } = useFormHandler({
    initialValues: product,
    url: product ? `/dashboard/products/${product.id}` : `/dashboard/products`,
    method: product ? 'put' : 'post',
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

    if (product) {
      formData.delete('content')
    }
    formData.append('content', content)

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
    <>
      <Head title={product ? 'Edit Product' : 'Create Product'} />
      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Product Form</Typography.Title>
        <Divider />
        <Form
          form={form}
          disabled={isLoading}
          layout="vertical"
          onValuesChange={(changedValues) => {
            if (changedValues.name) {
              setSlug(generateSlug(changedValues.name))
              form.setFieldsValue({ slug: generateSlug(changedValues.name) })
            }
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product name"
                rules={[
                  { required: true, message: 'Please enter product name' },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  placeholder="Select a category"
                />
              </Form.Item>

              <Form.Item
                name="collateral_name"
                label="Calculator name"
                rules={[
                  { required: true, message: 'Please enter calculator name' },
                ]}
              >
                <Input placeholder="Enter calculator name" />
              </Form.Item>

              <Form.Item name="is_credit" label="Credit">
                <Switch value={isCredit} onChange={(e) => setIsCredit(e)} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: 'Please insert slug' }]}
              >
                <Input placeholder="Enter slug" value={slug} />
              </Form.Item>

              <Form.Item
                name="keywords"
                label="Keywords"
                rules={[
                  {
                    required: true,
                    message: 'Please enter keyword',
                  },
                ]}
              >
                <Select placeholder="Enter keywords" mode="tags" />
              </Form.Item>

              <Form.Item
                name="meta_descriptions"
                label="Meta descriptions"
                rules={[
                  {
                    required: true,
                    message: 'Please enter meta description',
                  },
                ]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Image"
            name="image_url"
            rules={[
              {
                required: true,
                message: 'Please insert 1 image',
              },
            ]}
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
            rules={[
              {
                required: true,
                message: 'Content is required',
              },
            ]}
          >
            <Tiptap content={content} setContent={setContent} />
          </Form.Item>

          <Space className="flex justify-end mt-4">
            <Button onClick={() => router.visit('/dashboard/products')}>
              Cancel
            </Button>
            {checkPermission(
              permissions as string[],
              product ? 'products.update' : 'products.store'
            ) && (
              <Button type="primary" onClick={handleSubmit} loading={isLoading}>
                {isLoading ? 'Saving...' : 'Submit'}
              </Button>
            )}
          </Space>
        </Form>
      </div>
    </>
  )
}

FormPage.layout = (page: JSX.Element) => (
  <DashboardLayout removeBg={true} breadcrumbs={breadcrumbs}>
    {page}
  </DashboardLayout>
)
