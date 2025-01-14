export async function login(username, password) {
    try {
      const response = await fetch('http://localhost:5132/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
     
      return data
    } catch (error) {
      console.error('Error:', error);
    }
  }
  