import httpClient from './http.service';

const itemService = {
  getAllItems: async () => {
    try {
      const response = await httpClient.get('/item');
      return response.data;
    } catch (error) {}
  },
  createItem: async (data) => {
    try {
      const response = await httpClient.post('/item', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (e) {
      console.log('Error creating a item: ', e);
      throw e;
    }
  },
};

export default itemService;
