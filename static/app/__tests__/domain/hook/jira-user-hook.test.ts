import { renderHook, cleanup, act } from '@testing-library/react';
import { ServiceKeys } from '../../../src/domain/outgoing/service-key';
import GlobalFactory from '../../../src/infrastructure/fake/global-factory-fake-mode';
import useJiraUserHook from '../../../src/domain/hook/jira-user-hook';
import { IJiraUserApi } from '../../../src/domain/outgoing/jira-user-api.interface';

/**
 * Test the custom hook called useJiraTreeHook.
 * Testing based on fake API clients to simulate API requests
 */
describe('useJiraUserStorageHook', () => {
  let factoryMock: any;
  let jiraUserApiMock: IJiraUserApi;

  beforeEach(() => {
    // Setup mock
    factoryMock = GlobalFactory();
    factoryMock.initialize();
    jiraUserApiMock = factoryMock.get(ServiceKeys.JiraUserApi);
  });

  afterEach(() => {
    cleanup();
  });


  test('Testing useJiraUserStorageHook.getCurrentUser (positive): retrieves current user successfully', async () => {
    const { result } = renderHook(() => useJiraUserHook(jiraUserApiMock));

    expect(result.current.resultState.isProcessing).toBeFalsy();
    expect(result.current.resultState.hasError).toBeFalsy();
    expect(result.current.resultState.isSuccess).toBeFalsy();

    let infoUser: any;

    await act(async () => {
      infoUser = await result.current.getCurrentUser();
    });

    //Check status
    expect(result.current.resultState.isProcessing).toBeFalsy();
    expect(result.current.resultState.isSuccess).toBeTruthy();
    expect(result.current.resultState.msg).toBe(undefined);
    expect(result.current.resultState.hasError).toBeFalsy();

    //Check function response data
    expect(infoUser.locale).toBe("es_ES");

  });
  

});
