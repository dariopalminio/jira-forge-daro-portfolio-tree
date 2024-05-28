import { renderHook, cleanup, act } from '@testing-library/react';
import GlobalFactory from '../../../src/infrastructure/fake/global-factory-fake-mode';
import useJiraStorageHook from '../../../src/domain/hook/jira-storage-hook';
import { ServiceKeys } from '../../../src/domain/outgoing/service-key';
import { IStorageApi } from '../../../src/domain/outgoing/storage-api.interface';


describe('useJiraStorageHook', () => {
  let factoryMock: any;
  let storageApiMock: IStorageApi;

  beforeEach(() => {
    // Setup mock
    factoryMock = GlobalFactory();
    factoryMock.initialize();
    storageApiMock = factoryMock.get(ServiceKeys.StorageApi);
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing useJiraStorageHook.getConfigStorage (positive): retrieves configuration successfully', async () => {

    const { result } = renderHook(() => useJiraStorageHook(storageApiMock));

    let configStorage: any;

    await act(async () => {
      configStorage = await result.current.getConfigStorage();
    });

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.msg).toBe('');
    expect(result.current.hasError).toBeFalsy();

    expect(configStorage.linksOutwards.length).toBe(1);
    expect(configStorage.linksOutwards[0]).toBe('includes');
  });
});
