
import { useState } from 'react';
import { getDaysBetweenTwoDates } from '../helper/date.helper';
import { getQuarters } from '../helper/quarter.helper';
import { QuartersDefault, QuartersType } from '../model/quarter-types';
import { IssueTreeNodeType } from '../model/tree-types';

interface DateRange {
    fromDate: Date;
    toDate: Date;
}

/**
 * useRoadmaps Custom hook
 */
export default function useRoadmaps() {

    const [quarters, setQuarters] = useState<QuartersType>(QuartersDefault);

    /**
     * iterate recursively
     * 
     * @param dates 
     * @returns 
     */
    const getDatesFromTreeRecursive = (issuesTree: IssueTreeNodeType, dates: DateRange): DateRange => {
        const newDates = { ...dates };

        const startDate = issuesTree?.fields?.customfield_10015 ? new Date(issuesTree.fields.customfield_10015) : null;
        const endDate = issuesTree?.fields?.duedate ? new Date(issuesTree.fields.duedate) : null;

        if (startDate && startDate < newDates.fromDate) {
            newDates.fromDate = startDate;
        }
        if (endDate && endDate > newDates.toDate) {
            newDates.toDate = endDate;
        }

        if (issuesTree.hasChildren) {
            issuesTree.childrens.forEach(child => {
                const childDates = getDatesFromTreeRecursive(child, newDates);
                newDates.fromDate = new Date(Math.min(newDates.fromDate.getTime(), childDates.fromDate.getTime()));
                newDates.toDate = new Date(Math.max(newDates.toDate.getTime(), childDates.toDate.getTime()));
            });
        }
        return newDates;
    };

    /**
     * Calculate start date and end date based on tree issues data passed by arguments.
     * Calculates the total range between the oldest date (farthest in the past) 
     * and the newest date (farthest into the future).
     */
    const getExtremeDatesFromTree = (tree: IssueTreeNodeType): DateRange => {
        const initialDates: DateRange = { fromDate: new Date(), toDate: new Date() };
        return getDatesFromTreeRecursive(tree, initialDates);
    };

    /**
     * Return quarters timeline data for roadmaps using fromDate and toDate passed by arguments
     */
    const getRoadmapsQuarters = (fromDate: Date, toDate: Date): QuartersType => {
        return getQuarters(fromDate, toDate);
    }

    const getDaysFromFirstDateUntilTodate = (firstDate: Date): number => {
        try {
            const todate: Date = new Date();
            const days: number = getDaysBetweenTwoDates(firstDate, todate);
            if (days < 0) {
                return 0;
            }
            return days;
        } catch (error) {
            console.log('getDaysFromFirstDateUntilToDate.error:', error);
            return 0;
        }
    }

    return {
        getExtremeDatesFromTree,
        getRoadmapsQuarters,
        quarters, 
        setQuarters,
        getDaysFromFirstDateUntilTodate
    };
};