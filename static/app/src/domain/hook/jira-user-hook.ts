import { useState, useCallback } from 'react';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';

/**
 * useJiraUserHook Custom hook
 * 
 */
export default function useJiraUserHook(jiraApi: IJiraApi) {

    const [state, setState] = useState<IHookState>(InitialState);
    const MAX_ALLOWED_LEVEL = 20;

    const updateState = useCallback((newState) => {
        setState(prev => ({ ...prev, ...newState }));
    }, []);

    /**
     * Get current user logged in Jira
     * @returns Jira User Object
     */
    const getCurrentUser = useCallback(async () => {
        updateState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const currentUserData = await jiraApi.getCurrentUser();
            updateState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
            return currentUserData;
        } catch (error) {
            console.error(error);
            updateState({ hasError: true, msg: 'Error fetching current user', isSuccess: false });
            return null;
        }
    }, [updateState]);

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getCurrentUser
    };
};