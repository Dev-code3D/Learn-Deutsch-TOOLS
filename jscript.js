// jscript.js

// Function to open and close the QR modal
function openQrModal() {
      document.getElementById('qr-modal').classList.remove('hidden');
      document.getElementById('qr-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeQrModal() {
      document.getElementById('qr-modal').classList.add('hidden');
      document.getElementById('qr-modal').classList.remove('flex');
      document.body.style.overflow = '';
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeQrModal();
      }
    });

    // Close modal on background click
    document.getElementById('qr-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeQrModal();
      }
    });
