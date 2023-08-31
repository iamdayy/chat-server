import model from "../models";
import  jwt, { JwtPayload } from "jsonwebtoken";
import { Setting, User } from "../types";
import { IMethodChangePassword, IMethodGetToken, IMethodRegister, IMethodResetPassword } from "../types/IMethods";
import { Request, Response } from "express";
import { ExtractJwt } from "passport-jwt";
import { IResponseChangePassword, IResponseLogin, IResponseRefreshJWT, IResponseRegister, IResponseReqToken, IResponseResetPassword } from "../types/IResponse";
import configuration from "../services/config";
const { User } = model;

const register = async (req: Request<{}, IResponseRegister, IMethodRegister>, res: Response<IResponseRegister>) => {
    const user: IMethodRegister = req.body;
    user.setting = {
        notification: true,
        language: 'id',
        wallpaper: '',
        wpOpacity: 1
    } as Setting;
    User.register(user, user.password, (err, user) => {
        if (err) {
           return res.status(400).json(err);
        }
        return res.status(200).json(user)
    })
}

const login = async (req: Request, res: Response<IResponseLogin>) => {
    if (req.user) {
        const jwt_token = jwt.sign({user: req.user.username }, configuration.SECRET, {
            expiresIn: '2d',
        });
        const jwt_refresh = jwt.sign({ user: req.user.username }, configuration.SECRET, {
            expiresIn: '30d',
        });
        const response = {
            status: true,
            jwt_token,
            jwt_refresh
        }
        res.status(200).json(response);
        return;
    };
    res.status(200).json(req.user);
}

const refreshJWT = async (req: Request, res: Response<IResponseRefreshJWT>) => {
    try {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (token) {
            const JWT = jwt.verify(token, configuration.SECRET, (err, decoded) => {
                if (err) {
                    return res.status(404).json({ status: false, message: 'Your token is expires' });
                }
                return decoded
            }) as JwtPayload | undefined;
            const jwt_token = jwt.sign({ user: JWT?.user }, configuration.SECRET, {
                expiresIn: '2d'
            })
            const response = {
                status: true,
                jwt_token
            }
            res.status(200).json(response);
            
        }
    } catch (error) {
        
    }
}

const reqToken = async (req: Request<IMethodGetToken>, res: Response<IResponseReqToken>) => {
    try {
        const user = await User.findOne({ phone: req.params.phone});
        if (!user) {
            res.status(404).json({ status: false, message: 'your account is not found' });
            return;
        }
        user.getToken();
        res.status(200).json({
            status: true,
            message: "your token is send to"
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const resetPassword = async (req: Request<{}, IMethodResetPassword>, res: Response<IResponseResetPassword>) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({
                status: false
            })
        }
        const response = await user.checkToken(token);
        if (response.status) {
            user.setPassword(newPassword);
            user.save();
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            status: false
        })
        
    }
}

const changePassword = async (req: Request<{}, IMethodChangePassword>, res: Response<IResponseChangePassword>) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        user?.changePassword(oldPassword, newPassword);
        user?.save();
        res.status(200).json({
            status: true,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
        })
        
    }
}

const auth = {
    register,
    login,
    resetPassword,
    reqToken,
    changePassword,
    refreshJWT
}
export default auth; 