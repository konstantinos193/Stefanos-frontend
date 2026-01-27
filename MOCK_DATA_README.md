# Mock Data Setup

This project now includes comprehensive mock data to demonstrate the application while the backend is being developed.

## What's Included

### Properties
- **30+ mock properties** across various Greek cities (Athens, Mykonos, Santorini, Crete, etc.)
- Different property types: Apartments, Houses, Luxury Villas
- Full property details including:
  - Descriptions in English and Greek
  - Images (using placeholder service)
  - Amenities
  - Pricing and fees
  - Ratings and reviews
  - Owner information

### Reviews
- Mock reviews for all properties
- Review summaries with ratings
- Guest information and avatars

### Bookings
- Sample bookings with various statuses
- Complete booking details including pricing breakdown

### Editions
- Mock edition categories for the editions section

## How to Switch Between Mock and Real Data

All API functions have a `USE_MOCK_DATA` flag at the top of each file:

- `src/lib/api/properties.ts`
- `src/lib/api/reviews.ts`
- `src/lib/api/bookings.ts`
- `src/lib/api/editions.ts`

To switch to real API:
1. Set `USE_MOCK_DATA = false` in each file
2. Ensure your backend API is running and configured

To use mock data (current):
- Keep `USE_MOCK_DATA = true` (default)

## Mock Data Files

- `src/lib/mockData.ts` - Contains all mock data definitions

## Features

- **Realistic Data**: Properties include realistic Greek locations, pricing, and descriptions
- **Bilingual Support**: All text includes both English and Greek versions
- **Image Placeholders**: Uses Picsum Photos service for property images
- **Pagination Support**: Mock data supports pagination, filtering, and sorting
- **Network Simulation**: Includes small delays to simulate real API calls

## Testing

The mock data is designed to work seamlessly with all existing components:
- Property listings
- Property detail pages
- Search and filters
- Reviews display
- Booking creation and management
- Dashboard views

## Notes

- Property images use placeholder services (Picsum Photos)
- All mock data is generated at runtime, so it's fresh on each page load
- Reviews are generated dynamically for each property
- Bookings can be created and will use mock data
