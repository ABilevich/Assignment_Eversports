export interface Product {
  id: string
  name: string
  imageUrl?: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
}

export interface Purchase {
  id: string
  date: string
  user: User
  product: Product
}
