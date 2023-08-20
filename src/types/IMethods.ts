import { Message, User } from "."

export interface IMethodRegister extends User {
    password: string;
};

export interface IMethodGetToken {
    phone: string;
};

export interface IMethodResetPassword {
    token: number;
    newPassword: string;
};

export interface IMethodChangePassword {
    newPassword: string;
    oldPassword: string;
};

export interface IMethodSendEmail {
    from: string;
    to: string;
    subject: string;
    html: string | Buffer
};

export interface IMethodGetProfile {
    search_key: string;
    search_value: string;
};

export interface IMethodGetProfiles {
    searchs: string[];
};

export interface IMethodUpdateProfile extends User {};

export interface IMethodCreateMessage extends Message {};

export interface IMethodGetMessages {
    me: string;
};