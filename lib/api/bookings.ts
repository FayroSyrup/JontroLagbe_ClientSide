"use server";

import { API_BASE_URL } from "@/lib/config";
import { authFetch, protectedMutation } from "@/lib/core/server";
import type { BookingFormData, BookingRow } from "@/lib/types/booking";
import type { Paged } from "@/lib/types/equipment";

const EMPTY_BOOKINGS: Paged<BookingRow> = { data: [], total: 0, page: 1, totalPages: 0 }

const getPagedBookings = async (path: string, page: number): Promise<Paged<BookingRow>> => {
    const res = await authFetch(`${API_BASE_URL}${path}?page=${page}&limit=8`)
    return res.ok ? res.json() : EMPTY_BOOKINGS
}

export async function getMyBookings(page = 1) {
    return getPagedBookings("/bookings/mine", page)
}

export async function getOwnerBookings(page = 1) {
    return getPagedBookings("/bookings/owner", page)
}

export async function getAllBookings(page = 1) {
    return getPagedBookings("/bookings", page)
}

export async function createBooking(data: BookingFormData) {
  const res = await protectedMutation(`${API_BASE_URL}/bookings`, "POST", data);
  const result = await res.json();
  return {
    ok: res.ok,
    message: result.message as string | undefined,
    bookingId: result.insertedId as string | undefined,
  };
}

export async function getBookingById(id: string): Promise<BookingRow | null> {
  const res = await authFetch(`${API_BASE_URL}/bookings/${id}`);
  if (!res.ok) return null;
  return res.json();
}
