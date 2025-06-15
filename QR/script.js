function generateQR() {
    // Get the input values
    const countryCode = document.getElementById('country-code').value;
    const mobileNumber = document.getElementById('mobile-input').value;
    const additionalText = document.getElementById('text-input').value;
    
    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';
    
    // Hide download button initially
    document.getElementById('download-btn').style.display = 'none';
    
    // Check if mobile number is empty
    if (!mobileNumber) {
        alert('Please enter a mobile number');
        return;
    }
    
    // Validate mobile number (only digits)
    if (!/^\d+$/.test(mobileNumber)) {
        alert('Please enter a valid mobile number (digits only)');
        return;
    }
    
    // Remove the '+' from country code for WhatsApp URL
    const cleanCountryCode = countryCode.replace('+', '');
    
    // URL encode the additional text
    const encodedText = additionalText ? encodeURIComponent(additionalText) : '';
    
    // Create WhatsApp URL with encoded text
    const qrText = `https://wa.me/${cleanCountryCode}${mobileNumber}${encodedText ? `?text=${encodedText}` : ''}`;
    
    // Generate QR code
    new QRCode(document.getElementById('qrcode'), {
        text: qrText,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button after QR is generated
    document.getElementById('download-btn').style.display = 'block';
}

function downloadQR() {
    // Get the QR code image
    const qrImage = document.querySelector('#qrcode img');
    
    if (!qrImage) {
        alert('Please generate a QR code first');
        return;
    }

    // Create a canvas with white background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (slightly larger than QR code for padding)
    const padding = 20;
    canvas.width = qrImage.width + (padding * 2);
    canvas.height = qrImage.height + (padding * 2);
    
    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR code in the center
    ctx.drawImage(qrImage, padding, padding);
    
    // Convert canvas to PNG and download
    const link = document.createElement('a');
    link.download = 'whatsapp-qr.png';
    link.href = canvas.toDataURL('image/png');
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 