import getCsrfToken from './csrf';

// Wrapper around fetch that ensures credentials are sent, the CSRF token is
// attached, and on a 419 response it will attempt to refresh the token and
// retry the request once. Returns the final Response object.
export default async function fetchWithCsrf(input, init = {}) {
    init = { ...(init || {}) };
    init.credentials = init.credentials ?? 'same-origin';
    init.headers = init.headers ?? {};

    // Ensure CSRF header present
    if (!init.headers['X-CSRF-TOKEN'] && !init.headers['x-csrf-token']) {
        init.headers['X-CSRF-TOKEN'] = getCsrfToken();
    }

    let res = await fetch(input, init);

    if (res.status !== 419) return res;

    // Try to refresh token from server and retry once
    try {
        const t = await fetch('/csrf-token', { credentials: 'same-origin' });
        if (t.ok) {
            const json = await t.json().catch(() => ({}));
            const token = json.token || '';
            // update meta tag if present
            const meta = document.querySelector('meta[name="csrf-token"]');
            if (meta) meta.content = token;
            // update cookie is handled by server Set-Cookie if necessary
        }
    } catch (e) {
        // ignore
    }

    // retry with refreshed token
    init.headers['X-CSRF-TOKEN'] = getCsrfToken();
    const retry = await fetch(input, init);
    return retry;
}

export { fetchWithCsrf };
