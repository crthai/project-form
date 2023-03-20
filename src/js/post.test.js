// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import { postData } from './post';

describe('postData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should post data successfully', async () => {
    const url = 'https://httpbin.org/post';
    const data = { name: 'Fulaninha', email: 'fulaninha@test.com' };
    const expectedResponse = { message: 'Data posted successfully' };

    nock('https://httpbin.org')
      .post('/post', data)
      .reply(200, expectedResponse);

    const response = await postData(url, data);

    expect(response).toEqual(expectedResponse);
  });

  test('should throw an error if the server responds with an error', async () => {
    const url = 'https://httpbin.org/post';
    const data = { name: 'Fulaninha', email: 'Fulaninha' };

    nock(url)
      .post('/post', JSON.stringify(data))
      .reply(500, { error: 'Internal server error' });

    await expect(postData(url, data)).rejects.toThrow();
  });
});
