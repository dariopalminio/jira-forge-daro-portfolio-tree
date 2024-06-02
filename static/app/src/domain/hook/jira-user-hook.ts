import { useState, useCallback } from 'react';
import { IHookResultState, InitialResultState, ProcessingResultState } from './hook-result-state.type';
import { IJiraUserApi } from '../outgoing/jira-user-api.interface';

/**
 * useJiraUserHook Custom hook
 * 
 */
export default function useJiraUserHook(jiraUserApi: IJiraUserApi) {

    const [resultState, setResultState] = useState<IHookResultState>(InitialResultState);  //Result status
    const [currentUser, setCurrentUser] = useState<any>({});

    const updateState = useCallback((newState: any) => {
        setResultState(prev => ({ ...prev, ...newState }));
    }, []);

    /**
     * Get current user logged in Jira
     * @returns Jira User Object
     */
    const getCurrentUser = useCallback(async () => {
        setResultState(ProcessingResultState);
        try {
            const currentUserData = await jiraUserApi.getCurrentUser();
            setCurrentUser(currentUserData);
            updateState({ isProcessing: false, hasError: false, msg: undefined, isSuccess: true });
            return currentUserData;
        } catch (error) {
            console.error(error);
            updateState({ isProcessing: false, hasError: true, msg: 'Error fetching current user', isSuccess: false });
            return null;
        }
    }, [updateState]);

    return {
        resultState,
        getCurrentUser,
        currentUser
    };
};