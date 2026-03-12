// Function to send contact message via WhatsApp
function sendContactMessage() {
    // Get form values
    const name = document.getElementById('contactName').value || 'غير محدد';
    const phone = document.getElementById('contactPhone').value || 'غير محدد';
    const email = document.getElementById('contactEmail').value || 'غير محدد';
    const message = document.getElementById('contactMessage').value || 'غير محدد';
    
    // Check if name and phone are provided
    if (!name || name === 'غير محدد' || !phone || phone === 'غير محدد') {
        alert('يرجى إدخال الاسم ورقم الهاتف على الأقل');
        return;
    }
    
    // WhatsApp number - بالصيغة الدولية
    const phoneNumber = '201270114646'; // بدون + أو مع + ؟
    
    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString('ar-EG');
    const time = now.toLocaleTimeString('ar-EG');
    
    // Create WhatsApp message
    const whatsappMessage = `📬 *رسالة جديدة من موقع Tech Market* 📬
    
*الاسم:* ${name}
*رقم الهاتف:* ${phone}
*البريد الإلكتروني:* ${email}

*الرسالة:* 
${message}

📅 التاريخ: ${date}
⏰ الوقت: ${time}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL - تأكد من الصيغة
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}