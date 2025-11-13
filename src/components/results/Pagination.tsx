'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PaginationInfo } from '@/types/property'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface PaginationProps {
  pagination: PaginationInfo
  lang?: string
}

export const Pagination = ({ pagination, lang = 'en' }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslation()

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/${lang}/results?${params.toString()}`)
  }

  if (pagination.totalPages <= 1) {
    return null
  }

  const pages = []
  const maxVisible = 5
  let startPage = Math.max(1, pagination.page - Math.floor(maxVisible / 2))
  let endPage = Math.min(pagination.totalPages, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => updatePage(pagination.page - 1)}
        disabled={!pagination.hasPrev}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {t('results.pagination.previous')}
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => updatePage(1)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => updatePage(page)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            page === pagination.page
              ? 'bg-[#d4af37] text-white border-[#d4af37]'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < pagination.totalPages && (
        <>
          {endPage < pagination.totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => updatePage(pagination.totalPages)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {pagination.totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => updatePage(pagination.page + 1)}
        disabled={!pagination.hasNext}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {t('results.pagination.next')}
      </button>
    </div>
  )
}

