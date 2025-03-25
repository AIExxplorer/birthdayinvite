document.addEventListener('DOMContentLoaded', function() {
    // Initialize confetti
    launchConfetti();
    
    // Calculate days until event
    updateDaysCount();
    
    // Load guest count from localStorage or Firebase
    loadGuestCount();
    
    // Start image slideshow
    startSlideshow();
    
    // Capture lead from Confirm Presence button click
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', captureLeadData);
    }
    
    // Form submission
    const confirmationForm = document.getElementById('confirmation-form');
    if (confirmationForm) {
        confirmationForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add to calendar button
    const addToCalendarBtn = document.getElementById('add-to-calendar');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', generateCalendarFile);
    }
    
    // Download badge button
    const downloadBadgeBtn = document.getElementById('download-badge');
    if (downloadBadgeBtn) {
        downloadBadgeBtn.addEventListener('click', downloadBadge);
    }
});

// Capture basic user data when clicking on "Confirm Presence" button
function captureLeadData(event) {
    // We want the link to still work, but we'll collect data first
    
    // Check if the browser supports notifications
    if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // We can ask for more data now
                collectUserData();
            }
        });
    } else {
        // Just collect data silently
        collectUserData();
    }
}

// Show modal or prompt to collect user data
function collectUserData() {
    // Check if the user already has a saved ID (for returning visitors)
    const visitorId = localStorage.getItem('visitorId');
    if (visitorId) {
        // They've been here before, just update their last visit
        updateVisitorActivity(visitorId);
        return;
    }
    
    // Use browser APIs to get some basic info
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;
    const timestamp = new Date().toISOString();
    
    // Generate a visitor ID
    const newVisitorId = generateVisitorId();
    localStorage.setItem('visitorId', newVisitorId);
    
    // Save visitor data to leads list
    const visitorData = {
        id: newVisitorId,
        userAgent,
        language,
        screenSize,
        referrer,
        firstVisit: timestamp,
        lastVisit: timestamp,
        status: 'interested', // They clicked on Confirm Presence
        converted: false
    };
    
    // Add to leads list in localStorage
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    leadsList.push(visitorData);
    localStorage.setItem('leadsList', JSON.stringify(leadsList));
    
    // You could also attempt to get more precise location data if needed
    // This requires user permission in modern browsers
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Update the lead with location data
            updateLeadWithLocation(newVisitorId, position);
        }, error => {
            // Handle error or user declining to share location
            console.log('Location data not available');
        });
    }
}

// Helper function to generate a unique ID for visitors
function generateVisitorId() {
    return 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime();
}

// Update existing visitor data
function updateVisitorActivity(visitorId) {
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    const updatedList = leadsList.map(lead => {
        if (lead.id === visitorId) {
            return {
                ...lead,
                lastVisit: new Date().toISOString(),
                visitCount: (lead.visitCount || 1) + 1
            };
        }
        return lead;
    });
    
    localStorage.setItem('leadsList', JSON.stringify(updatedList));
}

// Update lead with location data if available
function updateLeadWithLocation(visitorId, position) {
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    const updatedList = leadsList.map(lead => {
        if (lead.id === visitorId) {
            return {
                ...lead,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        }
        return lead;
    });
    
    localStorage.setItem('leadsList', JSON.stringify(updatedList));
}

// Image slideshow function
function startSlideshow() {
    const images = document.querySelectorAll('.luna-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Function to show next image with smooth transition
    function showNextImage() {
        // Hide current image
        images[currentIndex].classList.remove('active');
        
        // Calculate next index
        currentIndex = (currentIndex + 1) % images.length;
        
        // Show next image
        images[currentIndex].classList.add('active');
    }
    
    // Change image every 3 seconds
    setInterval(showNextImage, 3000);
}

// Confetti animation
function launchConfetti() {
    const colors = ['#F29CA5', '#FBA445', '#7da3ac', '#ffe0c2'];
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
    });
    
    // Launch confetti every 3 seconds
    setInterval(() => {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors,
            disableForReducedMotion: true
        });
    }, 3000);
}

// Calculate days until event
function updateDaysCount() {
    const eventDate = new Date('April 12, 2025 16:00:00');
    const today = new Date();
    
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const daysCountElement = document.getElementById('days-count');
    if (daysCountElement) {
        daysCountElement.textContent = diffDays > 0 ? diffDays : 0;
    }
}

// Load guest count
function loadGuestCount() {
    // For now, we'll use localStorage. In a real app, this would be from Firebase or another backend
    const confirmedGuests = localStorage.getItem('confirmedGuests') || 0;
    
    const confirmedCountElement = document.getElementById('confirmed-count');
    if (confirmedCountElement) {
        confirmedCountElement.textContent = confirmedGuests;
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;
    
    // Save to localStorage (in a real app, this would be sent to a server)
    saveGuest(name, email, guests);
    
    // Update guest count
    updateGuestCount(parseInt(guests));
    
    // Update badge with guest name
    updateBadge(name);
    
    // Update the lead to converted if they have a visitor ID
    const visitorId = localStorage.getItem('visitorId');
    if (visitorId) {
        convertLead(visitorId, name, email);
    }
    
    // Show success section
    document.getElementById('confirmation-form').reset();
    document.getElementById('confirm-section').classList.add('hidden');
    document.getElementById('success-section').classList.remove('hidden');
    
    // Scroll to success section
    document.getElementById('success-section').scrollIntoView({ behavior: 'smooth' });
    
    // Send notification (in a real app)
    sendNotification(name, guests);
    
    // Check if this confirmation came from the invite list
    checkForInviteConfirmation(email, name);
}

// Save guest information
function saveGuest(name, email, guests) {
    // In a real app, this would be sent to a server/database
    // For now, we'll use localStorage
    const guestData = {
        name: name,
        email: email,
        guests: guests,
        timestamp: new Date().toISOString()
    };
    
    let savedGuests = JSON.parse(localStorage.getItem('guests') || '[]');
    savedGuests.push(guestData);
    localStorage.setItem('guests', JSON.stringify(savedGuests));
}

// Update guest count
function updateGuestCount(newGuests) {
    const currentCount = parseInt(localStorage.getItem('confirmedGuests') || '0');
    const newCount = currentCount + newGuests;
    
    localStorage.setItem('confirmedGuests', newCount);
    
    const confirmedCountElement = document.getElementById('confirmed-count');
    if (confirmedCountElement) {
        confirmedCountElement.textContent = newCount;
    }
}

// Update badge with guest name
function updateBadge(name) {
    const badgeNameElement = document.querySelector('.badge-name');
    if (badgeNameElement) {
        badgeNameElement.textContent = name;
    }
}

// Generate and download calendar file
function generateCalendarFile() {
    const eventTitle = "Aniversário da Luna - 3 Anos";
    const eventStart = "20250412T160000";
    const eventEnd = "20250412T193000";
    const eventLocation = "BENFARRAS JUNTO A ROTUNDA ENTRADA VILAMOURA, N125, 8100-068 Loulé";
    const eventDescription = "Festa de aniversário da Luna";
    
    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `SUMMARY:${eventTitle}`,
        `DTSTART:${eventStart}`,
        `DTEND:${eventEnd}`,
        `LOCATION:${eventLocation}`,
        `DESCRIPTION:${eventDescription}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\n");
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "aniversario_luna.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download badge as image
function downloadBadge() {
    const badgeElement = document.getElementById('virtual-badge');
    
    html2canvas(badgeElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'cracha_luna_aniversario.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Send notification (mock function)
function sendNotification(name, guests) {
    const adminEmail = localStorage.getItem('notificationEmail') || "lunamouraaguiar22@gmail.com";
    console.log(`Notification to ${adminEmail}: ${name} confirmou presença com ${guests} convidados!`);
    
    // In a real app, this would send an email to the admin
    // Example of what would happen in a real implementation:
    /*
    fetch('/api/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipientEmail: adminEmail,
            subject: 'Nova confirmação de presença',
            message: `${name} confirmou presença com ${guests} convidados!`,
            guestEmail: document.getElementById('email').value
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Notification sent:', data))
    .catch(error => console.error('Error sending notification:', error));
    */
}

// Share functions
function shareWhatsApp() {
    const text = "Venha para o aniversário da Luna! 🎂 Dia 12/04/2025 às 14h. Local: BENFARRAS JUNTO A ROTUNDA ENTRADA VILAMOURA, N125, 8100-068 Loulé";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
}

// Check if confirmation came from invited guest
function checkForInviteConfirmation(email, name) {
    // If admin.js is not loaded, we need to define this function
    if (typeof window.checkForInviteConfirmation !== 'function') {
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        
        // Check if name or phone matches someone in the invite list
        const matchedGuest = invitesList.find(guest => 
            guest.name.toLowerCase() === name.toLowerCase() || 
            guest.phone.includes(email.replace(/[^0-9]/g, '')));
        
        if (matchedGuest) {
            const notificationEmail = localStorage.getItem('notificationEmail') || 'lunamouraaguiar22@gmail.com';
            console.log(`Notificação para ${notificationEmail}: Um convidado da sua lista de convites confirmou presença: ${name}`);
            
            // Mark as confirmed in the invites list
            const updatedList = invitesList.map(guest => {
                if (guest.name.toLowerCase() === name.toLowerCase() || 
                    guest.phone.includes(email.replace(/[^0-9]/g, ''))) {
                    return { ...guest, status: 'confirmed', confirmedAt: new Date().toISOString() };
                }
                return guest;
            });
            
            localStorage.setItem('invitesList', JSON.stringify(updatedList));
        }
    } else {
        // If admin.js is loaded, use its function
        window.checkForInviteConfirmation(email, name);
    }
}

// Convert a lead to a confirmed guest
function convertLead(visitorId, name, email) {
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    const updatedList = leadsList.map(lead => {
        if (lead.id === visitorId) {
            return {
                ...lead,
                name: name,
                email: email,
                converted: true,
                status: 'confirmed',
                conversionTime: new Date().toISOString()
            };
        }
        return lead;
    });
    
    localStorage.setItem('leadsList', JSON.stringify(updatedList));
} 