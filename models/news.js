import mongoose from "mongoose";


const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  source: {
    type: {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: false
      }
    },
    required: true
  },
  images: {
    type: [String],
    required: false
  },
  url: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
