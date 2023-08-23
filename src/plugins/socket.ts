import { Server } from "socket.io";
import { Server as httpServer } from "http";
import User from "../models/User";
let io: Server;

export default (app: httpServer) => {
    io = new Server(app, {
        cors: {
            origin: '*'
        }
    });
    io.use(async (socket, next) => {
        const userID = socket.handshake.auth.username;
        
        if (!userID) {
            return next(new Error("please apply userID"));
        }
        const username = await User.findOne({ username: userID });
        if (!username) {
          return next(new Error("invalid userID"));
        }
        socket.username = userID;
        next();
    });
    io.on("connection", (socket) => {
        User.findOneAndUpdate({ email: socket.username }, { active: true }).then(() => {
            socket.join(socket.username);
            socket.broadcast.emit("active", socket.username);
        })
        socket.on("disconnect", () => {
            User.findOneAndUpdate({ email: socket.username }, { active: false }).then(() => {
                socket.broadcast.emit("inactive", socket.username);
            })
        })
      })
}

export {
    io
};