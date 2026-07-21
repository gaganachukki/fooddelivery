// Stackly Global Scripts

// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Cart Logic
let cartItems = JSON.parse(localStorage.getItem('stackly_cart')) || [];

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

function updateCartUI() {
    const cartBadges = document.querySelectorAll('.cart-count-badge');
    const floatingBar = document.getElementById('item-view-cart');
    const barCount = document.getElementById('cart-bar-count');
    const barTotal = document.getElementById('cart-bar-total');
    
    const count = cartItems.length;
    let total = 0;
    cartItems.forEach(item => total += item.price);

    cartBadges.forEach(badge => {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
        if(count > 0) {
            badge.classList.add('scale-in');
            setTimeout(() => badge.classList.remove('scale-in'), 300);
        }
    });

    // Show floating bar on all screen sizes whenever cart has items
    if (floatingBar) {
        if (count > 0) {
            floatingBar.style.display = 'flex';
            if (barCount) barCount.innerText = `${count} ${count === 1 ? 'ITEM' : 'ITEMS'}`;
            if (barTotal) barTotal.innerText = `₹${total}`;
        } else {
            floatingBar.style.display = 'none';
        }
    }
}

function addToCart(itemName, price, img) {
    // Function removed. Redirection handled by HTML <a> tags, or explicitly here as fallback
    window.location.href = "404.html";
}

// Global Toast System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('active'), 10);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Search Logic (Homepage to Menu)
function handleSearch(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const query = input.value.trim();
    if (query) {
        window.location.href = `menu.html?search=${encodeURIComponent(query)}`;
    } else {
        showToast('Please enter a location or dish to search', 'warning');
    }
}

// City Search Handler
function handleCitySearch(event, cityName) {
    if (event) event.preventDefault();
    showToast(`Searching for restaurants in ${cityName}...`, 'info');
    setTimeout(() => {
        window.location.href = `menu.html?search=${encodeURIComponent(cityName)}`;
    }, 800);
}

// Auth Handlers
function handleAuth(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const role = form.querySelector('#user-role').value;

    if (!email.includes('@') || password.length < 6) {
        showToast('Please enter a valid email and at least 6 characters for password', 'error');
        return;
    }

    const originalText = btn.innerText;
    btn.innerText = 'Authenticating...';
    btn.disabled = true;

    showToast(`Authenticating move to ${role} dashboard...`, 'info');
    
    setTimeout(() => {
        // Mock validation for Admin
        if (role === 'admin' && email !== 'admin@stackly.com') {
            showToast('Invalid admin credentials. Hint: use admin@stackly.com', 'error');
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        if (role === 'admin' || role === 'restaurant') {
            showToast('Authentication successful!', 'success');
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 1000);
        } else {
            showToast('Log In successful! Welcome back.', 'success');
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 1000);
        }
    }, 1500);
}

function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (name.trim().length < 3) {
        showToast('Full name must be at least 3 characters', 'error');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    const phoneRegex = /^[0-9\s-+]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showToast('Please enter a valid phone number (min 10 digits)', 'error');
        return;
    }
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    const originalText = btn.innerText;
    btn.innerText = 'Creating Account...';
    btn.disabled = true;

    showToast('Registering your account...', 'info');
    setTimeout(() => {
        showToast('Account created successfully! Please log in.', 'success');
        setTimeout(() => {
            window.location.href = "Login.html";
        }, 1500);
    }, 2000);
}

function sendMessage(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    function showError(inputEl, message) {
        let errorEl = inputEl.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('error-text')) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-text';
            errorEl.style.color = '#e74c3c';
            errorEl.style.fontSize = '12px';
            errorEl.style.marginTop = '4px';
            errorEl.style.marginBottom = '0px';
            errorEl.style.textAlign = 'left';
            inputEl.parentNode.insertBefore(errorEl, inputEl.nextSibling);
        }
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    function clearError(inputEl) {
        let errorEl = inputEl.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-text')) {
            errorEl.style.display = 'none';
        }
    }

    inputs.forEach(input => {
        clearError(input);
        input.addEventListener('input', () => clearError(input));
        
        if (input.type === 'email') {
            if (!input.value.trim() || !input.value.includes('@')) {
                showError(input, 'Valid Email Address is required');
                isValid = false;
            }
        } else if (input.tagName.toLowerCase() === 'textarea') {
            if (!input.value.trim()) {
                showError(input, 'Message is required');
                isValid = false;
            }
        } else {
            if (!input.value.trim()) {
                showError(input, 'Full Name is required');
                isValid = false;
            }
        }
    });

    if (!isValid) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.disabled = true;

    showToast('Sending your inquiry...', 'info');
    
    setTimeout(() => {
        window.location.href = '404.html';
    }, 1500);
}

// Skeleton UI Simulation
function initSkeleton(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const originalHTML = container.innerHTML;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="skeleton-card" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee;">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton skeleton-text" style="width:60%"></div>
                <div class="skeleton skeleton-text" style="width:40%"></div>
            </div>
        `;
    }

    setTimeout(() => {
        container.innerHTML = originalHTML;
        // Re-inject fade-in animation
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 0.5s ease';
            container.style.opacity = '1';
            // Re-observe restored elements
            initScrollReveal();
        }, 50);
    }, 1500);
}

// Scroll Reveal Animation (Intersection Observer)
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el, index) => {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // New: Counter Animation Logic
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let start = 0;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentCount = Math.floor(progress * target);
                    
                    entry.target.innerText = currentCount;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        entry.target.innerText = target;
                    }
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-counter').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initScrollReveal();

    // Auto-skeleton for grids if on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('stackly/')) {
        initSkeleton('food-grid-main', 8);
        initSkeleton('grocery-grid-main', 6);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));

            // Toggle Icon (Hamburger to X)
            const icon = mobileMenuToggle.querySelector('svg');
            if (isOpen) {
                icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
            } else {
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.querySelector('svg').innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        });
    });

    // Menu Search/Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-grid .card');
    const searchInput = document.querySelector('.menu-hero input');

    // Handle Query Params (Category & Search)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    function applyFilters() {
        const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        const searchQuery = searchInput?.value.toLowerCase() || '';

        menuItems.forEach(item => {
            const category = item.getAttribute('data-category')?.toLowerCase() || '';
            const city = item.getAttribute('data-city')?.toLowerCase() || '';
            const title = item.querySelector('h3').innerText.toLowerCase();
            const desc = item.querySelector('p').innerText.toLowerCase();

            const matchesFilter = activeFilter === 'all' || category === activeFilter.toLowerCase();
            const matchesSearch = title.includes(searchQuery) || 
                                 desc.includes(searchQuery) || 
                                 city.includes(searchQuery) ||
                                 category.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
        if (searchParam) {
            searchInput.value = searchParam;
            applyFilters();
        }
    }

    if (categoryParam) {
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === categoryParam) {
                btn.click();
            }
        });
    }

    // Bug #7: Make property/food cards navigate to details page
    document.querySelectorAll('.menu-grid .card, .popular-scroll .card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Prevent triggering if clicking a button
            if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // For Restaurant Cards, go to Menu
            if (card.classList.contains('restaurant-card')) {
                const cat = card.getAttribute('data-category') || 'Indian';
                window.location.href = `menu.html?category=${encodeURIComponent(cat)}`;
                return;
            }

            // For Food Item Cards, go to Details
            const title = card.querySelector('h3')?.innerText || 'Delicious Item';
            let priceText = card.querySelector('span[style*="font-size: 20px"], .card-content span[style*="₹"]')?.innerText || '199';
            const priceMatch = priceText.match(/\d+/);
            const price = priceMatch ? priceMatch[0] : '199';
            const img = card.querySelector('img')?.getAttribute('src') || '';
            window.location.href = `details.html?title=${encodeURIComponent(title)}&price=${price}&img=${encodeURIComponent(img)}`;
        });
    });
});

// Animation Keyframes in JS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideUp {
        from { bottom: -50px; opacity: 0; }
        to { bottom: 30px; opacity: 1; }
    }
    .cart-count-badge {
        background: black;
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 50%;
        margin-left: 5px;
        vertical-align: top;
    }
`;
document.head.appendChild(style);
