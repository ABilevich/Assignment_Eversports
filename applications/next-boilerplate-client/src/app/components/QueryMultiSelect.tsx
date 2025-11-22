'use client'

import { useCallback, useEffect, useState } from 'react'
import { DocumentNode, useQuery } from '@apollo/client'
import MultiSelect from './MultiSelect'

interface Props {
  initialSelected?: string[]
  onApply: (ids: string[]) => void
  query: DocumentNode // GraphQL query to fetch the items
  querySize?: number // number of items to fetch per query
  debouncedTimerMs?: number // debounce timer in ms
  singularLabel?: string // used for button label when one item is selected
  pluralLabel?: string // used for button label when multiple items are selected
  elementKey?: string // The expected backend key for the requested elements
  elementMapper?: (element: any) => { id: string; label: string } // optional mapper to transform the fetched elements
}

// This component uses the regular MultiSelect component to provide in combination with a debounced query search to be able to be reused for different entities (e.g. users, products, etc.)
export default function QueryMultiSelect({
  initialSelected = [],
  query,
  querySize = 50,
  debouncedTimerMs = 300,
  onApply,
  singularLabel = 'element',
  pluralLabel = 'elements',
  elementKey = 'users',
  elementMapper,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debounced, setDebounced] = useState(searchTerm)

  const { loading, error, data, refetch } = useQuery(query, {
    variables: { first: querySize, searchTerm: debounced },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    const t = setTimeout(() => setDebounced(searchTerm), debouncedTimerMs)
    return () => clearTimeout(t)
  }, [searchTerm])

  useEffect(() => {
    if (debounced !== undefined) refetch()
  }, [debounced, refetch])

  const elements = (data?.[elementKey]?.nodes ?? []).map(
    elementMapper ?? ((e: any) => ({ id: e.id, label: e.id })),
  )

  const calculateLabel = useCallback(() => {
    if (initialSelected.length === 0) {
      return `Select ${pluralLabel}`
    } else if (initialSelected.length === 1) {
      return `${initialSelected.length} ${singularLabel} selected`
    } else {
      return `${initialSelected.length} ${pluralLabel} selected`
    }
  }, [initialSelected])

  return (
    <MultiSelect
      items={elements}
      loading={loading}
      error={error}
      buttonLabel={calculateLabel()}
      initialSelected={initialSelected}
      onApply={onApply}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      singularLabel={singularLabel}
      pluralLabel={pluralLabel}
    />
  )
}
