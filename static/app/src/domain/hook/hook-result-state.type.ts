
//Result Pattern
export interface IHookResultState {
    isProcessing: boolean, hasError: boolean, msg: string | undefined, isSuccess: boolean
}

export const InitialResultState: IHookResultState = {
    isProcessing: false, hasError: false, msg: undefined, isSuccess: false
}

export const ProcessingResultState: IHookResultState = {
    isProcessing: true, hasError: false, msg: undefined, isSuccess: false
}


