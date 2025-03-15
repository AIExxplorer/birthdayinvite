document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Settings and logout links
    const settingsLink = document.getElementById('settings-link');
    const logoutLink = document.getElementById('logout-link');
    
    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.dashboard-section').classList.add('hidden');
            document.getElementById('settings-section').classList.remove('hidden');
        });
    }
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Check if admin is logged in on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        if (!localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'index.html';
        } else {
            loadDashboardData();
        }
    }
    
    // Settings form handling
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const notificationEmail = document.getElementById('notification-email').value;
            localStorage.setItem('notificationEmail', notificationEmail);
            
            const messageElement = document.getElementById('settings-message');
            messageElement.textContent = 'Alterações guardadas com sucesso!';
            messageElement.classList.add('success-message');
            
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('success-message');
            }, 3000);
        });
    }
    
    // Export PDF functionality
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportGuestsToPdf);
    }
    
    // Refresh data functionality
    const refreshDataBtn = document.getElementById('refresh-data');
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', loadDashboardData);
    }
});

// Handle admin login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const messageElement = document.getElementById('login-message');
    
    // Check credentials
    if (email === "lunamouraaguiar22@gmail.com" && password === "Faro2022!") {
        // Set logged in state
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        messageElement.textContent = 'Email ou password incorretos!';
        messageElement.classList.add('error-message');
        
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.classList.remove('error-message');
        }, 3000);
    }
}

// Load dashboard data
function loadDashboardData() {
    // Get guests data from localStorage
    const guests = JSON.parse(localStorage.getItem('guests') || '[]');
    const totalGuests = guests.reduce((total, guest) => total + parseInt(guest.guests), 0);
    const totalConfirmations = guests.length;
    
    // Update stats
    document.getElementById('total-guests').textContent = totalGuests;
    document.getElementById('total-confirmations').textContent = totalConfirmations;
    
    // Update table
    const tableBody = document.getElementById('guests-table-body');
    tableBody.innerHTML = '';
    
    if (guests.length === 0) {
        document.getElementById('guests-table').style.display = 'none';
        document.querySelector('.no-data-message').style.display = 'block';
    } else {
        document.getElementById('guests-table').style.display = 'table';
        document.querySelector('.no-data-message').style.display = 'none';
        
        guests.forEach(guest => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = guest.name;
            
            const emailCell = document.createElement('td');
            emailCell.textContent = guest.email;
            
            const guestsCell = document.createElement('td');
            guestsCell.textContent = guest.guests;
            
            const dateCell = document.createElement('td');
            const date = new Date(guest.timestamp);
            dateCell.textContent = date.toLocaleDateString('pt-PT') + ' ' + date.toLocaleTimeString('pt-PT');
            
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(guestsCell);
            row.appendChild(dateCell);
            
            tableBody.appendChild(row);
        });
    }
}

// Export guests to PDF
function exportGuestsToPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Lista de Convidados - Aniversário da Luna', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text('Data de exportação: ' + new Date().toLocaleDateString('pt-PT'), 14, 30);
    
    // Get guests data
    const guests = JSON.parse(localStorage.getItem('guests') || '[]');
    
    if (guests.length === 0) {
        doc.text('Nenhum convidado confirmado ainda.', 14, 40);
    } else {
        // Format data for autotable
        const tableData = guests.map(guest => [
            guest.name,
            guest.email,
            guest.guests,
            new Date(guest.timestamp).toLocaleDateString('pt-PT')
        ]);
        
        // Add table
        doc.autoTable({
            head: [['Nome', 'Email', 'Nº de Convidados', 'Data de Confirmação']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [242, 156, 165]
            }
        });
    }
    
    // Save PDF
    doc.save('convidados_aniversario_luna.pdf');
} 