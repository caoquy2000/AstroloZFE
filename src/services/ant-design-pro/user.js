import request from '@/utils/requestServer';

export const getUsers = async (params) => {
  return await request
    .get('/api/v1/user', {
      params: params,
    })
    .then((response) => {
      console.log('response getUsers', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetUsers', error);
    });
};

export const addUser = (body) => {
  return request.post('/api/v1/user', { data: body });
};

export const editUser = (userId, body) => {
  return request.put('/api/v1/user', {
    params: {
      id: userId,
    },
    data: body,
  });
};

// export const searchUser = (params) => {
//   return request
//     .get('/api/User', {
//       params: params,
//     })
// }
