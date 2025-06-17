
export const getStates = async (state) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/socioDemographic/states`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}

// -----------------------------------

export const getMainCarosel = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slide/buscarSlides`); 
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}