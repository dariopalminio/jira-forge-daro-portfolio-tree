
import { IssueTreeNodeType } from '../model/tree-types';


/**
 * useIssueHook Custom hook
 */
export default function useIssueHook() {
    
    const issueTypeNameOf = (issueTree: IssueTreeNodeType): string => {
        const name: string = issueTree?.fields?.issuetype?.name || '';
        return name;
    }

    const statusKeyOf = (issueTree: IssueTreeNodeType): string => {
        return issueTree?.fields?.status?.statusCategory?.key || '';
    }

    const stardateOf = (issueTree: IssueTreeNodeType): string => {
            const stardate: string = issueTree?.fields?.customfield_10015 || '';
            return stardate;
    }

    const duedateOf = (issueTree: IssueTreeNodeType): string => {
            const duedate: string = issueTree?.fields?.duedate || '';
            return duedate;
    }

    /**
     * Is issue on TODO Status and startdate is already expired?
     * @param issueTree 
     * @returns 
     */
    function isStartdateExpiredAndTodo(issueTree: IssueTreeNodeType): boolean {
        const status: string = statusKeyOf(issueTree);

        const isStatusTodo: boolean = (status === 'new');

        try {
            const startDateStr = issueTree?.fields?.customfield_10015;
            const startdate: Date = new Date(startDateStr);
            const todate: Date = new Date();
            const isExpired: boolean = todate.getTime() > startdate.getTime();
            return (isExpired && isStatusTodo);
        } catch (error) {
            console.log('Error in function isStartdateExpiredAndTodo: ', error);
            return true;
        }
    };


    function isDuedateExpiredAndInprogress(issueTree: IssueTreeNodeType): boolean {
        const status: string | undefined = statusKeyOf(issueTree);

        if (status === undefined) {
            return true;
        }
        const isStatusInprogress: boolean = (status === 'indeterminate');

        try {
            const duedateStr = issueTree?.fields?.duedate;
            const duedate: Date = new Date(duedateStr);
            const todate: Date = new Date();
            const isExpired: boolean = todate.getTime() > duedate.getTime();
            return (isExpired && isStatusInprogress);
        } catch (error) {
            console.log('Error in function isDuedateExpiredAndInprogress: ', error);
            return true;
        }
    };

    const hasStartdate = (issueTree: IssueTreeNodeType): boolean => {
        let dateStart = stardateOf(issueTree);
        const hasStartdate: boolean = (dateStart !==undefined && typeof dateStart === 'string' && dateStart.length > 0);
        return hasStartdate;
    }

    const hasDuedate = (issueTree: IssueTreeNodeType): boolean => {
        const  dateEnd = duedateOf(issueTree);
        const hasDuedate: boolean = (dateEnd !==undefined && typeof dateEnd === 'string' && dateEnd.length > 0);
        return hasDuedate;
    }

    const getChildrenProgressCount = (issueTree: IssueTreeNodeType) => {

        let progress = {
            todo: 0,
            inprogress: 0,
            done: 0
        };

        if (issueTree.hasChildren) {
            for (var i = 0; i < issueTree.childrens.length; i++) {
                const statusName = issueTree.childrens[i].fields?.status?.statusCategory?.key;
                switch (statusName) {
                    case 'new': {
                        progress.todo = progress.todo + 1;
                        break;
                    }
                    case 'indeterminate': {
                        progress.inprogress = progress.inprogress + 1;
                        break;
                    }
                    case 'done': {
                        progress.done = progress.done + 1;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }

        return {...progress};
    }

    return {
        issueTypeNameOf,
        statusKeyOf,
        stardateOf,
        duedateOf,
        isStartdateExpiredAndTodo,
        isDuedateExpiredAndInprogress,
        hasDuedate,
        hasStartdate,
        getChildrenProgressCount
    };
};