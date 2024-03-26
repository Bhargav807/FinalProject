import express from "express";
import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js";
import { addColdStorageController, getColdStorageController } from "../controllers/ColdStorageController.js";

const router = express.Router();

//routes

router.post('/add-coldstorage',addColdStorageController);

router.get('/get-all-coldstorage',getColdStorageController);
export default router;