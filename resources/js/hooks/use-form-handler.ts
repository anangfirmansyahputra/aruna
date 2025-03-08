import { router } from '@inertiajs/react'
import { message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'

interface UseFormHandlerProps<T> {
  initialValues?: T
  url: string
  method?: 'post' | 'put'
}

export function useFormHandler<T extends Record<string, any>>({
  initialValues,
  url,
  method = 'post',
}: UseFormHandlerProps<T>) {
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  const submit = (formData?: FormData | null, payload?: any) => {
    setIsLoading(true)
    const formValues = payload ? payload : form.getFieldsValue()

    if (formData && method == 'put') {
      formData.append('_method', 'PUT')
    }

    router.visit(url, {
      method: formData ? 'post' : method,
      data: formData ? formData : formValues,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        form.resetFields()
        message.success('Action success')
        setIsLoading(false)
      },
      onError: (errors) => {
        const formattedErrors = Object.entries(errors).map(
          ([field, messages]) => ({
            name: field,
            errors: Array.isArray(messages) ? messages : [messages],
          })
        )
        form.setFields(formattedErrors)
        setIsLoading(false)
      },
    })
  }

  return { form, submit, isLoading }
}
