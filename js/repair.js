// Function to send repair request via WhatsApp
function sendRepairRequest() {
    // Get form values
    const deviceType = document.querySelector('input[name="deviceType"]:checked')?.value || 'غير محدد';
    const deviceModel = document.getElementById('deviceModel').value || 'غير محدد';
    const processor = document.getElementById('processor').value || 'غير محدد';
    const ram = document.getElementById('ram').value || 'غير محدد';
    const storage = document.getElementById('storage').value || 'غير محدد';
    const gpu = document.getElementById('gpu').value || 'غير محدد';
    const problemDesc = document.getElementById('problemDesc').value || 'غير محدد';
    const customerName = document.getElementById('customerName').value || 'غير محدد';
    const customerPhone = document.getElementById('customerPhone').value || 'غير محدد';
    
    // Check if customer name and phone are provided
    if (!customerName || customerName === 'غير محدد' || !customerPhone || customerPhone === 'غير محدد') {
        alert('يرجى إدخال الاسم ورقم الهاتف');
        return;
    }
    
    // WhatsApp number - بالصيغة الدولية
    const phoneNumber = '201270114646';
    
    // Create WhatsApp message
    const message = `🔧 *طلب صيانة جديد* 🔧
    
*نوع الجهاز:* ${deviceType}
*الموديل:* ${deviceModel}

*المواصفات:*
• المعالج: ${processor}
• الرامات: ${ram}
• التخزين: ${storage}
• كارت الشاشة: ${gpu}

*وصف المشكلة:* 
${problemDesc}

*بيانات العميل:*
👤 الاسم: ${customerName}
📞 الهاتف: ${customerPhone}

تم إرسال الطلب من موقع Tech Market`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}
// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('button[onclick="sendRepairRequest()"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendRepairRequest();
        });
    }
});