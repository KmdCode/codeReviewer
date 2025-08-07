"use client"
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { Violation } from "@/utils/analyzer/staticAnalyzer";
import { INITIAL_STATE, ICode, ReviewActionContext, ReviewStateContext, IReview } from "./context";
import { ReviewReducer } from "./reducer";
import { 
    analyzeCSharpCodePending, 
    analyzeCSharpCodeSuccess, 
    analyzeCSharpCodeError,
    getSavedReviewsPending,
    getSavedReviewsSuccess,
    getSavedReviewsError,
    saveReviewPending,
    saveReviewSuccess,
    saveReviewError
} from "./actions";

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

    const saveReview = async (review: IReview) => {
        dispatch(saveReviewPending());

        const endpoint: string = '/services/app/Review/Create';

        await instance.post(endpoint, review)
        .then((response) => {
            dispatch(saveReviewSuccess(response.data))
        }).catch((error)=>{
            dispatch(saveReviewError());
            console.error(error.message);
        })
    }

    const getSavedReviews = async () => {
        dispatch(getSavedReviewsPending());

        const endpoint = '/services/app/Review/GetAll';

        await instance.get(endpoint)
        .then((response) => {
            dispatch(getSavedReviewsSuccess(response.data.items));
        }).catch((error) => {
            dispatch(getSavedReviewsError());
            console.error(error.message);
        })
    }

    return (
        <ReviewStateContext.Provider value={state}>
            <ReviewActionContext.Provider value={{ analyzeCSharpCode, saveReview, getSavedReviews}}>
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