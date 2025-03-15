document.addEventListener('DOMContentLoaded', function() {
    // Initialize confetti
    launchConfetti();
    
    // Calculate days until event
    updateDaysCount();
    
    // Load guest count from localStorage or Firebase
    loadGuestCount();
    
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
    
    // Show success section
    document.getElementById('confirmation-form').reset();
    document.getElementById('confirm-section').classList.add('hidden');
    document.getElementById('success-section').classList.remove('hidden');
    
    // Scroll to success section
    document.getElementById('success-section').scrollIntoView({ behavior: 'smooth' });
    
    // Send notification (in a real app)
    sendNotification(name, guests);
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
    console.log(`Notification: ${name} confirmou presença com ${guests} convidados!`);
    // In a real app, this would send an email or WhatsApp message
    // For now, we'll just log to console
}

// Share functions
function shareWhatsApp() {
    const text = "Venha para o aniversário da Luna! 🎂 Dia 12/04/2025 às 14h. Local: BENFARRAS JUNTO A ROTUNDA ENTRADA VILAMOURA, N125, 8100-068 Loulé";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
} 