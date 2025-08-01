import { createContext } from "react";

export interface ICode {
    code?: string;
    line?: number;
    message?: string;
}

export interface IReviewStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean; 
    review?: ICode[];
}

export interface IReviewActionContext {
    analyzeCSharpCode: (code: string) => void;
}

export const INITIAL_STATE: IReviewStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const ReviewStateContext = createContext<IReviewStateContext>(INITIAL_STATE);
export const ReviewActionContext = createContext<IReviewActionContext>(undefined!);