const baseUrl = 'http://localhost:3000/api/dashboard/trades'

const fetchData = async () => {
  try {
    const response = await fetch(baseUrl, {
      credentials: 'include', // Required for session cookies
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};

const create = async newObject => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
      }
    );

    const data = await response.json();

    return data
  } catch (error) {
    console.error('Error adding trades:', error);
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error adding trades:', error);
  }
}

export default { 
  fetchData, 
  create, 
  update,
  remove
}