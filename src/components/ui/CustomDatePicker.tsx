'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'

type CustomDatePickerProps = {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  labelClassName?: string
  error?: string
  disabled?: boolean
  minDate?: string
  maxDate?: string
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const WEEKDAYS_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const CustomDatePicker = ({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select date',
  className,
  labelClassName,
  error,
  disabled = false,
  minDate,
  maxDate
}: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const datePickerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  const selectedDate = value ? new Date(value) : null

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }
  }, [selectedDate])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      adjustCalendarPosition()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const adjustCalendarPosition = () => {
    if (!calendarRef.current || !datePickerRef.current) return
    
    const rect = datePickerRef.current.getBoundingClientRect()
    const calendar = calendarRef.current
    const viewportHeight = window.innerHeight
    const calendarHeight = calendar.offsetHeight
    
    if (rect.bottom + calendarHeight > viewportHeight) {
      calendar.style.bottom = '100%'
      calendar.style.top = 'auto'
      calendar.style.marginBottom = '0.25rem'
      calendar.style.marginTop = '0'
    } else {
      calendar.style.top = '100%'
      calendar.style.bottom = 'auto'
      calendar.style.marginTop = '0.25rem'
      calendar.style.marginBottom = '0'
    }
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return ''
    const day = date.getDate()
    const month = MONTHS_SHORT[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const min = new Date(minDate)
      min.setHours(0, 0, 0, 0)
      if (date < min) return true
    }
    if (maxDate) {
      const max = new Date(maxDate)
      max.setHours(23, 59, 59, 999)
      if (date > max) return true
    }
    return false
  }

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const handleDateSelect = useCallback((day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (!isDateDisabled(newDate)) {
      onChange(formatDate(newDate))
      setIsOpen(false)
    }
  }, [currentMonth, onChange, minDate, maxDate])

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }, [currentMonth])

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }, [currentMonth])

  const handlePreviousYear = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))
  }, [currentMonth])

  const handleNextYear = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))
  }, [currentMonth])

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days.map((day, index) => {
      if (day === null) {
        return <div key={index} className="w-full aspect-square" />
      }

      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const disabled = isDateDisabled(date)
      const selected = isDateSelected(date)
      const today = isToday(date)

      return (
        <button
          key={index}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={disabled}
          className={cn(
            'relative w-full aspect-square rounded-md',
            'text-xs sm:text-sm font-medium transition-all duration-200',
            'flex items-center justify-center',
            'group',
            disabled
              ? 'text-gray-600 cursor-not-allowed opacity-30'
              : selected
              ? 'bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-black font-bold shadow-lg shadow-[#d4af37]/30 scale-105 z-10'
              : today
              ? 'text-[#d4af37] border-2 border-[#d4af37]/60 bg-[#d4af37]/10'
              : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/15 hover:border hover:border-[#d4af37]/30',
            'focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-1 focus:ring-offset-gray-800'
          )}
        >
          {selected && (
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-sm" />
          )}
          <span className="relative z-10">{day}</span>
        </button>
      )
    })
  }, [currentMonth, selectedDate, minDate, maxDate, handleDateSelect])

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'block text-xs sm:text-sm md:text-sm font-medium text-gray-200 mb-1 sm:mb-2',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div ref={datePickerRef} className="relative">
        <button
          type="button"
          id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2',
            'text-sm sm:text-base text-left',
            'bg-gray-800/60 border border-[#d4af37]/40 rounded-lg',
            'text-white',
            'focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-between',
            isOpen && 'ring-2 ring-[#d4af37] border-[#d4af37] shadow-lg shadow-[#d4af37]/20',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            !selectedDate && 'text-gray-400',
            className
          )}
        >
          <span className="truncate flex items-center gap-2">
            {selectedDate ? (
              <>
                <span className="text-[#d4af37] font-semibold">
                  {selectedDate.getDate()}
                </span>
                <span className="text-gray-300">
                  {MONTHS_SHORT[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          <svg
            className={cn(
              'w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-300',
              'text-[#d4af37]',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            ref={calendarRef}
            className={cn(
              'absolute left-0 z-[100] mt-1',
              'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
              'border border-[#d4af37]/50 rounded-xl',
              'shadow-2xl shadow-black/50',
              'backdrop-blur-sm',
              'w-[300px] sm:w-[340px]',
              'overflow-hidden scrollbar-hide'
            )}
            style={{
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="p-4 sm:p-5">
              <div className="mb-4 pb-4 border-b border-[#d4af37]/20">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousYear}
                    className="p-2 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                    title="Previous year"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePreviousMonth}
                      className="p-2 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                      title="Previous month"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="text-white font-semibold text-base sm:text-lg min-w-[140px] text-center">
                      <span className="text-[#d4af37]">{MONTHS_FULL[currentMonth.getMonth()]}</span>
                      <span className="text-gray-300 ml-2">{currentMonth.getFullYear()}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-2 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                      title="Next month"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextYear}
                    className="p-2 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                    title="Next year"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-3">
                {WEEKDAYS_FULL.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-xs font-semibold text-[#d4af37] py-1.5"
                  >
                    {day.charAt(0)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays}
              </div>

              {selectedDate && (
                <div className="mt-4 pt-4 border-t border-[#d4af37]/20">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-400">Selected:</span>
                    <span className="text-[#d4af37] font-semibold">
                      {formatDisplayDate(selectedDate)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
