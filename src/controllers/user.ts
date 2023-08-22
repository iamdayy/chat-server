import models from "../models";
import { Request, Response } from "express";
import { IMethodGetProfile, IMethodGetProfiles, IMethodUpdateProfile } from "../types/IMethods";
import { IResponseGetMe, IResponseGetProfile, IResponseGetProfiles, IResponseUpdateProfile } from "../types/IResponse";
const { User } = models;

const getMe = async (req: Request, res: Response<IResponseGetMe>) => {
    if (!req.user) {
        return res.status(401).json({
            status: false,
            message: "Your data is't found"
        });
    }
    res.status(200).json({
        status: true,
        account: req.user
    })
};

const getProfile = async (req: Request<{}, {}, {}, IMethodGetProfile>, res: Response<IResponseGetProfile>) => {
    try {
        const { search_key, search_value } = req.query
        const query = {} as {
            [key: string]: string
        };

    if (search_key !== '' && search_value !== '') {
      query[search_key] = search_value;
    }
        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Account is't found"
            })
        }
        res.status(200).json({
            status: true,
            username: user.username,
            email: user.email,
            phone: user.phone,
            bio: user.bio,
            name: user.name
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

const getProfiles = async (req: Request<{}, {}, {}, IMethodGetProfiles>, res: Response<IResponseGetProfiles>) => {
    try {
        const { searchs } = req.query
        const user = await User.find({ username : { $in: searchs } }).select("username, email, phone, bio, name");
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Account is't found"
            })
        }
        res.status(200).json({
            status: true,
            accounts: user
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

const updateProfile = async (req:Request<{}, IMethodUpdateProfile>, res: Response<IResponseUpdateProfile>) => {
    try {
        const id = req.user?._id
        const user = await User.findById(id);
        user?.updateOne(req.body);
        user?.save();
        res.status(200).json({
            status: true,
            message: "Your account is updated"
        })
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
};


export default {
    getProfile,
    getProfiles,
    getMe,
    updateProfile,
}