import { useFormHandler } from '@/hooks/use-form-handler'
import DashboardLayout from '@/layouts/dashboard-layout'
import { checkPermission } from '@/lib/permission'
import { CreditProposal, Product, ProductTranslation } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
  UploadFile,
  UploadProps,
} from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

interface CreditProposalFormProps {
  data?: CreditProposal
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const collateralTypes = [
  {
    label: 'BPKB Mobil',
    value: 'BPKB_MOBIL',
  },
  {
    label: 'BPKB Motor',
    value: 'BPKB_MOTOR',
  },
  {
    label: 'Sertifikat Rumah',
    value: 'SERTIFIKAT_RUMAH',
  },
  {
    label: 'Pembiayaan Syariah',
    value: 'PEMBIAYAAN_SYARIAH',
  },
  {
    label: 'Kredit Mobil Bekas',
    value: 'KREDIT_MOBIL_BEJAS',
  },
  {
    label: 'Pembiayaan Alat Berat & Industri',
    value: 'PEMBIAYAAN_ALAT_BERAT',
  },
  {
    label: 'Pembiayaan Kepemilikan Rumah',
    value: 'PEMBIAYAAN_KPR',
  },
]

export default function CreditProposalForm({
  data,
  products,
}: CreditProposalFormProps) {
  console.log(data)

  const breadcrumbs = ['Dashboard', 'Credit Proposal', 'Create']
  const { permissions } = usePage().props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const { form, submit, isLoading } = useFormHandler({
    initialValues: data,
    url: data
      ? `/dashboard/credit-proposals/${data.id}`
      : `/dashboard/credit-proposals`,
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
        formData.append('collateral_photo_ktp', fileList[0].originFileObj)
      }

      console.log(formData)

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
    name: 'collateral_photo_ktp',
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
    if (data?.collateral_photo_ktp) {
      setFileList([
        {
          uid: '-1',
          name: 'product-image',
          status: 'done',
          url: data?.collateral_photo_ktp,
        },
      ])
    }

    if (data?.debtor_date_birth) {
      form.setFieldValue('debtor_date_birth', dayjs(data.debtor_date_birth))
    }
  }, [data])

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Credit Proposal" />
      <div className="lg:p-6 bg-white h-full">
        <Typography.Title level={4}>Credit Proposal Form</Typography.Title>
        <Divider />

        <div className="">
          <Form disabled={isLoading} form={form} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Product"
                  name="product_id"
                  required
                  rules={[
                    {
                      message: 'Please select product',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    options={products.map((product) => ({
                      value: product.id,
                      label: product.translations[0].name,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Plafond Amount"
                  name="plafond_amount"
                  required
                  rules={[
                    {
                      message: 'Please enter plafond amound',
                      required: true,
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Usage Purpose"
              name="usage_purpose"
              required
              rules={[
                {
                  message: 'Please enter usage purpose',
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor name"
                  name="debtor_name"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor name',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor No KTP"
                  name="debtor_no_ktp"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor no ktp',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor date birth"
                  name="debtor_date_birth"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor date birth',
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor NPWP"
                  name="debtor_npwp"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor NPWP',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor No HP"
                  name="debtor_no_hp"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor no HP',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Debtor email"
                  name="debtor_email"
                  required
                  rules={[
                    {
                      message: 'Please enter debtor email',
                      required: true,
                    },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Collateral name reference"
                  name="collateral_name_reference"
                  required
                  rules={[
                    {
                      message: 'Please enter collateral name reference',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="collateral_type"
                  required
                  label="Collateral type"
                >
                  <Select
                    options={collateralTypes.map((type) => ({
                      value: type.label,
                      label: type.label,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Collateral address"
              name="collateral_address"
              required
              rules={[
                {
                  message: 'Please enter collateral address',
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item
              label="Collateral photo KTP"
              name="collateral_photo_ktp"
              // rules={[{ required: true, message: 'Please insert 1 image' }]}
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

            <Space>
              <Button
                onClick={() => router.visit('/dashboard/credit-proposals')}
                type="default"
              >
                Cancel
              </Button>
              {checkPermission(
                permissions as string[],
                data ? 'credit-proposals.update' : 'credit-proposals.store'
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
