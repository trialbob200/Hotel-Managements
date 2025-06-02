
import * as React from 'react';

export enum RoomStatus {
  Vacant = 'Vacant',
  Booked = 'Booked',
  Maintenance = 'Maintenance',
}

export interface RoomType {
  id: string;
  name: string;
  costPerNight: number;
  description: string;
  features: string[];
  imageUrl: string;
  beds: number;
  capacity: number;
  status: RoomStatus;
}

export interface FoodCombo {
  id: string;
  name: string;
  costPerDay: number;
  description: string;
  items: string[];
  imageUrl: string;
}

export interface AdditionalService {
  id: string;
  name: string;
  cost: number;
  unit: 'per day' | 'per order' | 'per load' | 'per item';
  description?: string;
  icon?: React.ReactElement<{ className?: string }>;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  foodCombos: FoodCombo[];
  additionalServices: AdditionalService[];
  totalCost: number;
  bookingDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  invoiceUrl?: string; // Mock
  qrCodeUrl?: string; // Mock
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'admin';
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  schedule: string; // Simplified
}

export interface RevenueData {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  userName: string;
  requestType: 'Food' | 'Room Service' | 'Laundry' | 'Pool Access' | 'Other';
  details: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  requestedAt: string;
  roomId?: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  bookingId?: string;
  complaintText: string;
  status: 'Open' | 'Resolved' | 'Closed';
  submittedAt: string;
}

export interface DiscountCoupon {
  code: string;
  discountPercentage: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
}