import { message, notification } from 'antd';
import { extend } from 'umi-request';

const codeMessage = {
  200: 'Thực hiện thành công.',
  201: 'Tạo thành công',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'There was an error in the requested request, and the server did not create or modify data.',
  401: 'The user does not have permission (token, user name, wrong password).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'Resource Empty',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'Có lỗi xảy ra. Vui lòng thử lại',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error) => {
  console.log('errorAtRequestServer', error.data);
  const { response } = error;
  // console.log('responseAtRequestServer', response);
  console.log(response.body);
  if (response && response.status) {
    // console.log('response.body.message', response.body?.message);
    // console.log('err.errors', error?.data?.errors);
    // const errorText = error?.data?.errors
    //   ? error?.data?.errors ?? (codeMessage[response.status] || response.statusText)
    //   : error?.data?.title;
    const {status, url, ...params} = response;
    if (status == 404) {
      notification.info({
        message: 'Tài nguyên trống',
      });
    } else {
      notification.error({
        message: `Request Error ${status}: ${url}`,
        // description: errorText,
      });
    }
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }
  return response;
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
      if (method !== 'GET')
          message.success(codeMessage[200]);
      break;
      case 201:
        if (method !== 'GET')
          message.success(codeMessage[201]);
        break;
      case 401:
        notification.error({
          message: 'Unauthorization',
          description: 'Not Logged in. Please Loggin',
        });
        /* eslint-disable no-underscore-dangle */
        // logOut();
        // location.href = '/login';
        // setTimeout(() => {
        //   window.g_app._store.dispatch({
        //     type: 'login/logout',
        //   });
        // }, 3000);
        break;
      case 403:
        notification.error({
          message: response.statusText,
          description: `Your request to ${response.url} was forbiden`,
        });
        break;
      case 405:
        notification.error({
          message: response.statusText,
          description: `${response.body.message}`,
        });
        break; 
    default:
      break;
  }
  return response;
});
export default request;
