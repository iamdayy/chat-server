import { Router } from "express";
import controller from "../controllers";
import passport from "passport";
import { IResponseUpdateProfile } from "../types/IResponse";

const router = Router();

const { user } = controller;

router.get("/", passport.authenticate('jwt', { session: false }), user.getProfile);
router.get("/many", passport.authenticate('jwt', { session: false }), user.getProfiles);
router.get("/me", passport.authenticate('jwt', { session: false }), user.getMe);
router.put<'/me', {}, IResponseUpdateProfile>("/me", passport.authenticate('jwt', { session: false }), user.updateProfile);

export default router;