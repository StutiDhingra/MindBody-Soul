// public/js/auth.js
// Simple wrapper for login, signup, and logout using fetch with credentials

async function login(email, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
    }
    return await res.json();
}

async function signup(name, email, password, role = 'patient') {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, role })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Signup failed');
    }
    return await res.json();
}

async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Logout failed');
    }
    return await res.json();
}

// Export to window for inline script usage
window.auth = { login, signup, logout };
