import express from 'express';
import { getUsers, createUsers, userAuth, getUser, followUser } from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/:id',getUser);
router.post('/',createUsers);
router.post('/valid',userAuth);
router.post('/follow/:id',followUser)

export default router;