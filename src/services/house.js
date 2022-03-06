import request from '@/utils/requestServer';

export const addHouse = (body) => {
  return request.post('/api/v1/house', {
    data: body,
  });
};

export const getHouses = async (params) => {
  return await request
    .get('/api/v1/house', {
      params: params,
    })
    .then((response) => {
      console.log('response houses', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errGetHouses', error);
    });
};

export const deleteHouse = (houseId) => {
  return request.delete(`/api/v1/house/${houseId}`);
};

export const updateHouse = (houseId, body) => {
  return request.put('/api/v1/house', {
    params: {
      id: houseId,
    },
    data: body,
  });
};
