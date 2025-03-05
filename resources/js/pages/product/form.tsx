import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Category, Product } from '@/types'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Head, router } from '@inertiajs/react'
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
} from 'antd'
import { JSX, useEffect, useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd'

const breadcrumbs = ['Dashboard', 'Category', 'Create']

interface FormPageProps {
  product?: Product
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

export default function FormPage({ product, categories }: FormPageProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isCredit, setIsCredit] = useState(product ? product.is_credit : false)

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

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('image_url', fileList[0].originFileObj)
    }

    // Kirim ke server
    submit(formData)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <>
      <Head title={product ? 'Edit Product' : 'Create Product'} />
      <div className="p-6 bg-white h-full">
        <Typography.Title level={4}>Product Form</Typography.Title>
        <Divider />
        <div className="grid grid-cols-2">
          <Form form={form} disabled={isLoading} layout="vertical">
            <Form.Item
              name="name"
              label="Product name"
              rules={[{ required: true, message: 'Please enter product name' }]}
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

            <Form.Item label="Image" name="image_url">
              <>
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="image/*"
                  fileList={fileList}
                  onPreview={handlePreview}
                  multiple={false}
                  maxCount={1}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
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
              </>
            </Form.Item>

            <Space className="flex justify-end mt-4">
              <Button onClick={() => router.visit('/dashboard/products')}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleSubmit} loading={isLoading}>
                {isLoading ? 'Saving...' : 'Submit'}
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </>
  )
}

FormPage.layout = (page: JSX.Element) => (
  <DashboardLayout removeBg={true} breadcrumbs={breadcrumbs}>
    {page}
  </DashboardLayout>
)
