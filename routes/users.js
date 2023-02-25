import express from 'express';
const router = express.Router();
import { updateUser, getAllUsers, getUser, deleteUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send('hello user, you are logged in');
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send('hello user, you are logged in and you can delete your account!');
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send('hello admin, you are logged in and you can delete all accounts!');
})
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getAllUsers);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;