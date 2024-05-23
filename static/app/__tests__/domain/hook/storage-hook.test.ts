import { renderHook, act } from '@testing-library/react-hooks';
import { ServiceKeys } from '../../../src/domain/outgoing/service-key';
import GlobalFactory from '../../../src/infrastructure/fake/global-factory-fake-mode';
import useStorageHook from '../../../src/domain/hook/storage-hook';


describe('useStorageHook', () => {
  let factory: any;


  beforeEach(() => {
    // Setup mock
    factory = GlobalFactory();
    factory.initialize();
  });


  test('getConfigStorage retrieves configuration successfully', async () => {
    const mockData = { key: 'value' };
    const storageApiMock = factory.get(ServiceKeys.StorageApi);
    const { result, waitForNextUpdate } = renderHook(() => useStorageHook(storageApiMock));

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.isSuccess).toBeFalsy();

    let configStorage: any;
    await act(async () => {
      configStorage = await result.current.getConfigStorage();
    });

    //Check status
    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.msg).toBe('');
    expect(result.current.hasError).toBeFalsy();

    //Check function response data
    expect(configStorage.linksOutwards.length).toBe(1);
    expect(configStorage.linksOutwards[0]).toBe('includes');
    expect(configStorage.maxResults).toBe('15');
    
  });


});
