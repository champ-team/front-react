let backendHost;
const apiVersion = 'v1';

if (process.env.NODE_ENV === 'production') {
  backendHost = 'https://production.com';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
