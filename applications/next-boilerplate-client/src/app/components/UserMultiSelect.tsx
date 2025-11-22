'use client'

import { gql } from '@apollo/client'
import QueryMultiSelect from './QueryMultiSelect'

interface Props {
  initialSelected?: string[]
  onApply: (ids: string[]) => void
}

export default function UserMultiSelect({
  initialSelected = [],
  onApply,
}: Props) {
  const USERS_SEARCH_QUERY = gql`
    query Users($first: Int, $searchTerm: String) {
      users(first: $first, searchTerm: $searchTerm) {
        nodes {
          id
          firstName
          lastName
        }
      }
    }
  `

  return (
    <QueryMultiSelect
      query={USERS_SEARCH_QUERY}
      elementKey="users"
      initialSelected={initialSelected}
      onApply={onApply}
      singularLabel="user"
      pluralLabel="users"
      debouncedTimerMs={300}
      querySize={50}
      elementMapper={(u: any) => ({
        id: u.id,
        label: `${u.firstName} ${u.lastName}`,
      })}
    />
  )
}
