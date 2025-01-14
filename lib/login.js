export async function login(username, password) {
    try {
      const response = await fetch('https://node-quizapp-32a154b7e30f.herokuapp.com/', {
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
  