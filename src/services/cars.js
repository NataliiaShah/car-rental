import api from './api';

export const getCars = (filters = {}) => {
  return api.get('/cars', { params: filters });
};

export const getCarById = (id) => {
  return api.get(`/cars/${id}`);
};