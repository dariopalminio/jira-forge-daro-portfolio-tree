import { useState, useCallback } from 'react';
import { IHookState, InitialState } from './hook.type';
import { IJiraUserApi } from '../outgoing/jira-user-api.interface';

/**
 * useJiraUserHook Custom hook
 * 
 */
export default function useJiraUserHook(jiraUserApi: IJiraUserApi) {

    const [state, setState] = useState<IHookState>(InitialState);
    const [currentUser, setCurrentUser] = useState<any>({});

    const updateState = useCallback((newState) => {
        setState(prev => ({ ...prev, ...newState }));
    }, []);

    /**
     * Get current user logged in Jira
     * @returns Jira User Object
     */
    const getCurrentUser = useCallback(async () => {
        console.log("*** Function: useJiraUserHook-->getCurrentUser");
        updateState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const currentUserData = await jiraUserApi.getCurrentUser();
            setCurrentUser(currentUserData);
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
        getCurrentUser,
        currentUser
    };
};