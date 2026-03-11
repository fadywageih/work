// Product Filter
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('الكل') && category === 'all') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('لابتوب') && category === 'laptop') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('بي سي') && category === 'pc') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('شاشات') && category === 'monitor') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('اكسسوارات') && category === 'accessories') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('قطع غيار') && category === 'components') {
            btn.classList.add('active');
        }
    });
    
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 100);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// Function to send product order via WhatsApp
function orderProduct(productName, productSpecs, productPrice) {
    const phoneNumber = '201060344638';
    
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