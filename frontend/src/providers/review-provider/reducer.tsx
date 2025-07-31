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
}, INITIAL_STATE)