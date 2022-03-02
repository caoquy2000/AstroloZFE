import request from '@/utils/requestServer';

export const addProductMaster = async (body) => {
  return await request.post('/api/v1/product/master', { data: body });
};

export const getProductMasters = async (params) => {
  return await request
    .get('/api/v1/product/master', {
      params: params,
    })
    .then((response) => {
      console.log('response getProductMasters', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetProductMasters', error);
    });
};

export const deleteProduct = (productId) => {
  request.delete(`/api/v1/product/${productId}`);
};
