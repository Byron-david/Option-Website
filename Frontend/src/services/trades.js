import axios from 'axios'
const baseUrl = 'http://localhost:3000/dashboard/trades'
// const baseUrl = 'http://localhost:3001/trades'

const fetchData = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};

const create = async newObject => {
  const {data} = await axios.post(baseUrl, newObject)
  return data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const {request} = await axios.delete(`${baseUrl}/${id}`)
  return request
  // return request.then(response => response.data)
}

export default { 
  fetchData, 
  create, 
  update,
  remove
}