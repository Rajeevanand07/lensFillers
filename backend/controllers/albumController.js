import Album from "../models/album.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import streamifier from 'streamifier';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const uploadToCloudinary = async (buffer, folder) => {
  let retryCount = 0;

  const uploadWithRetry = async () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
          folder,
          resource_type: 'auto',
          chunk_size: 10000000 // 10MB chunks
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            if (retryCount < MAX_RETRIES) {
              retryCount++;
              console.log(`Retrying upload (${retryCount}/${MAX_RETRIES})...`);
              setTimeout(() => {
                uploadWithRetry().then(resolve).catch(reject);
              }, RETRY_DELAY);
              return;
            }
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  return uploadWithRetry();
};

export const createAlbum = async (req, res) => {
  try {
    const { couple, cardDescription, detailedDescription,weddingVideoLink, videoDescription, date, venue } = req.body;

    const coupleImageArray = req.files["coupleImage"];
    const landscapeImageArray = req.files["landscapeImage"];
    const weddingImagesArray = req.files["weddingImages"];
    const videoThumbnailArray = req.files["videoThumbnail"];

    if (!coupleImageArray?.length || !landscapeImageArray?.length) {
      return res.status(400).json({ message: "Please upload both couple and landscape images." });
    }

    if (!weddingImagesArray?.length) {
      return res.status(400).json({ message: "Please upload at least one wedding image." });
    }

    const coupleImage = await uploadToCloudinary(coupleImageArray[0].buffer, "lensfiller/albums/coupleImages");
    const landscapeImage = await uploadToCloudinary(landscapeImageArray[0].buffer, "lensfiller/albums/landscapeImages");

    const weddingImages = await Promise.all(
      weddingImagesArray.map(file => uploadToCloudinary(file.buffer, "lensfiller/albums/weddingImages"))
    );

    const videoThumbnail = await uploadToCloudinary(videoThumbnailArray[0].buffer, "lensfiller/albums/videoThumbnails");

    const newAlbum = new Album({
      couple,
      cardDescription,
      detailedDescription,
      coupleImage,
      landscapeImage,
      weddingImages,
      videoThumbnail,
      weddingVideoLink,
      videoDescription,
      date,
      venue
    });

    await newAlbum.save();

    res.status(201).json({ message: "Album created successfully", album: newAlbum });

  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    console.log(albums);
    res.status(200).json({message:"heloo",albums});
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAlbum = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.status(200).json(album);
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPublicIdFromUrl = (url) => {
  try {
    const match = url.match(/lensfiller\/albums\/(.*)\.\w+/);
    return match && match[1] ? `lensfiller/albums/${match[1]}` : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    const imagesToDelete = [album.coupleImage, album.landscapeImage, ...album.weddingImages, album.videoThumbnail];

    await Promise.all(imagesToDelete.map(async (imageUrl) => {
      const publicId = getPublicIdFromUrl(imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }));

    await Album.findByIdAndDelete(req.params.id);

    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { couple, cardDescription, detailedDescription, weddingVideoLink, videoDescription, date, venue } = req.body;
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    if (couple) album.couple = couple;
    if (cardDescription) album.cardDescription = cardDescription;
    if (detailedDescription) album.detailedDescription = detailedDescription;

    if (req.files["coupleImage"]?.length) {
      const oldPublicId = getPublicIdFromUrl(album.coupleImage);
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
      album.coupleImage = await uploadToCloudinary(req.files["coupleImage"][0].buffer, "lensfiller/albums/coupleImages");
    }

    if (req.files["landscapeImage"]?.length) {
      const oldPublicId = getPublicIdFromUrl(album.landscapeImage);
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
      album.landscapeImage = await uploadToCloudinary(req.files["landscapeImage"][0].buffer, "lensfiller/albums/landscapeImages");
    }

    if (req.files["weddingImages"]?.length) {
      // Delete all previous wedding images
      for (const imageUrl of album.weddingImages) {
        const publicId = getPublicIdFromUrl(imageUrl);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      // Upload new wedding images
      const newWeddingImages = await Promise.all(
        req.files["weddingImages"].map(file => uploadToCloudinary(file.buffer, "lensfiller/albums/weddingImages"))
      );
      album.weddingImages = newWeddingImages;
    }

    if (req.files["videoThumbnail"]?.length) {
      const oldPublicId = getPublicIdFromUrl(album.videoThumbnail);
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
      album.videoThumbnail = await uploadToCloudinary(req.files["videoThumbnail"][0].buffer, "lensfiller/albums/videoThumbnails");
    }

    if (weddingVideoLink) album.weddingVideoLink = weddingVideoLink;
    if (videoDescription) album.videoDescription = videoDescription;
    if (date) album.date = date;
    if (venue) album.venue = venue;

    await album.save();

    res.json({ message: "Album updated successfully", album });
  } catch (error) {
    console.error("Error in updateAlbum:", error);
    res.status(500).json({ message: error.message });
  }
};
