import express from 'express';
import User from '../models/User.js';
import { createError } from '../utils/error.js';
import { deleteUser, getAllUser, getUser, updateUser } from '../controller/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("hello user")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("hello user you can delete your account")
// })

// router.get('/checkadmin', verifyAdmin, (req, res, next) => {
//     res.send("hello admin you can delete your account")
// })

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyUser, deleteUser)

//GET
router.get('/:id', verifyUser, getUser)

//GETALL
router.get('/', verifyAdmin, getAllUser)

export default router;