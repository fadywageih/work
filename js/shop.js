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
        } else if (!['laptop-new','laptop-import','pc-new','pc-import'].includes(category) && cat === category) {
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
        return priceB - priceA;
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
    
    const now = new Date();
    const date = now.toLocaleDateString('ar-EG');
    const time = now.toLocaleTimeString('ar-EG');
    
    const message = `🛒 *طلب شراء جديد* 🛒
    
*المنتج:* ${productName}
*المواصفات:* ${productSpecs}
*السعر:* ${productPrice}

📅 التاريخ: ${date}
⏰ الوقت: ${time}

تم إرسال الطلب من موقع Tech Market`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Attach to all "شراء الآن" buttons
document.addEventListener('DOMContentLoaded', function() {
    // Set active filter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    filterProducts(category);
    
    if (!document.querySelector('.filter-btn.active')) {
        document.querySelectorAll('.filter-btn')[0]?.classList.add('active');
    }
    
    // Attach click events to product buttons
    const buyNowButtons = document.querySelectorAll('.product-card button');
    
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.product-card');
            
            const productName = card.querySelector('h3').textContent;
            const productSpecs = card.querySelector('.text-xs.md\\:text-sm, .text-sm.md\\:text-base').textContent;
            const priceElement = card.querySelector('.text-\\[\\#3b82f6\\]');
            const productPrice = priceElement ? priceElement.textContent : 'السعر غير محدد';
            
            orderProduct(productName, productSpecs, productPrice);
        });
    });

    // ========== الكود النهائي لفتح المودال مع الرسالة المخصصة ==========
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalThumb1 = document.getElementById('modalThumb1');
    const modalThumb2 = document.getElementById('modalThumb2');
    const modalThumb3 = document.getElementById('modalThumb3');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductSpecs = document.getElementById('modalProductSpecs');
    const modalCustomMessage = document.getElementById('modalCustomMessage');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button') || e.target.closest('.overlay-btn')) return;

            // --- 1. Update Images ---
            const mainImg = card.querySelector('img')?.src || '';
            let images = [];
            
            if (card.dataset.images) {
                images = card.dataset.images.split(',').map(u => u.trim()).filter(Boolean);
            }

            if (images.length === 0) {
                images = [mainImg, mainImg, mainImg];
            } else if (images.length === 1) {
                images = [images[0], images[0], images[0]];
            } else if (images.length === 2) {
                images.push(images[0]);
            }

            modalMainImage.src = images[0] || mainImg;
            modalThumb1.src = images[0] || mainImg;
            modalThumb2.src = images[1] || mainImg;
            modalThumb3.src = images[2] || mainImg;

            // --- 2. Update Text Details ---
            const productName = card.querySelector('h3')?.textContent || 'منتج';
            const productSpecs = card.querySelector('.text-xs.md\\:text-sm, .text-sm.md\\:text-base')?.textContent || '';
            const priceEl = card.querySelector('.text-\\[\\#3b82f6\\]');
            const price = priceEl ? priceEl.textContent : '';
            const ratingStars = card.querySelector('.flex.text-\\[\\#f59e0b\\]')?.innerHTML || '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
            
            // الرسالة المخصصة من data-message (دي أهم نقطة)
            const customMessage = card.dataset.message || '🔥 عرض خاص - لفترة محدودة - استيراد بحالة ممتازة 🔥';

            if (modalProductTitle) {
                modalProductTitle.textContent = productName;
            }

            if (modalProductSpecs) {
                modalProductSpecs.innerHTML = `<p class="text-2xl font-medium text-[#f3f4f6]">${productSpecs}</p>`;
            }

            if (modalCustomMessage) {
                modalCustomMessage.innerHTML = customMessage;
            }

            const priceSection = document.getElementById('modalPrice');
            if (priceSection) priceSection.textContent = price;

            const ratingContainer = document.querySelector('#productModal .flex.text-\\[\\#f59e0b\\].gap-1.text-lg');
            if (ratingContainer) ratingContainer.innerHTML = ratingStars;

            // --- 3. Update Buy Button ---
            const modalBuyBtn = document.getElementById('modalBuyBtn');
            if (modalBuyBtn) {
                const newBuyBtn = modalBuyBtn.cloneNode(true);
                modalBuyBtn.parentNode.replaceChild(newBuyBtn, modalBuyBtn);
                
                newBuyBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    orderProduct(productName, productSpecs, price);
                });
            }

            // --- 4. Show Modal ---
            modal.classList.remove('hidden');
        });
    });

    // close events
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    window.setMainImage = function(src) {
        const mainImage = document.getElementById('modalMainImage');
        if (mainImage) {
            mainImage.src = src;
        }
    };
});

// Slider Code
let currentSlide = 0;
const slides = document.querySelectorAll('#sliderWrapper > div');
const totalSlides = slides.length;
const sliderWrapper = document.getElementById('sliderWrapper');
let slideInterval;

function initSlider() {
    if (sliderWrapper) {
        updateSlider();
        startAutoSlide();
        
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }
}

function updateSlider() {
    if (sliderWrapper) {
        sliderWrapper.style.transform = `translateX(${currentSlide * 100}%)`;
        
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

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

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

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.goToSlide = goToSlide;
});