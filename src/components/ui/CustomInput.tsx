'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type CustomInputProps = {
  id?: string
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'number' | 'email' | 'tel' | 'date'
  className?: string
  labelClassName?: string
  error?: string
  disabled?: boolean
  required?: boolean
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      id,
      label,
      placeholder,
      value,
      onChange,
      type = 'text',
      className,
      labelClassName,
      error,
      disabled = false,
      required = false
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const allowedKeys = [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End'
        ]

        if (allowedKeys.includes(e.key)) {
          return
        }

        if (e.ctrlKey || e.metaKey) {
          if (['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
            return
          }
        }

        if (!/[0-9]/.test(e.key)) {
          e.preventDefault()
        }
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const inputValue = e.target.value
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
          onChange(inputValue)
        }
      } else {
        onChange(e.target.value)
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        e.preventDefault()
        const pastedText = e.clipboardData.getData('text')
        const numericOnly = pastedText.replace(/\D/g, '')
        if (numericOnly) {
          onChange(numericOnly)
        }
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block text-xs sm:text-sm md:text-sm font-medium text-gray-700 mb-1 sm:mb-2',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            inputMode={type === 'number' ? 'numeric' : undefined}
            className={cn(
              'w-full px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2',
              'text-sm sm:text-base',
              'bg-white border border-gray-300 rounded-lg',
              'text-gray-900 placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]',
              'transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              type === 'number' && 'hide-number-spinners',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

CustomInput.displayName = 'CustomInput'

