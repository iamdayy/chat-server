import { Message, User } from ".";

export interface IResponse {
    status: boolean;
    message?: string;
};

export interface IResponseRegister extends IResponse {};

export interface IResponseLogin extends IResponse {
    jwt_token: string;
    jwt_refresh: string; 
};

export interface IResponseRefreshJWT extends IResponse {
    jwt_token?: string;
};

export interface IResponseReqToken extends IResponse {};

export interface IResponseResetPassword extends IResponse {};

export interface IResponseChangePassword extends IResponse {};

export interface IResponseGetProfile extends IResponse, Partial<User> {};

export interface IResponseUpdateProfile extends IResponse {};

export interface IResponseGetProfiles extends IResponse {
    accounts?: User[];
};

export interface IResponseGetMe extends IResponse, Partial<User> {};

export interface IResponseCreateMessage extends IResponse {};

export interface IResponseGetMessage extends IResponse {
    messages: Message[];
};