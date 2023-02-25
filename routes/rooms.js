import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router; 