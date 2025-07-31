import { createContext } from "react";

export interface IUser {
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
}

export interface IAuthActionContext {
    registerDeveloper: (user: IUser) => void;
    loginUser: (user: IUser) => void;
}

export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext>(undefined!);