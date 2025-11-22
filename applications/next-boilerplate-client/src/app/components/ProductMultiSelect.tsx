'use client'

import { gql } from '@apollo/client'
import QueryMultiSelect from './QueryMultiSelect'

interface Props {
  initialSelected?: string[]
  onApply: (ids: string[]) => void
}

export default function ProductMultiSelect({
  initialSelected = [],
  onApply,
}: Props) {
  const PRODUCTS_SEARCH_QUERY = gql`
    query Products($first: Int, $searchTerm: String) {
      products(first: $first, searchTerm: $searchTerm) {
        nodes {
          id
          name
        }
      }
    }
  `

  return (
    <QueryMultiSelect
      query={PRODUCTS_SEARCH_QUERY}
      elementKey="products"
      initialSelected={initialSelected}
      onApply={onApply}
      singularLabel="product"
      pluralLabel="products"
      debouncedTimerMs={300}
      querySize={50}
      elementMapper={(p: any) => ({ id: p.id, label: p.name })}
    />
  )
}
