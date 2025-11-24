import { StarIcon } from '@/components/icons'
import { reviewsApi } from '@/lib/api/reviews'
import { Review } from '@/types/review'
import { formatDateEU } from '@/lib/utils/date'

type PropertyReviewsProps = {
  propertyId: string
  lang: string
}

export async function PropertyReviews({ propertyId, lang }: PropertyReviewsProps) {
  let reviews: Review[] = []
  let summary = {
    totalReviews: 0,
    averageRating: 0,
    averageCleanlinessRating: 0,
    ratingDistribution: {} as Record<number, number>,
  }

  try {
    const response = await reviewsApi.getPropertyReviews(propertyId)
    reviews = response.reviews || []
    summary = response.summary || summary
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
  }

  const { totalReviews, averageRating, averageCleanlinessRating } = summary

  if (totalReviews === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {lang === 'gr' ? 'Αξιολογήσεις' : 'Reviews'}
        </h2>
        <p className="text-gray-600">
          {lang === 'gr' 
            ? 'Δεν υπάρχουν αξιολογήσεις ακόμα.' 
            : 'No reviews yet.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {lang === 'gr' ? 'Αξιολογήσεις' : 'Reviews'}
          </h2>
          {averageRating > 0 && (
            <div className="flex items-center gap-2">
              <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600">
                ({totalReviews} {lang === 'gr' ? 'αξιολογήσεις' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        {averageCleanlinessRating > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">
                {lang === 'gr' ? 'Μέση Καθαριότητα' : 'Average Cleanliness'}:
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageCleanlinessRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-700 font-semibold ml-2">
                  {averageCleanlinessRating.toFixed(1)}/5
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {reviews.map((review: any) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {review.guest?.avatar ? (
                  <img
                    src={review.guest.avatar}
                    alt={review.guest.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {review.guest?.name?.charAt(0).toUpperCase() || 'G'}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{review.guest?.name || 'Guest'}</div>
                  <div className="text-sm text-gray-500">
                    {formatDateEU(review.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            {review.comment && (
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            )}
            <div className="mt-3 space-y-2">
              {review.cleanlinessRating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {lang === 'gr' ? 'Καθαριότητα' : 'Cleanliness'}:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.cleanlinessRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">({review.cleanlinessRating}/5)</span>
                  </div>
                </div>
              )}
              {review.accuracyRating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {lang === 'gr' ? 'Ακρίβεια' : 'Accuracy'}:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.accuracyRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">({review.accuracyRating}/5)</span>
                  </div>
                </div>
              )}
              {review.communicationRating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {lang === 'gr' ? 'Επικοινωνία' : 'Communication'}:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.communicationRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">({review.communicationRating}/5)</span>
                  </div>
                </div>
              )}
              {review.locationRating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {lang === 'gr' ? 'Τοποθεσία' : 'Location'}:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.locationRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">({review.locationRating}/5)</span>
                  </div>
                </div>
              )}
              {review.valueRating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {lang === 'gr' ? 'Αξία' : 'Value'}:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.valueRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">({review.valueRating}/5)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

