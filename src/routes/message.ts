import { Router } from "express";
import message from "../controllers/message";
import passport from "passport";
const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), message.create);
router.get('/', passport.authenticate('jwt', { session: false }), message.gets);

export default router;