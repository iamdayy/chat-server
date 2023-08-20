import { Router } from "express";
import auth from "../controllers/auth";
import passport from "passport";
import { IResponseChangePassword, IResponseRegister, IResponseResetPassword } from "../types/IResponse";

const router = Router();

router.post<'/signup', {}, IResponseRegister>('/signup', auth.register);
router.post('/signin', passport.authenticate('local', { session: false }), auth.login);
router.get('/get-token/:phone', auth.reqToken);
router.get('/refresh', auth.refreshJWT);
router.post<'/reset-password', {}, IResponseResetPassword>('/reset-password', auth.resetPassword);
router.post<'/change-password', {}, IResponseChangePassword>('/change-password', passport.authenticate('jwt', { session: false }), auth.changePassword);

export default router;