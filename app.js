// Simple Router for SPA
const routes = {
  '/': homePage,
  '/about': aboutPage,
  '/contact': contactPage,
};

function homePage() {
  return `
    <h1>Welcome Home!</h1>
    <p>This is a simple Single Page Application (SPA) built with HTML, CSS, and JavaScript.</p>
    <p>Use the navigation above to switch pages without reloading!</p>
  `;
}

function aboutPage() {
  return `
    <h1>About</h1>
    <p>This SPA demonstrates basic routing using only vanilla JavaScript.</p>
    <ul>
      <li>Single HTML file</li>
      <li>Single CSS file</li>
      <li>Single JS file</li>
    </ul>
  `;
}

function contactPage() {
  return `
    <h1>Contact</h1>
    <p>Have questions? Email us at <a href="mailto:info@example.com">info@example.com</a>.</p>
    <form id="contact-form">
      <label>
        Name:<br>
        <input type="text" name="name" required>
      </label><br><br>
      <label>
        Message:<br>
        <textarea name="message" required></textarea>
      </label><br><br>
      <button type="submit">Send</button>
    </form>
    <div id="form-result"></div>
  `;
}

// SPA Router logic
function router() {
  const path = location.hash.slice(1).toLowerCase() || '/';
  const page = routes[path] || notFoundPage;
  document.getElementById('app').innerHTML = page();

  setActiveLink(path);

  // Add form submit handler if on contact page
  if(path === '/contact') {
    const form = document.getElementById("contact-form");
    if(form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        document.getElementById("form-result").textContent = "Thank you, " + form.name.value + "! Your message has been sent.";
        form.reset();
      }
    }
  }
}

// 404 page
function notFoundPage() {
  return `
    <h1>404 - Not Found</h1>
    <p>The page you requested does not exist.</p>
  `;
}

// Highlight active nav link
function setActiveLink(path) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if(href === path || (href === '/' && path === '/')) {
      link.classList.add('active');
    }
  });
}

// Listen for navigation
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);