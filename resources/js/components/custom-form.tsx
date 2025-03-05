import { InputForm } from '@/types'
import { router } from '@inertiajs/react'
import { Button, Form, FormInstance, Input, Select, Space, Switch } from 'antd'

interface CustomFormProps {
  form: FormInstance<any>
  isLoading: boolean
  inputs: InputForm<any>[]
}

export default function CustomForm({
  form,
  isLoading,
  inputs,
}: CustomFormProps) {
  return (
    <Form disabled={isLoading} form={form} layout="vertical">
      {inputs.map((input) => (
        <Form.Item
          name={input.name as string}
          label={input.label}
          rules={
            input.rules
              ? [
                  {
                    ...input.rules,
                  },
                ]
              : undefined
          }
        >
          {input.type === 'text' ? (
            <Input placeholder={input.placeholder} />
          ) : input.type === 'textarea' ? (
            <Input.TextArea rows={5} placeholder={input.placeholder} />
          ) : input.type === 'select' ? (
            <Select options={input.options} />
          ) : input.type === 'switch' ? (
            <Switch />
          ) : null}
        </Form.Item>
      ))}

      <Space>
        <Button
          onClick={() => router.visit('/dashboard/categories')}
          type="default"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          // onClick={submit}
        >
          Submit
        </Button>
      </Space>
    </Form>
  )
}
