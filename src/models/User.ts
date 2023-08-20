import { Schema, model, PassportLocalDocument, Model } from "mongoose";
import PasspoLocalMongoose from "passport-local-mongoose";
import { userschema } from "../types/Schemas";
import { usermodel } from "../types/Models";
import { randomInt } from "crypto";
import { sendEmail } from "../services/mailer";
import { IMethodSendEmail } from "../types/IMethods";
import HTML_TEMPLATE from "../assets/html-template";

const UserSchema: Schema<userschema> = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: {
      first: String,
      last: String,
    },
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false
  },
  freinds: {
    type: [String],
  },
  requests: {
    type: [String],
  },
  token: {
    type: Number,
  },
  tokenExpires: {
    type: Date,
  },
});
UserSchema.plugin(PasspoLocalMongoose);
UserSchema.methods.getToken = function (this: userschema) {
  const user = this;
  const token = randomInt(1000, 10000);
  user.token = token;
  user.tokenExpires = new Date(Date.now() + 10000000);
  user.save();
//   const EMAIL: IMethodSendEmail = {
//     from: "iamdayy14@gmail.com",
//     to: user.email,
//     subject: "You have new token from whosapp",
//     html: HTML_TEMPLATE(token)
//   }
//   sendEmail(EMAIL, async (done, err) => {
//     if (done) {
//         return;
//     }
//     if (err) {
//         console.log(err);
//     }
//   })
};
UserSchema.methods.checkToken = function (this: userschema, token: number) {
    if (this.token == token) {
        if (this.tokenExpires > new Date(Date.now())) {
            return {
                status: true,
            }
        }
        return {
            status: false,
            message: "Your token is expires"
        }
    }
    return {
        status: false,
        message: "Your token is not exist"
    }
}
export default model<userschema, usermodel>("User", UserSchema);
