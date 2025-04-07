import express from "express";
const router = express.Router();
import {sendContactMail} from '../controllers/contactController.js';

router.post('/', sendContactMail);

export default router;
