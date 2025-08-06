import { createContext } from "react";

export interface IUser {
    id?:string;
    name?: string,
    surname?: string,
    userName?: string,
    email?: string,
    password?: string,
    userNameOrEmailAddress?: string,
}

export interface IAuthStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean; 
    user?:IUser;
    profile?: IUser | null;
}

export interface IAuthActionContext {
    registerDeveloper: (user: IUser) => void;
    loginUser: (user: IUser) => void;
    getDeveloperProfile: ()  => void;
    updateDeveloperProfile: (user: IUser) => void;
}

export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    profile: null
}

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext>(undefined!);