import { SentMessageInfo, createTransport } from "nodemailer";
import { IMethodSendEmail } from "../types/IMethods";
import configuration from "./config";

const transporter = createTransport({
    service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: configuration.EMAIL,
    pass: configuration.PASSWORD,
  },
});

export const sendEmail = async (mailDetails: IMethodSendEmail, callback: (done: SentMessageInfo | false, err: any | false) => Promise<SentMessageInfo | false>) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info, false);
    } catch (error) {
      console.log(error);
    } 
  };