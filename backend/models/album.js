import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    couple: { type: String, required: true },
    cardDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    coupleImage: { type: String, required: true },
    landscapeImage: { type: String, required: true },
    weddingImages: { type: [String], required: true },
    videoThumbnail: { type: String, required: true },
    weddingVideoLink: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    videoDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);
export default Album;
