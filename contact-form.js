// Initialize EmailJS
(function() {
    emailjs.init("tb7i4Xgls4000oJUD");
})();

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('emailBtn');
    const span = document.querySelector('.close');
    const form = document.getElementById('contactForm');
    const messageBox = document.getElementById('form-message');
    
    // Open modal when Email Us button is clicked
    if (btn) {
        btn.onclick = function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        };
    }
    
    // Close modal when X is clicked
    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };
    }
    
    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    };
    
    // Form submission handler
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Send email using EmailJS
            emailjs.sendForm("explorers_query_response", "template_neaz1lm", this)
                .then(function(response) {
                    // Success message
                    showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                    form.reset();
                }, function(error) {
                    // Error message
                    showMessage('Failed to send message. Please try again later.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        };
    }
    
    // Helper function to show messages
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = '';
        messageBox.classList.add(type);
        messageBox.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(function() {
            messageBox.style.display = 'none';
        }, 5000);
    }
});
