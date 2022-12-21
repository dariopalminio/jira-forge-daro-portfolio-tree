
import * as GlobalConfig from '../../infrastructure/global.config';
import { getQuarters } from '../helper/quarter.helper';
import { QuartersType } from '../model/quarter-types';
import { IssueTreeNodeType } from '../model/tree-types';


/**
 * Custom hook
 * 
 * @returns 
 */
export default function useRoadmaps() {

    /**
     * iterate recursively
     * 
     * @param dates 
     * @returns 
     */
    const getDatesFromTreeRecursive = (issuesTree: IssueTreeNodeType, dates: any): any => {
        let newDates: any = { ...dates };

        //compare start date
        if (issuesTree?.fields?.customfield_10015) {
            const startdate: string = issuesTree?.fields?.customfield_10015;
            const nodeDate: Date = new Date(startdate)
            const dateObjective: Date = newDates.fromDate;
            if (nodeDate.getTime() < dateObjective.getTime()) {
                newDates.fromDate = nodeDate;
            }
        }

        //compare end date
        if (issuesTree?.fields?.duedate) {
            const duedate = issuesTree?.fields?.duedate;
            const nodeDate: Date = new Date(duedate);
            const dateObjective: Date = newDates.toDate;
            if (nodeDate.getTime() > dateObjective.getTime()) {
                newDates.toDate = nodeDate;
            }
        }

        //iterate recursively
        if (issuesTree.hasChildren) {
            for (var i = 0; i < issuesTree.childrens.length; i++) {
                newDates = getDatesFromTreeRecursive(issuesTree.childrens[i], newDates);
            }
        }
        return { ...newDates };
    };

    /**
     * Calculate start date and end date based on tree issues data passed by arguments
     */
    function getExtremeDatesFromTree(tree: IssueTreeNodeType): any {

        //TODO...
        const dates: any = {
            fromDate: new Date(),
            toDate: new Date()
        }
        const datesResult: any = getDatesFromTreeRecursive(tree, dates);
        console.log('getExtremeDatesFromTree: ', datesResult);

        /*return {
            fromDate: new Date('2022-07-28'),
            toDate: new Date('2023-04-20')
        }*/
        return datesResult;
    };

    /**
     * Return quarters timeline data for roadmaps using fromDate and toDate passed by arguments
     */
    const getRoadmapsQuarters = (fromDate: Date, toDate: Date): QuartersType => {
        return getQuarters(fromDate, toDate);
    }

    return {
        getExtremeDatesFromTree,
        getRoadmapsQuarters
    };
};