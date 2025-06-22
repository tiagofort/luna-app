
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

export const getWhatsNew = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/item/buscarNovidades`); 
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  const data = await response.json();
  return data.slice(0, 8);
}

export const getItemById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/item/buscarId/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}

export const executeLogin = async (email, senha) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login/auth_cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }

    const data = await response.json();
    return data;
}

export const createUser = async (user) =>{
  console.log(user)
  const response = await fetch(`${import.meta.env.VITE_API_URL}/usuario/salvar_cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(user),
  });

  if (!response.ok) {
     throw new Error("Invalid Credentials");
  }

  const data = await response.json();
  return data;
}

export const uploadImage = async (file) => {
    const formData = new FormData();

    if (file) {
      formData.append('avatar', file);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/envio_avatar/salvar`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.text();
      return data;
    } catch (err) {
      console.error('Erro ao enviar:', err);
    }
}

export const createRequest = async (newRequest) => {
try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/pedido/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRequest)
    });

    if (!response.ok) {
      throw new Error('Error to save');
    }

    const data = await response.json();
    console.log('Request saved', data);
    return data;
  } catch (error) {
    console.error('Error to save', error);
    return null;
  }
}
