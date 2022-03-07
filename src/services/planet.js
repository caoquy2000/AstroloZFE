import request from '@/utils/requestServer';

export const addPlanet = async (body) => {
  return await request.post('/api/v1/planet', { data: body });
};

export const getPlanets = async (params) => {
  return await request
    .get('/api/v1/planet', {
      params: params,
    })
    .then((response) => {
      console.log('response getPlanets', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetPlanets', error);
    });
};

export const deletePlanet = (planetId) => {
  return request.delete(`/api/v1/zodiac/${planetId}`);
};

export const updatePlanet = (planetId, body) => {
  return request.put('/api/v1/planet', {
    params: {
      id: planetId,
    },
    data: body,
  });
};
