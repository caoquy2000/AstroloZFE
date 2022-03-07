import request from '@/utils/requestServer';

export const addNews = (body) => {
  return request.post('/api/v1/news', { data: body });
};

export const getNews = async (params) => {
  return await request
    .get('/api/v1/news', {
      params: params,
    })
    .then((response) => {
      console.log('response getNews', response);
      if (response && response.length > 0) {
        return response;
      }
    })
    .catch((error) => {
      console.log('errorGetNews', error);
    });
};

export const deleteNews = (newsId) => {
  return request.delete(`/api/v1/news/${newsId}`);
};

export const updateNews = (newsId, body) => {
  return request.put('/api/v1/news', {
    params: {
      id: newsId,
    },
    data: body,
  });
};
