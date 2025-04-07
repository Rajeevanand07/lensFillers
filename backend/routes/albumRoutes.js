import express from "express";

import {
  createAlbum,
  getAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
} from "../controllers/albumController.js";
import { isAuthenticated } from "../config/isAuthenicated.js";
import upload from "../config/multer.js";

const router = express.Router();



router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "coupleImage", maxCount: 1 },
    { name: "landscapeImage", maxCount: 1 },
    { name: "weddingImages", maxCount: 30 },
    { name: "videoThumbnail", maxCount: 1 },
  ]),
  createAlbum
);

// Public routes
router.get("/", getAlbums);
router.get("/:id", getAlbum);

// Protected routes
router.delete("/:id", isAuthenticated, deleteAlbum);
router.patch(
  "/:id",
  isAuthenticated,
  upload.fields([
    { name: "coupleImage", maxCount: 1 },
    { name: "landscapeImage", maxCount: 1 },
    { name: "weddingImages", maxCount: 30 },
    { name: "videoThumbnail", maxCount: 1 },
  ]),
  updateAlbum
);

export default router;
