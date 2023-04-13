// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import { post } from './httpbinService';

describe('httpbinService', () => {
  global.fetch = jest.fn();

  test('should throw an error if data is undefined', async () => {
    expect.assertions(1);
    await expect(async () => {
      await post();
    }).rejects.toThrow('httpbinService: no data to be sent');
  });

  test('should throw an error if data is null', async () => {
    expect.assertions(1);
    await expect(async () => {
      await post(null);
    }).rejects.toThrow('httpbinService: no data to be sent');
  });

  test('should throw an error if cant stringfy data', async () => {
    expect.assertions(1);
    await expect(async () => {
      await post(new Error('dummy'));
    }).rejects.toThrow("httpbinService: Cannot read properties of undefined (reading 'json')");
  });

  test('should post data successfully', async () => {
    expect.assertions(1);
    const data = { name: 'Fulaninha', email: 'fulaninha@test.com' };
    const responseMock = { json: () => data };
    fetch.mockResolvedValueOnce(responseMock);

    const response = await post(data);

    expect(response).toEqual(data);
  });

  test('should throw an error if the server responds with an error', async () => {
    expect.assertions(1);
    const data = { name: 'Fulaninha', email: 'fulaninha@test.com' };
    fetch.mockRejectedValueOnce(new Error('Async error message'));

    await expect(async () => {
      await post(data);
    }).rejects.toThrow('httpbinService: Async error message');
  });
});
