import fetcher from './fetcher';

const instance = fetcher.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json'
  }
});

export default instance;
