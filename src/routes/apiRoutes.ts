import express from 'express';
import multer from 'multer';
import {
  uploadAndConvertMp4,
  getMp3FileByFileName,
} from '../contollers/mp3Controller'; // Import the controller functions

const router = express.Router();

// Create a multer storage configuration
const storage = multer.memoryStorage(); // Store the uploaded file in memory as a Buffer

// Create a multer instance with the storage configuration
const upload = multer({ storage });

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// File upload and conversion route
router.post('/convert', upload.single('mp4File'), uploadAndConvertMp4); // Use the controller function

// Get MP3 file by name route
router.get('/mp3File/:filename', getMp3FileByFileName);

export default router;
