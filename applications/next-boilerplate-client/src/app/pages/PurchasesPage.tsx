'use client'

import { gql, useQuery } from '@apollo/client'
import ProductMultiSelect from '../components/ProductMultiSelect'
import UserMultiSelect from '../components/UserMultiSelect'
import ProductItem from '../components/ProductItem'
import { useState } from 'react'
import { ScrollArea, ScrollBar, Button } from '@/components/ui'

const PURCHASES_QUERY = gql`
  query Purchases(
    $productIds: [ID]
    $userIds: [ID]
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    purchases(
      productIds: $productIds
      userIds: $userIds
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      nodes {
        id
        date
        user {
          id
          firstName
          lastName
        }
        product {
          id
          name
          imageUrl
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const PAGE_SIZE = 12

export default function PurchasesPage() {
  const [productIds, setProductIds] = useState<string[]>([])
  const [userIds, setUserIds] = useState<string[]>([])
  const [after, setAfter] = useState<string | null>(null)
  const [before, setBefore] = useState<string | null>(null)

  const { loading, error, data, refetch } = useQuery(PURCHASES_QUERY, {
    variables: {
      productIds: productIds.length ? productIds : null,
      userIds: userIds.length ? userIds : null,
      first: !before ? PAGE_SIZE : null,
      last: before ? PAGE_SIZE : null,
      after,
      before,
    },
    notifyOnNetworkStatusChange: true,
  })

  const purchases = data?.purchases?.nodes ?? []
  const pageInfo = data?.purchases?.pageInfo

  function handleNext() {
    setAfter(pageInfo?.endCursor)
    setBefore(null)
  }
  function handlePrev() {
    setBefore(pageInfo?.startCursor)
    setAfter(null)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden py-6">
      {/* Filter Section */}
      <div className="grid grid-cols-2 gap-4 w-full pb-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold text-[16px]">Products</span>
          <ProductMultiSelect
            initialSelected={productIds}
            onApply={(ids) => {
              setProductIds(ids)
              setAfter(null)
              setBefore(null)
              refetch({
                productIds: ids.length ? ids : null,
                userIds: userIds.length ? userIds : null,
                first: PAGE_SIZE,
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold text-[16px]">Users</span>
          <UserMultiSelect
            initialSelected={userIds}
            onApply={(ids) => {
              setUserIds(ids)
              setAfter(null)
              setBefore(null)
              refetch({
                productIds: productIds.length ? productIds : null,
                userIds: ids.length ? ids : null,
                first: PAGE_SIZE,
              })
            }}
          />
        </div>
      </div>

      {/* Purchases Section */}
      <div className="flex-1 flex flex-col w-full pt-6 overflow-hidden border-t">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            Loading purchases...
          </div>
        ) : error ? (
          <div className="text-red-600 flex-1 flex items-center justify-center">
            Error: {error.message}
          </div>
        ) : purchases.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            No purchases found for current filters.
          </div>
        ) : (
          <>
            {/* Products Grid with ScrollArea */}
            <ScrollArea className="flex-1">
              <div className="grid gap-[31px] grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {purchases.map((p: any) => (
                  <ProductItem key={p.id} product={p.product} />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            {/* Pagination Buttons */}
            <div className="flex gap-3 justify-center items-center pt-6">
              <Button
                variant="outline"
                className="px-4 py-2"
                onClick={handlePrev}
                disabled={!pageInfo?.hasPreviousPage || loading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="px-4 py-2"
                onClick={handleNext}
                disabled={!pageInfo?.hasNextPage || loading}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
