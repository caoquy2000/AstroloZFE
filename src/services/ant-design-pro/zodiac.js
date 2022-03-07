import request from '@/utils/requestServer';

export const addZodiac = (body) => {
  return request.post('/api/v1/zodiac', { data: body });
};

export const getZodiacs = async (params) => {
  return await request
    .get('/api/v1/zodiac', {
      params: params,
    })
    .then((response) => {
      console.log('response getZodiacs', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetZodiacs', error);
    });
};

export const deleteZodiac = (zodiacId) => {
  return request.delete(`/api/v1/zodiac/${zodiacId}`);
};

export const updateZodiac = async (zodiacId, body) => {
  return await request.put('/api/v1/zodiac', {
    params: {
      id: zodiacId,
    },
    data: body,
  });
};
