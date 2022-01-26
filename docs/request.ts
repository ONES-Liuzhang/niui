import axios from 'axios';

const instance = axios.create({
  baseURL: ''
});

instance.interceptors.response.use(
  function onInterceptResponse(res) {
    return res.data;
  },
  function onInterceptResponseError(err) {
    console.error(`网络异常！ ${err}`);
  }
);

export default instance;
