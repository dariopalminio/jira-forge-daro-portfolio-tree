import { renderHook, act } from '@testing-library/react-hooks';
import { ServiceKeys } from '../../../src/domain/outgoing/service-key';
import GlobalFactory from '../../../src/infrastructure/fake/global-factory-fake-mode';
import { IJiraApi } from '../../../src/domain/outgoing/jira-api.interface';
import useJiraTreeHook from '../../../src/domain/hook/jira-tree-hook';
import { IssueTreeNodeType } from '../../../src/domain/model/tree-types';
import JiraApiFake from '../../../src/infrastructure/fake/jira-api-fake';

/**
 * Test the custom hook called useJiraTreeHook.
 * Testing based on fake API clients to simulate API requests
 */
describe('useJiraStorageHook', () => {
  let factoryMock: any;
  let jiraApiMock: IJiraApi;

  beforeEach(() => {
    // Setup mock
    factoryMock = GlobalFactory();
    factoryMock.initialize();
    jiraApiMock = factoryMock.get(ServiceKeys.JiraApi);
  });

  test('Testing useJiraTreeHook.searchJql (positive): retrieves data successfully', async () => {
    const mockData = { key: 'value' };

    const { result, waitForNextUpdate } = renderHook(() => useJiraTreeHook(jiraApiMock));

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();

    let dataTreeFirstLevel: IssueTreeNodeType | undefined;
    await act(async () => {
        dataTreeFirstLevel = await result.current.getTreeFromJQL('');
    });

    //Check status
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.msg).toBe('');
    expect(result.current.hasError).toBeFalsy();

    //Check function response data
    expect(dataTreeFirstLevel?.hasChildren).toBe(true);
    expect(dataTreeFirstLevel?.childrens.length).toBe(4);
  });

  test('Testing useJiraTreeHook.addChildrenByParent (positive): retrieves tree data structure successfully', async () => {
    const mockData = { key: 'value' };

    const { result, waitForNextUpdate } = renderHook(() => useJiraTreeHook(jiraApiMock));

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();

    const jiraApi: IJiraApi = JiraApiFake();
    const linksOutwards = ['includes'];
    const maxAllowedLevel = 2;
    const maxResults = 15;
    let dataTreeFirstLevel: IssueTreeNodeType;
    let dataTreeSecondLevel: IssueTreeNodeType | undefined;
    let lastDataTree: IssueTreeNodeType | undefined;

    await act(async () => {
        //load first level
        const data: IssueTreeNodeType | undefined = await result.current.getTreeFromJQL('');
        expect(data == undefined).toBeFalsy();
        if (data != undefined) dataTreeFirstLevel = data;
        //load childs by links to all levels
        dataTreeSecondLevel = await result.current.addChildsToTreeByLink(dataTreeFirstLevel, linksOutwards, maxAllowedLevel);
        //load Epics children and children by parent
        lastDataTree = await result.current.addChildsToTreeByParent(dataTreeSecondLevel, maxAllowedLevel);
    });

    //Check status
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.msg).toBe('');
    expect(result.current.hasError).toBeFalsy();

    //Check first node in level 0: ROOT
    expect(lastDataTree?.hasChildren).toBe(true);
    expect(lastDataTree?.childrens?.length).toBe(4); //root must have 4 children

    //Check first node in level 1
    expect(lastDataTree?.childrens[0]?.hasChildren).toBe(true);
    expect(lastDataTree?.childrens[0]?.childrens?.length).toBe(6); //first node in level 1 must have 6 children
    expect(lastDataTree?.childrens[1]?.childrens?.length).toBe(7); //second node in level 1 must have 7 children
    expect(lastDataTree?.childrens[2]?.childrens?.length).toBe(9); //third node in level 1 must have 9 children
    expect(lastDataTree?.childrens[3]?.childrens?.length).toBe(3); //four node in level 1 must have 3 children

    //Check first node in level 2
    expect(lastDataTree?.childrens[0]?.childrens[0]?.hasChildren).toBe(true);
    expect(lastDataTree?.childrens[0]?.childrens[0]?.childrens?.length).toBe(3); //first node in level 2 must have 3 children

    //Check if level 3 does not exist
    expect(lastDataTree?.childrens[0]?.childrens[0]?.childrens[0]?.hasChildren).toBe(false);
  });

});
