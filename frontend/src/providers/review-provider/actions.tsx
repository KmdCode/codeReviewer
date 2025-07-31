import { createAction } from "redux-actions";
import { ICode, IReviewStateContext } from "./context";

export enum ReviewActionEnum {
    
    //C# Static analysis
    analyzeCSharpCodePending = "ANALYZE_CSHARP_CODE_PENDING",
    analyzeCSharpCodeSuccess = "ANALYZE_CSHARP_CODE_SUCCESS",
    analyzeCSharpCodeError = "ANALYZE_CSHARP_CODE_ERROR"
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

export const analyzeCSharpCodeSuccess = createAction<IReviewStateContext, ICode>(
    ReviewActionEnum.analyzeCSharpCodeSuccess, (code: ICode) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            code
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

