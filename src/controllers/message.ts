import { Request, Response } from "express";
import models from "../models";
import { IMethodCreateMessage, IMethodGetMessages } from "../types/IMethods";
import { io } from "../plugins/socket";
import { IResponseCreateMessage, IResponseGetMessage } from "../types/IResponse";

const { Message, User } = models;

const gets = async (
  req: Request<{}, {}, {}, IMethodGetMessages>,
  res: Response<IResponseGetMessage>
) => {
  try {
    let query = {};
    if (req.user?.username) {
      const nameExp = new RegExp("^" + req.user?.username + "$", "i");
      query = { $or: [{ from: nameExp }, { to: nameExp }] };
    }
    const rawMessages = await Message.find(query);
    if (rawMessages.length < 0) {
        return res.status(404).json({
            status: false,
            message: "Messages is't found",
            messages: []
        })
    }
    const messages = rawMessages.map((message) => {
        let formself = false;
        if (message.from == req.user?.username) {
           formself = true;
        }
        return {
            ...message.toObject(),
            formself
        };
    });
    
    res.status(200).json({
        status: true,
        messages
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      messages: [],
    });
  }
};

const create = async (
  req: Request<{}, {}, IMethodCreateMessage>,
  res: Response<IResponseCreateMessage>
) => {
  try {
    const message = new Message(req.body);
    
    const isFreind = req.user?.freinds.includes(req.body.to);
    const user = await User.findOne({ username: req.body.to });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Hey this username is't found"
      })
    }
    if (!isFreind) {
      req.user?.freinds.push(req.body.to);
    }
    
    message.save();
    await req.user?.save();
    io.to(req.body.to).emit("message", message);
    res.status(200).json({
      status: true,
      message: "Message are sended"
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default {
  create,
  gets,
};
