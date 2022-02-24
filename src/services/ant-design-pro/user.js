import request from '@/utils/requestServer';

export const getUsers = async () => {
  return await request
    .get('/api/User')
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
