import fetcher from './fetcher';

const instance = fetcher.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json'
  }
});

instance.intercepter.response.use(
  async (response: Response) => {
    const json = await response.json();

    return {
      status: response.status,
      ok: response.ok,
      data: json,
      message: json.message
    };
  },
  (err: any) => {
    console.error('网络错误：', err);
  }
);

export default instance;
