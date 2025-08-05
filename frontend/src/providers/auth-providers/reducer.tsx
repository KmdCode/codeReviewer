import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>({
    [AuthActionEnums.registerDeveloperPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.registerDeveloperSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.registerDeveloperError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.loginUserPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.loginUserSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.loginUserError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.getDeveloperProfilePending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.getDeveloperProfileSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AuthActionEnums.getDeveloperProfileError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, INITIAL_STATE)