const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchGitHubRepos = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
