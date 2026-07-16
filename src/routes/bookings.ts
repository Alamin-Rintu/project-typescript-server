import { Router } from "express";
import {
  bookItem,
  getMyBookings,
  getBookingStatsEndpoint,
} from "../controllers/booking";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const router = Router();

router.post("/", authMiddleware, bookItem);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.get("/stats", authMiddleware, getBookingStatsEndpoint);

export default router;
