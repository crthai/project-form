const post = async (data) => {
  if (typeof data === 'undefined' || data == null) {
    throw new Error(`httpbinService: no data to be sent`);
  }

  let body = {};
  try {
    if (body) {
      body = JSON.stringify(data);
    }
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    return response.json();
  } catch (error) {
    throw new Error(`httpbinService: ${error.message}`, error);
  }
}

export { post };
