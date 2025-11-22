'use client'

import React, { useEffect, useState } from 'react'
import { Button, Input, Checkbox, ScrollArea, ScrollBar } from '@/components/ui'
import { Search, ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

interface Item {
  id: string
  label: string
}

interface Props {
  items: Item[]
  loading: boolean
  error: any
  buttonLabel: string
  placeholder?: string
  initialSelected?: string[]
  onApply: (ids: string[]) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  singularLabel?: string
  pluralLabel?: string
  cancelLabel?: string
  applyLabel?: string
}

export default function MultiSelect({
  items,
  loading,
  error,
  buttonLabel,
  placeholder = 'Search',
  initialSelected = [],
  onApply,
  searchValue = '',
  onSearchChange,
  singularLabel = 'element',
  pluralLabel = 'elements',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
}: Props) {
  const [open, setOpen] = useState(false)
  const [tempSelected, setTempSelected] = useState<string[]>(initialSelected)
  const [appliedSelected, setAppliedSelected] =
    useState<string[]>(initialSelected)

  useEffect(() => {
    setTempSelected(initialSelected)
    setAppliedSelected(initialSelected)
  }, [initialSelected])

  function toggleOne(id: string) {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  function toggleAll() {
    if (items.length === 0) return
    const allIds = items.map((i) => i.id)
    const allSelected = allIds.every((id) => tempSelected.includes(id))
    setTempSelected(allSelected ? [] : allIds)
  }

  function onCancel() {
    setOpen(false)
    setTempSelected(appliedSelected)
  }

  function onApplyClick() {
    setAppliedSelected(tempSelected)
    setOpen(false)
    onApply(tempSelected)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (val) setTempSelected(appliedSelected)
        else setTempSelected(appliedSelected)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full px-4 py-3 rounded-lg flex items-center justify-between font-medium transition-all ${
            open
              ? 'border-teal-800 text-teal-800 bg-gray-50'
              : 'border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          <span className="text-base font-medium">{buttonLabel}</span>
          <ChevronDown
            size={'18px'}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="PopoverContent p-0">
        <div className="bg-popover rounded-lg shadow-lg">
          {/* Search Bar */}
          <div className="flex items-center gap-3 px-4 py-[10px]">
            <Search className="h-[16px] w-[16px]" />
            <Input
              type="text"
              className="p-0 border-0 outline-none text-base placeholder:text-base font-medium"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          {/* Items List */}
          <ScrollArea className="h-[200px]">
            <div className='"border-t mb-4 px-4 "'>
              {loading ? (
                <div className="text-base font-medium">Loading...</div>
              ) : error ? (
                <div className="text-base font-medium text-red-600">Error</div>
              ) : items.length === 0 ? (
                <div className="text-base font-medium text-gray-500">
                  {`No ${pluralLabel} found`}
                </div>
              ) : (
                <div>
                  {/* Select All */}
                  <div className="border-t border-b h-[40px] flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <Checkbox
                      checked={
                        items.length > 0 &&
                        items.every((item) => tempSelected.includes(item.id))
                      }
                      onCheckedChange={() => toggleAll()}
                      aria-label="Select all"
                    />
                    <span className="text-base font-medium">Select all</span>
                  </div>
                  {/* Items */}
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="h-[40px] flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <Checkbox
                        checked={tempSelected.includes(item.id)}
                        onCheckedChange={() => toggleOne(item.id)}
                        aria-label={`Select ${item.label}`}
                      />
                      <span className="text-base font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 border-t px-4 py-2">
            <Button
              variant="ghost"
              className="px-4 py-2 text-sm  font-medium"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              className="px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-700 text-white"
              onClick={onApplyClick}
            >
              {applyLabel}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
