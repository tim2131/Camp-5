import axios from 'axios';
import { notification } from 'antd';

const $http = axios.create({});

// response
$http.interceptors.response.use(
  ({ data: { data } }) => data,
  ({ response }) => {
    notification.error({
      message: '錯誤',
      description: '請求錯誤,請稍後再試',
    });
    return Promise.reject(response);
  },
);

export default $http;
