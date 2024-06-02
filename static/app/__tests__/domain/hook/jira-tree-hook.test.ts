import { renderHook, cleanup, act } from '@testing-library/react';
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

  afterEach(() => {
    cleanup();
  });


  test('Testing useJiraTreeHook.addChildrenByParent (positive): retrieves tree data structure successfully', async () => {
    const mockData = { key: 'value' };

    const { result } = renderHook(() => useJiraTreeHook(jiraApiMock));

    expect(result.current.resultState.isProcessing).toBeFalsy();
    expect(result.current.resultState.hasError).toBeFalsy();
    expect(result.current.resultState.isSuccess).toBeFalsy();

    await act(async () => {
        //load first level
        await result.current.searchAndLoadDataTree('',['includes']);
        expect(result.current.dataTree == undefined).toBeFalsy();
    });

    //Check status
    expect(result.current.resultState.isProcessing).toBeFalsy();
    expect(result.current.resultState.isSuccess).toBeTruthy();
    expect(result.current.resultState.msg).toBe(undefined);
    expect(result.current.resultState.hasError).toBeFalsy();

    //Check first node in level 0: ROOT
    expect(result.current.dataTree?.hasChildren).toBe(true);
    expect(result.current.dataTree?.childrens?.length).toBe(4); //root must have 4 children

    //Check first node in level 1
    expect(result.current.dataTree?.childrens[0]?.hasChildren).toBe(true);
    expect(result.current.dataTree?.childrens[0]?.childrens?.length).toBe(6); //first node in level 1 must have 6 children
    expect(result.current.dataTree?.childrens[1]?.childrens?.length).toBe(7); //second node in level 1 must have 7 children
    expect(result.current.dataTree?.childrens[2]?.childrens?.length).toBe(9); //third node in level 1 must have 9 children
    expect(result.current.dataTree?.childrens[3]?.childrens?.length).toBe(3); //four node in level 1 must have 3 children

    //Check first node in level 2
    expect(result.current.dataTree?.childrens[0]?.childrens[0]?.hasChildren).toBe(true);

    //Check if level 3 does not exist
    expect(result.current.dataTree?.childrens[0]?.childrens[0]?.childrens[0]?.hasChildren).toBe(true);
  });

});
