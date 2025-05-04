// Security and anti-scraping protection
const protectionModule = (() => {
    // Set security headers
    const setSecurityHeaders = () => {
        // Add CSP header via meta tag since we can't modify server headers directly
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
        document.head.appendChild(cspMeta);

        // Add other security meta tags
        const xssProtection = document.createElement('meta');
        xssProtection.httpEquiv = 'X-XSS-Protection';
        xssProtection.content = '1; mode=block';
        document.head.appendChild(xssProtection);

        const frameOptions = document.createElement('meta');
        frameOptions.httpEquiv = 'X-Frame-Options';
        frameOptions.content = 'DENY';
        document.head.appendChild(frameOptions);
    };

    // Sanitize input to prevent XSS
    const sanitizeInput = (input) => {
        return input.replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    };

    // Apply input sanitization to all form inputs
    const setupInputSanitization = () => {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = sanitizeInput(e.target.value);
            });
        });
    };
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable keyboard shortcuts for saving/printing
    document.addEventListener('keydown', (e) => {
        if (
            (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
            (e.key === 'F12') ||
            (e.ctrlKey && e.shiftKey && e.key === 'i')
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent text selection
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // Add invisible elements to confuse scrapers
    const addHoneypots = () => {
        const honeypots = document.createElement('div');
        honeypots.style.display = 'none';
        honeypots.innerHTML = `
            <a href="/fake-link-1">Hidden Link</a>
            <a href="/fake-link-2">Hidden Link</a>
            <div class="content">Fake Content</div>
        `;
        document.body.appendChild(honeypots);
    };

    // Dynamic content loading delay with consistent timing
    const delayContentLoad = () => {
        const elements = document.querySelectorAll('.profile-name, #profile-desc');
        elements.forEach(el => {
            const originalContent = el.textContent;
            el.textContent = '';
            setTimeout(() => {
                el.textContent = originalContent;
            }, 300);
        });
    };

    // Synchronized image loading
    const protectImages = () => {
        document.querySelectorAll('img').forEach(img => {
            // Skip delay for logo images
            if (img.alt && img.alt.toLowerCase().includes('logo')) {
                return;
            }
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = originalSrc;
            }, 500);
        });
    };

    // Initialize protection measures
    const init = () => {
        setSecurityHeaders();
        setupInputSanitization();
        addHoneypots();
        delayContentLoad();
        protectImages();

        // Add random class names
        document.querySelectorAll('*').forEach(el => {
            if (el.className) {
                el.className += ` _${Math.random().toString(36).substr(2, 9)}`;
            }
        });
    };

    return { init };
})();

// Initialize protection when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    protectionModule.init();
});