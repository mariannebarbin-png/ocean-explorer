// Helper to obtain the current CSRF token. Tries the HTML meta tag first,
// then falls back to the XSRF-TOKEN cookie (URL-decoded). This handles the
// case where Inertia or Laravel regenerates the token during login so the
// meta tag may be stale but the cookie is up-to-date.
export function getCsrfToken() {
    try {
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta && meta.content) return meta.content;

        const match = document.cookie.match('(?:^|;)\\s*XSRF-TOKEN=([^;]+)');
        if (match && match[1]) return decodeURIComponent(match[1]);
    } catch (e) {
        // ignore
    }
    return '';
}

export default getCsrfToken;
