"use client"
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, IUser, AuthStateContext, AuthActionContext } from "./context";
import { AuthReducer } from "./reducer";
import { AbpTokenProperies, decodeToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import { 
    registerDeveloperPending, 
    registerDeveloperSuccess, 
    registerDeveloperError, 
    loginUserPending,
    loginUserSuccess,
    loginUserError
} from "./actions";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const instance = axiosInstance;
    const router = useRouter();

    const registerDeveloper = async (user: IUser) => {
        dispatch(registerDeveloperPending());
        const endpoint: string = '/services/app/Developer/Create';

        await instance.post(endpoint, user)
            .then((response) => {
                dispatch(registerDeveloperSuccess(response.data))
                router.push('/login')
            }).catch((error) => {
                dispatch(registerDeveloperError())
                console.log(error)
                console.log(error.message)
            })
    }

    const loginUser = async (user: IUser) => {
        dispatch(loginUserPending());
        const endpoint = `/TokenAuth/Authenticate`;

        await instance
    .post(endpoint, user)
    .then((response) => {
      const token = response.data.result.accessToken;

      const decoded = decodeToken(token);
      const userRole = decoded[AbpTokenProperies.role];

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", userRole);

      dispatch(loginUserSuccess(token));
      router.push('/homepage');
    })
    .catch((error) => {
      console.error(error);
      dispatch(loginUserError());
    });
    }

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionContext.Provider value={{ registerDeveloper, loginUser}}>
                {children}
            </AuthActionContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}

export const useAuthActions = () => {
    const context = useContext(AuthActionContext);
    if (!context) {
        throw new Error('useAuthActions must be used within a AuthProvider')
    }
    return context;
}