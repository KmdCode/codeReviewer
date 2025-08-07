import { handleActions } from "redux-actions";
import { INITIAL_STATE, IReviewStateContext } from "./context";
import { ReviewActionEnum } from "./actions";

export const ReviewReducer = handleActions<IReviewStateContext, IReviewStateContext>({
    [ReviewActionEnum.analyzeCSharpCodePending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.analyzeCSharpCodeSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.analyzeCSharpCodeError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.saveReviewPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.saveReviewSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.saveReviewError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.getSavedReviewsError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.getSavedReviewsSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [ReviewActionEnum.getSavedReviewsPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    

}, INITIAL_STATE)