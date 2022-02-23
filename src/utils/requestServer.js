import { message } from 'antd';
import { extend } from 'umi-request';

const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    console.log('data error', error.data);
    console.log('data request', error.request);
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
  }

  throw error;
};

const request = extend({
  prefix: 'https://20.124.25.10',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

    // Referer: 'strict-origin-when-cross-origin',
  },
  errorHandler,
});

request.interceptors.response.use((response, option) => {
  const { status } = response;
  const { method } = option;
  switch (status) {
    case 200:
      // if (method !== 'GET')
      //     message.success({
      //         message: 'Success',
      //         description: 'Thực hiện thành công.',
      //     });
      break;
    default:
      break;
  }
  return response;
});
export default request;
