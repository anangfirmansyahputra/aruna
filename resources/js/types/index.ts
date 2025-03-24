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
  created_at: Date
  updated_at: Date
  translations: CategoryTranslation[]
}

export interface CategoryTranslation {
  id: number
  category_id: number
  name: string
  description?: string
  language_code: Locale
  created_at: Date
  updated_at: Date
}

export interface ProductTranslation {
  language_code: Locale
  name: string
  collateral_name: string
  keywords: string
  meta_descriptions: string
  content: string
  slug: string
  heading_one: string
  heading_two: string
}

export interface Product {
  id: number
  category_id: number
  category?: Category
  image_url: string
  is_credit: boolean
  created_at: Date
  updated_at: Date
}

export interface Article {
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
  category: string
  detail_information?: string
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
  guard_name: string
  created_at: Date
  updated_at: Date
}

export interface User {
  id: number
  name: string
  email: string
  roles: Role[]
}

export interface ProductFAQ {
  id: number
  product_id: number
  question: string
  answer: string
  product: Product
  created_at: Date
  updated_at: Date
}

export interface Report {
  id: number
  title: string
  file: string
  year: Date
  created_at: Date
  updated_at: Date
}

export interface InterestRate {
  id: number
  product_id: number
  product: Product
  tenor: number
  interest: number
  created_at: Date
  updated_at: Date
}

export interface Testimonial {
  id: number
  name: string
  job: string
  text: string
  image_url: string
  created_at: Date
  updated_at: Date
}

export type Locale = 'ID' | 'EN'
