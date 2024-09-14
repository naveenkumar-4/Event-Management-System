import axios from 'axios';

const authAxios = () => {
  const token = localStorage.getItem('authToken');
  
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default authAxios;
