import { User, Message } from ".";
import { Document, PassportLocalDocument } from "mongoose";

export interface userschema extends User, PassportLocalDocument {
    token: number;
    tokenExpires: Date;
    getToken: () => Promise<void>
    checkToken: (token: string) => Promise<{ status: boolean; message: string }>
}

export interface messageschema extends Message, Document {

}