
// This is the SereneStays constants file.
import { RoomType, RoomStatus, FoodCombo, AdditionalService, StaffMember, RevenueData, ServiceRequest, Complaint, DiscountCoupon } from './types';
import React from 'react'; // Keep React import if SVGs are included here

// --- SVG Icons (Heroicons) ---
export const BedIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
export const TvIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75V16.5m0 0H18M6 16.5h6.75m0 0H6m12 0a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018 4.5H6A2.25 2.25 0 003.75 6.75v7.5A2.25 2.25 0 006 16.5z" />
  </svg>
);
export const WifiIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.75 20.25h-.5A2.25 2.25 0 0110 18V7.5a2.25 2.25 0 012.25-2.25h.5A2.25 2.25 0 0115 7.5v10.5a2.25 2.25 0 01-2.25 2.25z" />
  </svg>
);
export const FanIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => ( // Simple placeholder
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-4-4l4 4 4-4m-8.5-5.5a.75.75 0 100-1.5.75.75 0 000 1.5zM12 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM16.5 8.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);
export const JacuzziIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => ( // Simple placeholder
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h.008c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H12Zm0 0h.008m0 0H12Zm0 0h.008m0 0H12ZM7.5 19.5V15m0 0V6.75M7.5 15h9M7.5 15H3M7.5 15H6" />
    </svg>
);
export const BalconyIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => ( // Simple placeholder
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12.75h6M9 18.75h6" />
    </svg>
);
export const AirConIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12H6m12 0h.75m-4.5-5.25V6" />
  </svg>
);
export const PoolIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12H5.25m13.5 0H19.5M5.121 17.804A13.461 13.461 0 0112 15c2.596 0 5.026.736 7.079 2.007M6.973 7.61A15.014 15.014 0 0112 6c2.357 0 4.584.554 6.55 1.504M3 10.5h18M3 13.5h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.866 0-7-1.79-7-4s3.134-4 7-4 7 1.79 7 4-3.134 4-7 4z" />
  </svg>
);
export const LaundryIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9.75A2.25 2.25 0 0019.5 7.5h-15a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m-3-3h6m-9-3.75h12M12 5.25A2.25 2.25 0 009.75 3h-4.5A2.25 2.25 0 003 5.25V6" />
  </svg>
);
export const IronIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5L8.25 12.75 4.5 9l7.5-7.5 4.5 3zm-7.5 12.75h11.25l-2.625 2.625a2.25 2.25 0 01-3.182 0L9 17.25zm0 0L4.5 12.75m0 0L9 17.25m0 0l4.5-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const RoomServiceIcon = ({ className = "w-6 h-6" }: { className?: string }): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);


// --- Mock Data ---
export const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: 'std-single',
    name: 'Standard Single Room',
    costPerNight: 1200,
    description: 'Cozy room for solo travelers, offering comfort and essential amenities.',
    features: ['1 Single Bed', 'Ceiling Fan', 'Attached Washbasin', 'Common Toilet Access', 'Writing Desk'],
    imageUrl: 'https://picsum.photos/seed/std-single/600/400',
    beds: 1,
    capacity: 1,
    status: RoomStatus.Vacant,
  },
  {
    id: 'dbl-attached',
    name: 'Double Bedroom with Attached Toilet',
    costPerNight: 2500,
    description: 'Spacious room perfect for couples or friends, with private toilet and entertainment.',
    features: ['2 Double Beds', 'Attached Western Toilet', 'Small TV', 'Free Wi-Fi', 'Wardrobe'],
    imageUrl: 'https://picsum.photos/seed/dbl-attached/600/400',
    beds: 2,
    capacity: 2,
    status: RoomStatus.Vacant,
  },
  {
    id: 'lux-suite',
    name: 'Luxury Suite with Balcony and Jacuzzi',
    costPerNight: 5500,
    description: 'Experience ultimate luxury with breathtaking views, a private Jacuzzi, and premium amenities.',
    features: ['King-Size Bed', 'Attached Bath with Jacuzzi', 'Private Balcony', 'Air Conditioning', 'Smart TV (55")', 'Minibar', 'Coffee Maker'],
    imageUrl: 'https://picsum.photos/seed/lux-suite/600/400',
    beds: 1,
    capacity: 2, // Could be more for families
    status: RoomStatus.Booked,
  },
   {
    id: 'family-room',
    name: 'Family Room with View',
    costPerNight: 3800,
    description: 'Large room designed for families, offering ample space and beautiful views.',
    features: ['1 King Bed', '2 Single Beds', 'Attached Bathroom', 'Large TV', 'Free Wi-Fi', 'Seating Area'],
    imageUrl: 'https://picsum.photos/seed/family-room/600/400',
    beds: 3,
    capacity: 4,
    status: RoomStatus.Maintenance,
  },
];

export const MOCK_FOOD_COMBOS: FoodCombo[] = [
  {
    id: 'veg-classic',
    name: 'Veg Classic Combo',
    costPerDay: 250,
    description: 'A delightful and fulfilling classic Indian vegetarian meal.',
    items: ['Paneer Butter Masala', 'Dal Fry', '2 Rotis', 'Steamed Rice', 'Salad', 'Sweet'],
    imageUrl: 'https://picsum.photos/seed/veg-classic/400/300',
  },
  {
    id: 'veg-deluxe',
    name: 'Veg Deluxe Combo',
    costPerDay: 450,
    description: 'An exquisite and elaborate vegetarian thali for a grand dining experience.',
    items: ['Starter (Paneer Tikka)', '2 Veg Sabzis (e.g., Mix Veg, Palak Paneer)', 'Dal Makhani', 'Jeera Rice', '4 Rotis/Naan', 'Dessert (Gulab Jamun)', 'Beverage (Lassi/Soft Drink)'],
    imageUrl: 'https://picsum.photos/seed/veg-deluxe/400/300',
  },
];

export const MOCK_ADDITIONAL_SERVICES: AdditionalService[] = [
  { id: 'pool', name: 'Swimming Pool Access', cost: 300, unit: 'per day', description: 'Enjoy a refreshing dip in our pristine pool.', icon: <PoolIcon className="w-5 h-5 mr-2" /> },
  { id: 'room-service-late', name: 'Late-night Room Service', cost: 500, unit: 'per order', description: 'For orders placed after 12:00 AM.', icon: <RoomServiceIcon className="w-5 h-5 mr-2" /> },
  { id: 'laundry', name: 'Laundry Service', cost: 200, unit: 'per load', description: 'Up to 5kg of clothing.', icon: <LaundryIcon className="w-5 h-5 mr-2" /> },
  { id: 'ironing', name: 'Ironing Service', cost: 50, unit: 'per item', description: 'Crisp and clean.', icon: <IronIcon className="w-5 h-5 mr-2" /> },
];

export const MOCK_STAFF: StaffMember[] = [
    { id: 'staff-1', name: 'Rajesh Kumar', role: 'Manager', schedule: '9 AM - 5 PM' },
    { id: 'staff-2', name: 'Priya Sharma', role: 'Receptionist', schedule: '8 AM - 4 PM' },
    { id: 'staff-3', name: 'Amit Singh', role: 'Housekeeping', schedule: '7 AM - 3 PM' },
];

export const MOCK_REVENUE: RevenueData = {
    daily: 15500,
    weekly: 98500,
    monthly: 380000,
};

export const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
    { id: 'req-1', userId: 'guest-123', userName: 'Aarav Patel', requestType: 'Food', details: 'Order 2 Veg Deluxe Combos to Room 101', status: 'Pending', requestedAt: new Date(Date.now() - 3600000).toISOString(), roomId: 'std-single' },
    { id: 'req-2', userId: 'guest-456', userName: 'Saanvi Sharma', requestType: 'Laundry', details: '1 load of laundry from Room 202', status: 'In Progress', requestedAt: new Date(Date.now() - 7200000).toISOString(), roomId: 'dbl-attached' },
];

export const MOCK_COMPLAINTS: Complaint[] = [
    { id: 'comp-1', userId: 'guest-789', userName: 'Vivaan Gupta', bookingId: 'book-abc', complaintText: 'Wi-Fi in Room 301 is very slow.', status: 'Open', submittedAt: new Date(Date.now() - 86400000).toISOString() },
];

export const MOCK_DISCOUNT_COUPONS: DiscountCoupon[] = [
    { code: 'WELCOME10', discountPercentage: 10, isActive: true },
    { code: 'SERENE20', discountPercentage: 20, isActive: true },
    { code: 'EXPIRED5', discountPercentage: 5, isActive: false },
];

export const APP_NAME = "SereneStays";
export const DEFAULT_CURRENCY = "₹";

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
];

export const TEXTS: Record<string, Record<string, string>> = {
  en: {
    welcome: `Welcome to ${APP_NAME}`,
    bookNow: "Book Now",
    roomTypes: "Room Types",
    ourServices: "Our Services",
    // Add more general texts
  },
  hi: {
    welcome: `${APP_NAME} में आपका स्वागत है`,
    bookNow: "अभी बुक करें",
    roomTypes: "कमरे के प्रकार",
    ourServices: "हमारी सेवाएं",
    // Add more general texts
  }
};
