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

    //Get Developer Profile
    getDeveloperProfilePending = "GET_DEVELOPER_PROFILE_PENDING",
    getDeveloperProfileSuccess = "GET_DEVELOPER_PROFILE_SUCCESS",
    getDeveloperProfileError = "GET_DEVELOPER_PROFILE_ERROR",

    //Update Developer Profile
    updateDeveloperProfilePending = "UPDATE_DEVELOPER_PROFILE_PENDING",
    updateDeveloperProfileSuccess = "UPDATE_DEVELOPER_PROFILE_SUCCESS",
    updateDeveloperProfileError = "UPDATE_DEVELOPER_PROFILE_ERROR"
    
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

export const getDeveloperProfilePending = createAction<IAuthStateContext>(
    AuthActionEnums.getDeveloperProfilePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const getDeveloperProfileSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.getDeveloperProfileSuccess, (profile: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            profile
        }
    )
)

export const getDeveloperProfileError = createAction<IAuthStateContext>(
    AuthActionEnums.getDeveloperProfileError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)

export const updateDeveloperProfilePending = createAction<IAuthStateContext>(
    AuthActionEnums.updateDeveloperProfilePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const updateDeveloperProfileSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.updateDeveloperProfileSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user
        }
    )
)

export const updateDeveloperProfileError = createAction<IAuthStateContext>(
    AuthActionEnums.updateDeveloperProfileError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)