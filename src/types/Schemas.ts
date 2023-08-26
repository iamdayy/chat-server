import { User, Message, Setting } from ".";
import { Document, PassportLocalDocument } from "mongoose";

export interface userschema extends User, PassportLocalDocument {
    token: number;
    tokenExpires: Date;
    getToken: () => Promise<void>
    checkToken: (token: string) => Promise<{ status: boolean; message: string }>
}

export interface settingschema extends Setting, Document {

}

export interface messageschema extends Message, Document {

}