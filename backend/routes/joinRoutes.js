import express from "express";
const router = express.Router();
import {sendJoiningMail} from '../controllers/joinController.js';

router.post('/', sendJoiningMail);

export default router;