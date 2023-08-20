import { Router } from "express";
import auth from "./auth";
import user from "./user";
import message from "./message";

const router = Router();

router.use(auth);
router.use('/user', user);
router.use('/message', message);
export default router;