import request from '@/utils/requestServer';

export const addCategory = (body) => {
  return request.post('/api/v1/category', { data: body });
};

export const getCategories = async (params) => {
  return await request
    .get('/api/v1/category', {
      params: params,
    })
    .then((response) => {
      console.log('response getCategories', response);
      return response;
    })
    .catch((error) => {
      console.log('error GetCategories', error);
    });
};

export const deleteCategory = (categoryId) => {
  return request.delete(`/api/v1/category/${categoryId}`);
};

export const updateCategory = async (categoryId, body) => {
  return await request.put('/api/v1/category', {
    params: {
      id: categoryId,
    },
    data: body,
  });
};
