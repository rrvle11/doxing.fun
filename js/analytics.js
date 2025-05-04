// Google Analytics 4 Implementation with Privacy Settings

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

// GA4 Configuration with Real-time Tracking
function gtag() {
  window.dataLayer.push(arguments);
}

// Initialize analytics only after consent
function initializeAnalytics() {
  // Initialize GA4 with real-time reporting enabled
  gtag('js', new Date());
  gtag('config', 'G-Q5J7YTSG79', {
    'send_page_view': true,
    'transport_type': 'beacon',
    'page_location': window.location.href,
    'page_title': document.title,
    'cookie_expires': 2592000, // 30 days
    'client_storage': 'none' // Respect privacy settings
  });
}

// Enable debug mode for immediate data verification
gtag('set', 'debug_mode', true);

// Custom event tracking
function trackEvent(category, action, label = null) {
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
}

// Track page views
document.addEventListener('DOMContentLoaded', () => {
  trackEvent('page', 'view', document.title);
});

// Track boot sequence completion
document.querySelector('.click-prompt').addEventListener('click', () => {
  trackEvent('interaction', 'boot_complete');
});

// Track profile views
document.querySelectorAll('.profile-name').forEach(profile => {
  profile.addEventListener('click', () => {
    trackEvent('profile', 'view', profile.dataset.name);
  });
});

// Track music player interactions
document.getElementById('player-toggle').addEventListener('click', () => {
  trackEvent('music', 'player_toggle');
});

document.getElementById('play-btn').addEventListener('click', () => {
  trackEvent('music', 'play');
});

// Load analytics based on cookie consent
function loadAnalytics() {
  if (localStorage.getItem('cookieConsent') === 'accepted') {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Q5J7YTSG79';
    script.onload = initializeAnalytics;
    document.head.appendChild(script);
  }
}