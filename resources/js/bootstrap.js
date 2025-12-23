import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Ensure axios sends cookies for same-origin requests (useful if other
// components use axios instead of fetch). This allows Laravel to validate
// session-based CSRF right after login without a full page reload.
window.axios.defaults.withCredentials = true;
