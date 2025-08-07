import { createAction } from "redux-actions";
import { ICode, IReview, IReviewStateContext } from "./context";

export enum ReviewActionEnum {
    
    //C# Static analysis
    analyzeCSharpCodePending = "ANALYZE_CSHARP_CODE_PENDING",
    analyzeCSharpCodeSuccess = "ANALYZE_CSHARP_CODE_SUCCESS",
    analyzeCSharpCodeError = "ANALYZE_CSHARP_CODE_ERROR",

    //Save Review
    saveReviewPending = "SAVE_REVIEW_PENDING",
    saveReviewSuccess = "SAVE_REVIEW_SUCCESS",
    saveReviewError = "SAVE_REVIEW_ERROR",

    //Get Saved Reviews
    getSavedReviewsPending = "GET_SAVED_REVIEWS_PENDING",
    getSavedReviewsSuccess = "GET_SAVED_REVIEWS_SUCCESS",
    getSavedReviewsError = "GET_SAVED_REVIEWS_ERROR"

}

export const analyzeCSharpCodePending = createAction<IReviewStateContext>(
    ReviewActionEnum.analyzeCSharpCodePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const analyzeCSharpCodeSuccess = createAction<IReviewStateContext, ICode[]>(
    ReviewActionEnum.analyzeCSharpCodeSuccess, (review: ICode[]) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            review
        }
    )
)

export const analyzeCSharpCodeError = createAction<IReviewStateContext>(
    ReviewActionEnum.analyzeCSharpCodeError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)

export const saveReviewPending = createAction<IReviewStateContext>(
    ReviewActionEnum.saveReviewPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const saveReviewSuccess = createAction<IReviewStateContext, IReview>(
    ReviewActionEnum.saveReviewSuccess, (completedReview: IReview) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            completedReview
        }
    )
)

export const saveReviewError = createAction<IReviewStateContext>(
    ReviewActionEnum.saveReviewError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)

export const getSavedReviewsPending = createAction<IReviewStateContext>(
    ReviewActionEnum.getSavedReviewsPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
)

export const getSavedReviewsSuccess = createAction<IReviewStateContext, IReview[]>(
    ReviewActionEnum.getSavedReviewsSuccess, (myReviews: IReview[]) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            myReviews
        }
    )
)

export const getSavedReviewsError = createAction<IReviewStateContext>(
    ReviewActionEnum.getSavedReviewsError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true
        }
    )
)