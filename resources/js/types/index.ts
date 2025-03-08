import { Rule } from 'antd/es/form'

export interface Option {
  value: string | number
  label: string
}

export interface InputForm<T> {
  name: keyof T
  label: string
  rules?: Rule
  placeholder?: string
  type: 'text' | 'textarea' | 'select' | 'switch'
  options?: Option[]
}

export interface Category {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: number
  name: string
  category_id: number
  category?: Category
  image_url: string
  is_credit: boolean
  collateral_name: string
  created_at: Date
  updated_at: Date
}

export interface News {
  id: number
  title: string
  image_url: string
  keywords: string
  meta_description: string
  content: string
  slug: string
  tags: string
  created_at: Date
  updated_at: Date
}

export interface Menu {
  id: number
  name: string
  icon: string
  path: string
  group: string
  created_at: Date
  updated_at: Date
}

export interface Role {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface Permission {
  id: number
  name: string
  codes: string
  created_at: Date
  updated_at: Date
}

export interface User {
  id: number
  name: string
  email: string
  role: Role
}
