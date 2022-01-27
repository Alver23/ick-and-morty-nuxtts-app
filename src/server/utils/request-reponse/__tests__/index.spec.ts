import requestResponse from '@server/utils/request-reponse/index';

describe('Utils:requestResponse', () => {
  it('should get an response when status code is 200', () => {
    expect(requestResponse({ data: [], message: 'fake message' })).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        message: expect.any(String),
        status: expect.any(Number),
      })
    );
  });

  it('should get an response when status code is 201', () => {
    expect(
      requestResponse({
        status: 201,
      })
    ).toHaveProperty('status', 201);
  });

  it('should get an response when send options', () => {
    expect(
      requestResponse({ options: { error: 'fake error' } })
    ).toHaveProperty('error', 'fake error');
  });
});
