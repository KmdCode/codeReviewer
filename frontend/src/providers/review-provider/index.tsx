"use client"
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { Violation } from "@/utils/analyzer/staticAnalyzer";
import { INITIAL_STATE, ICode, ReviewActionContext, ReviewStateContext } from "./context";
import { ReviewReducer } from "./reducer";
import { analyzeCSharpCodePending, analyzeCSharpCodeSuccess, analyzeCSharpCodeError } from "./actions";

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(ReviewReducer, INITIAL_STATE);
    const instance = axiosInstance;


    const analyzeCSharpCode= async (code: string) => {
        dispatch(analyzeCSharpCodePending());

        const endpoint: string = '/services/app/StaticAnalyzer/Analyze';

        await instance.post(endpoint, code)
        .then((response) => {
            dispatch(analyzeCSharpCodeSuccess(response.data.result))
            console.log("Results: ", response.data.result)
        }).catch((error) => {
            dispatch(analyzeCSharpCodeError());
            console.error(error.message)
        })
    }

    return (
        <ReviewStateContext.Provider value={state}>
            <ReviewActionContext.Provider value={{ analyzeCSharpCode}}>
                {children}
            </ReviewActionContext.Provider>
        </ReviewStateContext.Provider>
    )
}

export const useReviewState = () => {
    const context = useContext(ReviewStateContext);
    if (!context) {
        throw new Error('useReviewState must be used within a ReviewProvider');
    }
    return context;
}

export const useReviewActions = () => {
    const context = useContext(ReviewActionContext);
    if (!context) {
        throw new Error('useReviewActions must be used within a ReviewProvider')
    }
    return context;
}