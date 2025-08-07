import { createContext } from "react";

export interface ICode {
    code?: string;
    line?: number;
    message?: string;
}

export interface IReview {
  id?: string;
  reviewName: string;
  language: string;
  code: string;
  reviewResults?: ICode[];
  reviewType?: 'AI' | 'Static';
  date?: string;
}

export interface IReviewStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean; 
    review?: ICode[];
    completedReview?: IReview;
    myReviews?: IReview[];
}

export interface IReviewActionContext {
    analyzeCSharpCode: (code: string) => void;
    saveReview: (results: IReview) => void;
    getSavedReviews: () => void;
}

export const INITIAL_STATE: IReviewStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const ReviewStateContext = createContext<IReviewStateContext>(INITIAL_STATE);
export const ReviewActionContext = createContext<IReviewActionContext>(undefined!);