import Tiptap from '@/components/tiptap'
import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { Product, Promo } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  DatePicker,
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
import { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

interface FormPageProps {
  data?: Promo
  products: Product[]
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function FormPage({ data, products }: FormPageProps) {
  const { permissions } = usePage().props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [expiratedDate, setExpiratedDate] = useState(
    data ? [dayjs(data.start_date), dayjs(data.end_date)] : undefined
  )
  const [content, setContent] = useState<{ en: string; id: string }>(
    data
      ? {
          en: data.en_content,
          id: data.id_content,
        }
      : {
          en: '',
          id: '',
        }
  )

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data ? `/dashboard/promos/${data.id}` : `/dashboard/promos`,
    method: data ? 'put' : 'post',
  })

  useEffect(() => {
    if (data?.image_url) {
      setFileList([
        {
          uid: '-1',
          name: 'data-image',
          status: 'done',
          url: `/storage/${data.image_url}`,
        },
      ])
    }
  }, [data])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      const formValues = await form.validateFields()

      if (
        content.id === '' ||
        content.id === '<p class="text-base"></p>' ||
        content.en === '' ||
        content.en === '<p class="text-base"></p>'
      ) {
        message.error('Please insert content')
        return
      }

      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      formData.append('id_content', content.id)
      formData.append('en_content', content.en)
      if (data) {
        formData.append('start_date', `${data.start_date}`)
        formData.append('end_date', `${data.end_date}`)
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image_url', fileList[0].originFileObj)
      } else {
        if (!data) {
          message.error('Please insert 1 image')
          return
        }
      }

      // Kirim ke server
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

  return (
    <DashboardLayout
      breadcrumbs={['Dashboard', 'Promo', data ? 'Update' : 'Create']}
    >
      <Head title={data ? 'Update Promo' : 'Create Promo'} />

      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Promo Form</Typography.Title>
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
                    name={`product_id`}
                    label="Product"
                    rules={[
                      { required: true, message: 'Please select product' },
                    ]}
                  >
                    <Select
                      options={products.map((product) => ({
                        label: (product as any).translations[0].name,
                        value: product.id,
                      }))}
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
                    name={'date'}
                    label="Expirated Date"
                    rules={[
                      {
                        required: data ? false : true,
                        message: 'Please enter expirated date',
                      },
                    ]}
                  >
                    <DatePicker.RangePicker />
                  </Form.Item>

                  <Form.Item
                    name={`coupon`}
                    label="Coupon"
                    rules={[{ required: true, message: 'Please enter coupon' }]}
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

                  <Form.Item name={`${locale}_content`} label="Content">
                    <Tiptap
                      setContent={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          [locale]: e,
                        }))
                      }
                      content={content[locale as 'en' | 'id']}
                    />
                  </Form.Item>
                </Tabs.TabPane>
              ))}
            </Tabs>

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/promos')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'promos.update' : 'promos.store'
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
