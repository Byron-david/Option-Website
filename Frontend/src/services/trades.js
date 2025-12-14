const baseUrl = '/api/dashboard/strategies'

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
      credentials: 'include',
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

const update = async (id, newObject) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating trade:', error);
    throw error;
  }
}

const remove = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
    }

    if (response.status === 204) {
        return { success: true };
    }

    return await response.json();
    
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