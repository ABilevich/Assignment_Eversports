import { Product } from '../app.types'

interface Props {
  product: Product
}

export default function ProductItem({ product }: Props) {
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  return (
    <div className="flex flex-col gap-2 bg-white h-[244px] w-[232px]">
      <img
        src={defaultImageUrl} // Uncomment line below and comment this one to use actual product images
        // src={product.imageUrl ? product.imageUrl : defaultImageUrl}
        alt={product.name}
        className="block object-cover w-[232px] h-[202px] bg-gray-100 rounded-md"
      />
      <div className="pt-2 font-medium text-[22px] overflow-hidden whitespace-nowrap text-ellipsis">
        {product.name}
      </div>
    </div>
  )
}
