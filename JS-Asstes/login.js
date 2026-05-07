document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!email || !password || email.value === '' || password.value === '') {
                event.preventDefault();
                alert('To Login Fill The Details As Mentioned');
            }
        });
    }

    const togglePass = document.getElementById('togglePass');
    if (togglePass) {
        togglePass.addEventListener('click', function () {
            const pass = document.getElementById('password');
            if (!pass) return;
            if (pass.type === 'password') {
                pass.type = 'text';
                this.textContent = '🚫';
            } else {
                pass.type = 'password';
                this.textContent = '👁️';
            }
        });
    }

    // Attach click to header login icon(s) to open login page
    const loginIcons = document.querySelectorAll('.login');
        // Show a small chooser popup with Login and Signup options
        function closeAuthPopup() {
            const existing = document.getElementById('authPopup');
            if (existing) existing.remove();
            document.removeEventListener('click', outsideClickListener);
        }

        function outsideClickListener(e) {
            const popup = document.getElementById('authPopup');
            if (!popup) return;
            if (!popup.contains(e.target) && !e.target.classList.contains('login')) {
                closeAuthPopup();
            }
        }

        function createAuthPopup(anchorEl) {
            closeAuthPopup();
            const popup = document.createElement('div');
            popup.id = 'authPopup';
            popup.setAttribute('role', 'dialog');
            popup.setAttribute('aria-label', 'Authentication');
            popup.style.position = 'absolute';
            popup.style.zIndex = 10000;
            popup.style.padding = '8px';
            popup.style.background = 'white';
            popup.style.border = '1px solid #e6cfcf';
            popup.style.borderRadius = '8px';
            popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            popup.style.minWidth = '140px';
            popup.innerHTML = `
                <button id="authLoginBtn" style="display:block;width:100%;padding:8px;border:none;background:#A03C6B;color:#fff;border-radius:6px;margin-bottom:6px;cursor:pointer">Login</button>
                <button id="authSignupBtn" style="display:block;width:100%;padding:8px;border:1px solid #A03C6B;background:#fff;color:#A03C6B;border-radius:6px;cursor:pointer">Signup</button>
            `;

            document.body.appendChild(popup);

            // position popup under the anchor (icon)
            const rect = anchorEl.getBoundingClientRect();
            const top = rect.bottom + window.scrollY + 6;
            // try to align center under icon
            const left = rect.left + window.scrollX - 10;
            popup.style.top = `${top}px`;
            popup.style.left = `${Math.max(8, left)}px`;

            // wire buttons
            const loginBtn = document.getElementById('authLoginBtn');
            const signupBtn = document.getElementById('authSignupBtn');
            if (loginBtn) loginBtn.addEventListener('click', function () { window.location.href = 'login.html'; });
            if (signupBtn) signupBtn.addEventListener('click', function () { window.location.href = 'signup.html'; });

            // stop clicks inside popup from closing it via the document listener
            popup.addEventListener('click', function (e) { e.stopPropagation(); });

            // start listening for outside clicks
            setTimeout(() => document.addEventListener('click', outsideClickListener));
        }

        if (loginIcons.length > 0) {
            loginIcons.forEach(icon => {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', function (e) {
                    e.stopPropagation();
                    createAuthPopup(icon);
                });
            });
        }

        // close with Escape
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAuthPopup(); });
});