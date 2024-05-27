import { renderHook, act } from '@testing-library/react-hooks';
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
  let jiraApiMock: IJiraUserApi;

  beforeEach(() => {
    // Setup mock
    factoryMock = GlobalFactory();
    factoryMock.initialize();
    jiraApiMock = factoryMock.get(ServiceKeys.JiraUserApi);
  });

  test('Testing useJiraUserStorageHook.getCurrentUser (positive): retrieves current user successfully', async () => {
    const mockData = { key: 'value' };

    const { result, waitForNextUpdate } = renderHook(() => useJiraUserHook(jiraApiMock));

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();

    let infoUser: any;
    await act(async () => {
        infoUser = await result.current.getCurrentUser();
    });

    //Check status
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.msg).toBe('');
    expect(result.current.hasError).toBeFalsy();

    //Check function response data
    expect(infoUser.locale).toBe("es_ES");

  });
  

});
