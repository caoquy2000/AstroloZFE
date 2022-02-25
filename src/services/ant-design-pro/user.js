import request from '@/utils/requestServer';

export const getUsers = async (params) => {
  return await request
    .get('/api/User', {
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

export const addUser =  (body) => {
  return request
    .post('/api/User', {data: body});
    
}

export const editUser = (userId, body) => {
  return request
    .put(`/api/User/${userId}`, {data: body});
}

// export const searchUser = (params) => {
//   return request
//     .get('/api/User', {
//       params: params,
//     })
// }
