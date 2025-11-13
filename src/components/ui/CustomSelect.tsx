'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type SelectOption = {
  value: string
  label: string
}

type CustomSelectProps = {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  labelClassName?: string
  error?: string
  disabled?: boolean
}

export const CustomSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className,
  labelClassName,
  error,
  disabled = false
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionsRef = useRef<HTMLButtonElement[]>([])

  const selectedOption = options.find((opt) => opt.value === value)
  const selectedIndex = options.findIndex((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      if (selectedIndex >= 0) {
        setFocusedIndex(selectedIndex)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, selectedIndex])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setFocusedIndex(-1)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value)
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        buttonRef.current?.focus()
        break
      case 'Home':
        if (isOpen) {
          e.preventDefault()
          setFocusedIndex(0)
        }
        break
      case 'End':
        if (isOpen) {
          e.preventDefault()
          setFocusedIndex(options.length - 1)
        }
        break
    }
  }

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [focusedIndex, isOpen])

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
      <div ref={selectRef} className="relative">
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
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-between',
            isOpen && 'ring-2 ring-[#d4af37] border-[#d4af37]',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
        >
          <span className={cn(
            'truncate',
            !selectedOption && 'text-gray-400'
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={cn(
              'w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200',
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute z-50 w-full mt-1',
              'bg-gray-800 border border-[#d4af37]/40 rounded-lg',
              'shadow-xl overflow-hidden',
              'max-h-60 overflow-y-auto scrollbar-hide'
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full px-3 py-2 text-sm sm:text-base text-left',
                  'text-white hover:bg-[#d4af37]/20',
                  'transition-colors',
                  'flex items-center',
                  value === option.value && 'bg-[#d4af37]/30 font-medium'
                )}
              >
                <span className="flex-1">{option.label}</span>
                {value === option.value && (
                  <svg
                    className="w-4 h-4 text-[#d4af37] ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

