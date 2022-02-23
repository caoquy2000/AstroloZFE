import request from '@/utils/requestServer';

export const getUsers = async () => {
  console.log('D');
  return await request
    .get('/api/User')
    .then((response) => {
      console.log('response', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetUsers', error);
    });
};
