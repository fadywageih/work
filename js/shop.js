// Product Filter
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // highlight active button using data-filter attribute
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    const visibleProducts = [];
    products.forEach(product => {
        const cat = product.getAttribute('data-category');
        const badgeText = product.querySelector('span')?.textContent.trim() || '';
        let show = false;

        if (category === 'all') {
            show = true;
        } else if (category === 'laptop-new' && cat === 'laptop' && badgeText.includes('جديد')) {
            show = true;
        } else if (category === 'laptop-import' && cat === 'laptop' && badgeText.includes('استيراد')) {
            show = true;
        } else if (category === 'pc-new' && cat === 'pc' && badgeText.includes('جديد')) {
            show = true;
        } else if (category === 'pc-import' && cat === 'pc' && badgeText.includes('استيراد')) {
            show = true;
        } else if (![ 'laptop-new','laptop-import','pc-new','pc-import' ].includes(category) && cat === category) {
            // covers monitor, accessories, components
            show = true;
        }

        if (show) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 100);
            visibleProducts.push(product);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });

    // Sort visible products by price (highest to lowest)
    visibleProducts.sort((a, b) => {
        const priceA = parsePrice(a.querySelector('span[class*="text-[#3b82f6]"]')?.textContent || '0');
        const priceB = parsePrice(b.querySelector('span[class*="text-[#3b82f6]"]')?.textContent || '0');
        return priceB - priceA; // descending
    });

    // Reorder in DOM
    const grid = document.getElementById('productsGrid');
    visibleProducts.forEach(product => {
        grid.appendChild(product);
    });
}

// Helper function to parse price
function parsePrice(priceText) {
    return parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
}

// Function to send product order via WhatsApp
function orderProduct(productName, productSpecs, productPrice) {
    const phoneNumber = '201270114646';
    
    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString('ar-EG');
    const time = now.toLocaleTimeString('ar-EG');
    
    // Create message with price included
    const message = `🛒 *طلب شراء جديد* 🛒
    
*المنتج:* ${productName}
*المواصفات:* ${productSpecs}
*السعر:* ${productPrice}

📅 التاريخ: ${date}
⏰ الوقت: ${time}

تم إرسال الطلب من موقع Tech Market`;
    
    // Encode message
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Attach to all "شراء الآن" buttons
document.addEventListener('DOMContentLoaded', function() {
    // Set active filter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    filterProducts(category);
    
    // Set first filter button as active if none active
    if (!document.querySelector('.filter-btn.active')) {
        document.querySelectorAll('.filter-btn')[0]?.classList.add('active');
    }
    
    // Attach click events to product buttons
    const buyNowButtons = document.querySelectorAll('.product-card button');
    
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product card
            const card = this.closest('.product-card');
            
            // Get product details
            const productName = card.querySelector('h3').textContent;
            const productSpecs = card.querySelector('.text-xs.md\\:text-sm, .text-sm.md\\:text-base').textContent;
            const priceElement = card.querySelector('.text-\\[\\#3b82f6\\]');
            const productPrice = priceElement ? priceElement.textContent : 'السعر غير محدد';
            
            // Call order function
            orderProduct(productName, productSpecs, productPrice);
        });
    });
});
let currentSlide = 0;
const slides = document.querySelectorAll('#sliderWrapper > div');
const totalSlides = slides.length;
const sliderWrapper = document.getElementById('sliderWrapper');
let slideInterval;

// Initialize slider
function initSlider() {
    if (sliderWrapper) {
        updateSlider();
        startAutoSlide();
        
        // Pause auto slide on hover
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }
}

// Update slider position
function updateSlider() {
    if (sliderWrapper) {
        // For RTL layout, translate right (positive values) instead of left
        sliderWrapper.style.transform = `translateX(${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-[#3b82f6]', 'w-6', 'md:w-8');
                dot.classList.remove('bg-white/50', 'w-2', 'md:w-3');
            } else {
                dot.classList.remove('bg-[#3b82f6]', 'w-6', 'md:w-8');
                dot.classList.add('bg-white/50', 'w-2', 'md:w-3');
            }
        });
    }
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

// Auto slide
function startAutoSlide() {
    if (!slideInterval) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    
    // Make slider functions global
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.goToSlide = goToSlide;
});