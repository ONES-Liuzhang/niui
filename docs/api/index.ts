import fetcher from './fetcher';

const instance = fetcher.create({
  baseURL: '/mock',
  headers: {
    'Content-type': 'application/json'
  }
});

export default instance;
