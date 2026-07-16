import { Response } from "express";
import {
  createBooking,
  getUserBookings,
  getBookingStats,
} from "../models/Booking";
import { AuthRequest } from "../middleware/auth";

export const bookItem = async (req: AuthRequest, res: Response) => {
  try {
    const {
      propertyId,
      propertyTitle,
      propertyImage,
      propertyLocation,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    } = req.body;

    if (!propertyId || !propertyTitle || !checkIn || !checkOut || !totalPrice) {
      return res.status(400).json({
        message: "Property ID, title, check-in, check-out, and price are required",
      });
    }

    const result = await createBooking({
      propertyId,
      propertyTitle,
      propertyImage: propertyImage || "",
      propertyLocation: propertyLocation || "",
      userId: req.user!.userId,
      userName: req.user!.email.split("@")[0] || "Guest",
      userEmail: req.user!.email,
      checkIn,
      checkOut,
      guests: guests || 1,
      totalPrice: Number(totalPrice),
      status: "confirmed",
    });

    res.status(201).json({
      message: "Booking confirmed successfully!",
      bookingId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error creating booking" });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getUserBookings(req.user!.userId);
    const bookingsWithStringIds = bookings.map((b) => ({
      ...b,
      _id: b._id!.toString(),
    }));
    res.json({ bookings: bookingsWithStringIds });
  } catch (error) {
    console.error("Get my bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookingStatsEndpoint = async (req: AuthRequest, res: Response) => {
  try {
    // If user is admin and a userId query param is provided, get stats for that user
    // Otherwise, for regular users, return their own stats
    const targetUserId =
      req.query.userId && req.user?.role === "admin"
        ? (req.query.userId as string)
        : req.user?.userId;

    const stats = await getBookingStats(targetUserId);
    res.json(stats);
  } catch (error) {
    console.error("Booking stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
