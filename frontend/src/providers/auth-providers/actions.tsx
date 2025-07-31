import {createAction} from 'redux-actions';
import { IUser, IAuthStateContext } from './context';

export enum AuthActionEnums {
    //Register Developer
    registerDeveloperPending = "REGISTER_DEVELOPER_PENDING",
    registerDeveloperSuccess = "REGISTER_DEVELOPER_SUCCESS",
    registerDeveloperError = "REGISTER_DEVELOPER_ERROR",

    //Login
    loginUserPending = "LOGIN_USER_PENDING",
    loginUserSuccess = "LOGIN_USER_SUCCESS",
    loginUserError = "LOGIN_USER_ERROR",

}

export const registerDeveloperPending = createAction<IAuthStateContext>(
    AuthActionEnums.registerDeveloperPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const registerDeveloperSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.registerDeveloperSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user
        }
    )
)

export const registerDeveloperError = createAction<IAuthStateContext>(
    AuthActionEnums.registerDeveloperError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)

export const loginUserPending = createAction<IAuthStateContext>(
    AuthActionEnums.loginUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const loginUserSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.loginUserSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user
        }
    )
)

export const loginUserError = createAction<IAuthStateContext>(
    AuthActionEnums.loginUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)
