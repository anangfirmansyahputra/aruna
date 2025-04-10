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
  slug: string
  heading_one: string
  heading_two: string
  description?: string
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
  id_title: string
  en_title: string
  image_url: string
  id_keywords: string
  en_keywords: string
  id_meta_description: string
  en_meta_description: string
  id_content: string
  en_content: string
  id_slug: string
  en_slug: string
  id_tags: string
  en_tags: string
  created_at: string
  updated_at: Date
  id_category: string
  en_category: string
  id_detail_information?: string
  en_detail_information?: string
}

export interface Menu {
  id: number
  name: string
  icon: string
  path: string
  group: string
  submenu?: string
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
  id_question: string
  en_question: string
  en_answer: string
  id_answer: string
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

export interface ProductFeature {
  id: number
  icon: string
  en_title: string
  id_title: string
  en_description: string
  id_description: string
  created_at: Date
  updated_at: Date
}

export interface ProductRequirement {
  id: number
  id_title: string
  en_title: string
  items: string
  product_id: number
  product: Product & {
    translations: ProductTranslation[]
  }
}

export interface TeamProfile {
  id: number
  name: string
  en_title: string
  id_title: string
  id_description: string
  en_description: string
  image_url: string
  created_at: Date
  updated_at: Date
}

export interface CompanyValue {
  id: number
  icon: string
  en_title: string
  id_title: string
  en_description: string
  id_description: string
  created_at: Date
  updated_at: Date
}

export interface SEO {
  id: number
  id_title: string
  en_title: string
  id_meta_descriptions: string
  en_meta_descriptions: string
  id_keywords: string
  en_keywords: string
  updated_at: Date
  created_at: Date
  type: string
}

export interface FAQ {
  id: number
  id_question: string
  en_question: string
  en_answer: string
  id_answer: string
  created_at: Date
  updated_at: Date
}

export interface CreditProposal {
  id: number
  product_id: number
  plafond_amount: number
  usage_purpose: string
  debtor_name: string
  debtor_date_birth: string
  debtor_no_ktp: string
  debtor_npwp: string
  debtor_no_hp: string
  debtor_email: string
  debtor_address: string
  collateral_name_reference: string
  collateral_type: string
  collateral_photo_ktp: string
  created_at: Date
  updated_at: Date
}

export interface Promo {
  id: number
  product_id: number
  image_url: string
  start_date: string
  end_date: string
  coupon: string
  id_content: string
  en_content: string
  id_description: string
  en_description: string
  created_at: Date
  updated_at: Date
}
