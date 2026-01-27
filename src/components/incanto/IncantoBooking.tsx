'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { bookingsApi } from '@/lib/api/bookings'
import { useAuthStore } from '@/lib/store/auth.store'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { CustomInput } from '@/components/ui/CustomInput'
import { CustomSelect } from '@/components/ui/CustomSelect'
import styles from './IncantoBooking.module.css'

type IncantoBookingProps = {
  lang: string
  variant?: 'standalone' | 'overlay'
}

const INCANTO_PROPERTY_ID = 'incanto-property-id'

export function IncantoBooking({ lang, variant = 'standalone' }: IncantoBookingProps) {
  const t = useTranslation()
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffTime = checkOutDate.getTime() - checkInDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [checkIn, checkOut])

  const basePrice = 150
  const cleaningFee = 50
  const serviceFeePercentage = 10
  const taxRate = 24
  const maxGuests = 4

  const price = useMemo(() => {
    if (nights === 0) return { subtotal: 0, cleaning: 0, service: 0, taxes: 0, total: 0 }

    const subtotal = basePrice * nights
    const cleaning = cleaningFee
    const service = subtotal * (serviceFeePercentage / 100)
    const taxes = (subtotal + cleaning + service) * (taxRate / 100)
    const total = subtotal + cleaning + service + taxes

    return { subtotal, cleaning, service, taxes, total }
  }, [nights])

  const { isAuthenticated, user } = useAuthStore()
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  useEffect(() => {
    if (isAuthenticated && user) {
      setGuestName(user.name || '')
      setGuestEmail(user.email || '')
    }
  }, [isAuthenticated, user])

  const guestOptions = useMemo(() => {
    return Array.from({ length: maxGuests }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }))
  }, [maxGuests])

  const minCheckInDate = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  const minCheckOutDate = useMemo(() => {
    return checkIn || new Date().toISOString().split('T')[0]
  }, [checkIn])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!checkIn || !checkOut) {
      setError(t('booking.form.selectDatesError'))
      return
    }

    if (guests > maxGuests) {
      setError(t('booking.form.maxGuestsError', { max: maxGuests }))
      return
    }

    if (!guestName || !guestEmail) {
      setError(t('booking.form.fillNameEmailError'))
      return
    }

    setLoading(true)

    try {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const response = await bookingsApi.create({
        propertyId: INCANTO_PROPERTY_ID,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests,
        guestName,
        guestEmail,
        guestPhone: guestPhone || undefined,
        specialRequests: specialRequests || undefined,
      })

      if (response.success && response.data) {
        router.push(`/${lang}/bookings/${response.data.id}/payment`)
      } else {
        throw new Error('Failed to create booking')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }, [checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests, lang, router, t, maxGuests])

  const isOverlay = variant === 'overlay'

  const bookingCard = (
    <div className={`${styles.card} ${isOverlay ? styles.cardOverlay : styles.cardStandalone}`}>
      {/* Price Display */}
      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={`${styles.price} ${isOverlay ? styles.priceOverlay : styles.priceStandalone}`}>
            {basePrice.toFixed(2)} €
          </span>
          <span className={`${styles.priceLabel} ${isOverlay ? styles.priceLabelOverlay : styles.priceLabelStandalone}`}>
            {t('booking.form.perNight')}
          </span>
        </div>
        {nights > 0 && (
          <div className={`${styles.priceSummary} ${isOverlay ? styles.priceSummaryOverlay : styles.priceSummaryStandalone}`}>
            {nights} {nights === 1 ? t('booking.form.nights').slice(0, -1) : t('booking.form.nights')} • {price.total.toFixed(2)} € {lang === 'el' ? 'σύνολο' : 'total'}
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Date Selection */}
        <div className={styles.dateGrid}>
          <div className={styles.formGroup}>
            <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
              {t('booking.form.checkIn')}
            </label>
            <CustomDatePicker
              value={checkIn || ''}
              onChange={setCheckIn}
              placeholder={t('booking.form.selectDate')}
              minDate={minCheckInDate}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
              {t('booking.form.checkOut')}
            </label>
            <CustomDatePicker
              value={checkOut || ''}
              onChange={setCheckOut}
              placeholder={t('booking.form.selectDate')}
              minDate={minCheckOutDate}
            />
          </div>
        </div>

        {/* Guests */}
        <div className={styles.formGroup}>
          <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
            {t('booking.form.guests')}
          </label>
          <CustomSelect
            value={guests.toString()}
            onChange={(value) => setGuests(parseInt(value))}
            options={guestOptions}
          />
        </div>

        {/* Guest Information */}
        {!isAuthenticated && (
          <>
            <div className={styles.formGroup}>
              <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
                {t('booking.form.fullName')} *
              </label>
              <CustomInput
                type="text"
                value={guestName}
                onChange={setGuestName}
                placeholder={t('booking.form.fullNamePlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
                {t('booking.form.email')} *
              </label>
              <CustomInput
                type="email"
                value={guestEmail}
                onChange={setGuestEmail}
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
                {t('booking.form.phoneOptional')}
              </label>
              <CustomInput
                type="tel"
                value={guestPhone}
                onChange={setGuestPhone}
                placeholder={t('booking.form.phonePlaceholder')}
              />
            </div>
          </>
        )}

        {/* Special Requests */}
        <div className={styles.formGroup}>
          <label className={`${styles.label} ${isOverlay ? styles.labelOverlay : styles.labelStandalone}`}>
            {t('booking.form.specialRequestsOptional')}
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
            className={`${styles.textarea} ${isOverlay ? styles.textareaOverlay : styles.textareaStandalone}`}
            placeholder={t('booking.form.specialRequestsPlaceholder')}
          />
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span className={`${styles.priceText} ${isOverlay ? styles.priceTextOverlay : styles.priceTextStandalone}`}>
                {basePrice.toFixed(2)} € × {nights} {t('booking.form.nights')}
              </span>
              <span className={`${styles.priceValue} ${isOverlay ? styles.priceValueOverlay : styles.priceValueStandalone}`}>
                {price.subtotal.toFixed(2)} €
              </span>
            </div>
            {price.cleaning > 0 && (
              <div className={styles.priceRow}>
                <span className={`${styles.priceText} ${isOverlay ? styles.priceTextOverlay : styles.priceTextStandalone}`}>
                  {t('booking.form.cleaningFee')}
                </span>
                <span className={`${styles.priceValue} ${isOverlay ? styles.priceValueOverlay : styles.priceValueStandalone}`}>
                  {price.cleaning.toFixed(2)} €
                </span>
              </div>
            )}
            {price.service > 0 && (
              <div className={styles.priceRow}>
                <span className={`${styles.priceText} ${isOverlay ? styles.priceTextOverlay : styles.priceTextStandalone}`}>
                  {t('booking.form.serviceFee')}
                </span>
                <span className={`${styles.priceValue} ${isOverlay ? styles.priceValueOverlay : styles.priceValueStandalone}`}>
                  {price.service.toFixed(2)} €
                </span>
              </div>
            )}
            {price.taxes > 0 && (
              <div className={styles.priceRow}>
                <span className={`${styles.priceText} ${isOverlay ? styles.priceTextOverlay : styles.priceTextStandalone}`}>
                  {t('booking.form.taxes')}
                </span>
                <span className={`${styles.priceValue} ${isOverlay ? styles.priceValueOverlay : styles.priceValueStandalone}`}>
                  {price.taxes.toFixed(2)} €
                </span>
              </div>
            )}
            <div className={`${styles.priceRow} ${styles.priceTotal}`}>
              <span className={`${styles.priceText} ${styles.priceTotalText} ${isOverlay ? styles.priceTextOverlay : styles.priceTextStandalone}`}>
                {t('booking.form.total')}
              </span>
              <span className={`${styles.priceValue} ${styles.priceTotalValue} ${isOverlay ? styles.priceValueOverlay : styles.priceValueStandalone}`}>
                {price.total.toFixed(2)} €
              </span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !checkIn || !checkOut}
          className={`${styles.submitButton} ${isOverlay ? styles.submitButtonOverlay : styles.submitButtonStandalone}`}
        >
          {loading ? t('booking.form.processing') : t('booking.form.bookNow')}
        </button>
      </form>
    </div>
  )

  if (isOverlay) {
    return (
      <div className={styles.overlayWrapper}>
        <div className={styles.overlayHeader}>
          <h2 className={styles.overlayTitle}>
            {t('booking.form.bookYourStay')}
          </h2>
          <p className={styles.overlayDescription}>
            {t('booking.form.bookYourStayDescription')}
          </p>
        </div>
        {bookingCard}
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t('booking.form.bookYourStay')}
          </h2>
          <p className={styles.sectionDescription}>
            {t('booking.form.bookYourStayDescription')}
          </p>
        </div>
        <div className={styles.bookingWrapper}>
          {bookingCard}
        </div>
      </div>
    </section>
  )
}
