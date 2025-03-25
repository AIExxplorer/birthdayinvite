document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Initialize admin email in header
    const adminEmailDisplay = document.getElementById('admin-email-display');
    if (adminEmailDisplay) {
        adminEmailDisplay.textContent = localStorage.getItem('adminEmail') || '';
    }
    
    // Settings and logout links
    const settingsLink = document.getElementById('settings-link');
    const backToDashboard = document.getElementById('back-to-dashboard');
    const logoutLink = document.getElementById('logout-link');
    
    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.dashboard-section').classList.add('hidden');
            document.getElementById('settings-section').classList.remove('hidden');
        });
    }
    
    if (backToDashboard) {
        backToDashboard.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.dashboard-section').classList.remove('hidden');
            document.getElementById('settings-section').classList.add('hidden');
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
            updateDaysRemaining();
            loadInvitesList();
            loadLeadsList();
            
            // Initialize event listeners for guests list management
            initGuestListManagement();
            
            // Initialize event listeners for leads management
            initLeadsManagement();
        }
    }
    
    // Settings form handling
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        // Load saved settings
        const savedMessage = localStorage.getItem('invitationMessage');
        if (savedMessage) {
            document.getElementById('invitation-message').value = savedMessage;
        }
        
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const notificationEmail = document.getElementById('notification-email').value;
            const invitationMessage = document.getElementById('invitation-message').value;
            
            localStorage.setItem('notificationEmail', notificationEmail);
            localStorage.setItem('invitationMessage', invitationMessage);
            
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
    
    // Export Leads PDF functionality
    const exportLeadsPdfBtn = document.getElementById('export-leads-pdf');
    if (exportLeadsPdfBtn) {
        exportLeadsPdfBtn.addEventListener('click', exportLeadsToPdf);
    }
    
    // Refresh data functionality
    const refreshDataBtn = document.getElementById('refresh-data');
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', loadDashboardData);
    }
    
    // Refresh leads functionality
    const refreshLeadsBtn = document.getElementById('refresh-leads');
    if (refreshLeadsBtn) {
        refreshLeadsBtn.addEventListener('click', loadLeadsList);
    }
});

// Calculate days remaining until the event
function updateDaysRemaining() {
    const eventDate = new Date('April 12, 2025 16:00:00');
    const today = new Date();
    
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const daysRemainingElement = document.getElementById('days-remaining');
    if (daysRemainingElement) {
        daysRemainingElement.textContent = diffDays > 0 ? diffDays : 0;
    }
}

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

// Export leads to PDF
function exportLeadsToPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Lista de Visitantes Interessados - Aniversário da Luna', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text('Data de exportação: ' + new Date().toLocaleDateString('pt-PT'), 14, 30);
    
    // Get leads data
    const leads = JSON.parse(localStorage.getItem('leadsList') || '[]');
    
    if (leads.length === 0) {
        doc.text('Nenhum visitante interessado registrado ainda.', 14, 40);
    } else {
        // Format data for autotable
        const tableData = leads.map(lead => [
            (lead.name || 'Anônimo'),
            (lead.email || 'Não disponível'),
            lead.status,
            new Date(lead.firstVisit).toLocaleDateString('pt-PT'),
            lead.converted ? 'Sim' : 'Não'
        ]);
        
        // Add table
        doc.autoTable({
            head: [['Nome', 'Email', 'Status', 'Data da Visita', 'Convertido']],
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
    doc.save('visitantes_interessados_luna.pdf');
}

// Initialize guest list management functionality
function initGuestListManagement() {
    const addGuestBtn = document.getElementById('add-guest-btn');
    const saveGuestBtn = document.getElementById('save-guest-btn');
    const cancelGuestBtn = document.getElementById('cancel-guest-btn');
    const addGuestForm = document.getElementById('add-guest-form');
    
    // Toggle add guest form
    addGuestBtn.addEventListener('click', function() {
        addGuestForm.classList.toggle('hidden');
        if (!addGuestForm.classList.contains('hidden')) {
            document.getElementById('guest-name').focus();
        }
    });
    
    // Hide form on cancel
    cancelGuestBtn.addEventListener('click', function() {
        addGuestForm.classList.add('hidden');
        document.getElementById('guest-name').value = '';
        document.getElementById('guest-phone').value = '';
        document.getElementById('add-guest-message').textContent = '';
        document.getElementById('add-guest-message').className = 'message';
    });
    
    // Save guest to invite list
    saveGuestBtn.addEventListener('click', function() {
        const name = document.getElementById('guest-name').value.trim();
        const phone = document.getElementById('guest-phone').value.trim();
        const messageEl = document.getElementById('add-guest-message');
        
        if (!name || !phone) {
            messageEl.textContent = 'Por favor, preencha todos os campos';
            messageEl.className = 'message error-message';
            return;
        }
        
        // Validate phone number (basic validation)
        if (!phone.match(/^\+?[0-9\s]{9,15}$/)) {
            messageEl.textContent = 'Número de telefone inválido. Use o formato +351 000000000';
            messageEl.className = 'message error-message';
            return;
        }
        
        // Save to localStorage
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        
        // Check if phone already exists
        if (invitesList.some(guest => guest.phone === phone)) {
            messageEl.textContent = 'Este número já está na lista de convidados';
            messageEl.className = 'message error-message';
            return;
        }
        
        invitesList.push({
            name: name,
            phone: phone,
            status: 'pending',
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('invitesList', JSON.stringify(invitesList));
        
        // Clear form
        document.getElementById('guest-name').value = '';
        document.getElementById('guest-phone').value = '';
        
        // Show success message
        messageEl.textContent = 'Convidado adicionado com sucesso!';
        messageEl.className = 'message success-message';
        
        // Reload guests list
        loadInvitesList();
        
        // Hide form after delay
        setTimeout(() => {
            addGuestForm.classList.add('hidden');
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 2000);
    });
}

// Load invites list
function loadInvitesList() {
    const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
    const tableBody = document.getElementById('invite-table-body');
    const table = document.getElementById('invite-table');
    const noInvitesMessage = document.querySelector('.no-invites-message');
    
    tableBody.innerHTML = '';
    
    if (invitesList.length === 0) {
        table.style.display = 'none';
        noInvitesMessage.style.display = 'block';
    } else {
        table.style.display = 'table';
        noInvitesMessage.style.display = 'none';
        
        invitesList.forEach((guest, index) => {
            const row = document.createElement('tr');
            
            // Name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = guest.name;
            
            // Phone cell
            const phoneCell = document.createElement('td');
            phoneCell.textContent = guest.phone;
            
            // Status cell
            const statusCell = document.createElement('td');
            const statusBadge = document.createElement('span');
            statusBadge.classList.add('status-badge');
            
            if (guest.status === 'sent') {
                statusBadge.classList.add('status-sent');
                statusBadge.textContent = 'Enviado';
            } else if (guest.status === 'error') {
                statusBadge.classList.add('status-error');
                statusBadge.textContent = 'Erro';
            } else {
                statusBadge.classList.add('status-pending');
                statusBadge.textContent = 'Pendente';
            }
            
            statusCell.appendChild(statusBadge);
            
            // Actions cell
            const actionsCell = document.createElement('td');
            
            // Send invite button
            const sendBtn = document.createElement('button');
            sendBtn.classList.add('invite-action-btn', 'send-invite-btn');
            sendBtn.textContent = 'Enviar Convite';
            sendBtn.addEventListener('click', function() {
                sendWhatsAppInvite(guest, index);
            });
            
            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('invite-action-btn', 'delete-invite-btn');
            deleteBtn.textContent = 'Remover';
            deleteBtn.style.marginLeft = '8px';
            deleteBtn.addEventListener('click', function() {
                deleteInvite(index);
            });
            
            actionsCell.appendChild(sendBtn);
            actionsCell.appendChild(deleteBtn);
            
            // Append all cells to row
            row.appendChild(nameCell);
            row.appendChild(phoneCell);
            row.appendChild(statusCell);
            row.appendChild(actionsCell);
            
            // Append row to table
            tableBody.appendChild(row);
        });
    }
}

// Initialize leads management
function initLeadsManagement() {
    // Event listeners for export and refresh
    document.getElementById('export-leads-pdf').addEventListener('click', exportLeadsToPdf);
    document.getElementById('refresh-leads').addEventListener('click', loadLeadsList);
    
    // Create lead details modal container
    if (!document.getElementById('lead-details-modal')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'lead-details-modal';
        modalContainer.className = 'lead-details-modal hidden';
        document.body.appendChild(modalContainer);
    }
}

// Load leads list
function loadLeadsList() {
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    const tableBody = document.getElementById('leads-table-body');
    const table = document.getElementById('leads-table');
    const noLeadsMessage = document.querySelector('.no-leads-message');
    
    // Update total leads counter
    document.getElementById('total-leads').textContent = leadsList.length;
    
    tableBody.innerHTML = '';
    
    if (leadsList.length === 0) {
        table.style.display = 'none';
        noLeadsMessage.style.display = 'block';
    } else {
        table.style.display = 'table';
        noLeadsMessage.style.display = 'none';
        
        leadsList.forEach((lead, index) => {
            const row = document.createElement('tr');
            
            // ID cell (truncated)
            const idCell = document.createElement('td');
            idCell.textContent = lead.id.substring(0, 10) + '...';
            
            // Visit date cell
            const dateCell = document.createElement('td');
            const date = new Date(lead.firstVisit);
            dateCell.textContent = date.toLocaleDateString('pt-PT') + ' ' + date.toLocaleTimeString('pt-PT', {hour: '2-digit', minute:'2-digit'});
            
            // Status cell
            const statusCell = document.createElement('td');
            const statusBadge = document.createElement('span');
            statusBadge.classList.add('status-badge');
            
            if (lead.status === 'confirmed') {
                statusBadge.classList.add('status-confirmed');
                statusBadge.textContent = 'Confirmado';
            } else if (lead.status === 'interested') {
                statusBadge.classList.add('status-interested');
                statusBadge.textContent = 'Interessado';
            } else {
                statusBadge.classList.add('status-pending');
                statusBadge.textContent = lead.status || 'Pendente';
            }
            
            statusCell.appendChild(statusBadge);
            
            // Name/Email cell
            const nameEmailCell = document.createElement('td');
            nameEmailCell.textContent = lead.name ? lead.name : 'Visitante anônimo';
            if (lead.email) {
                const emailSpan = document.createElement('span');
                emailSpan.textContent = ' (' + lead.email + ')';
                emailSpan.style.fontSize = '12px';
                emailSpan.style.color = '#666';
                nameEmailCell.appendChild(emailSpan);
            }
            
            // Actions cell
            const actionsCell = document.createElement('td');
            
            // View details button
            const viewBtn = document.createElement('button');
            viewBtn.classList.add('leads-action-btn', 'view-details-btn');
            viewBtn.textContent = 'Detalhes';
            viewBtn.addEventListener('click', function() {
                showLeadDetails(lead);
            });
            
            // Add as guest button (if not converted)
            if (!lead.converted) {
                const addGuestBtn = document.createElement('button');
                addGuestBtn.classList.add('leads-action-btn', 'add-guest-btn');
                addGuestBtn.textContent = 'Adicionar como Convidado';
                addGuestBtn.addEventListener('click', function() {
                    addLeadAsGuest(lead, index);
                });
                actionsCell.appendChild(addGuestBtn);
            }
            
            // Dismiss button
            const dismissBtn = document.createElement('button');
            dismissBtn.classList.add('leads-action-btn', 'dismiss-lead-btn');
            dismissBtn.textContent = 'Remover';
            dismissBtn.addEventListener('click', function() {
                removeLead(index);
            });
            
            actionsCell.appendChild(viewBtn);
            actionsCell.appendChild(dismissBtn);
            
            // Append all cells to row
            row.appendChild(idCell);
            row.appendChild(dateCell);
            row.appendChild(statusCell);
            row.appendChild(nameEmailCell);
            row.appendChild(actionsCell);
            
            // Append row to table
            tableBody.appendChild(row);
        });
    }
}

// Show lead details in a modal
function showLeadDetails(lead) {
    const modalContainer = document.getElementById('lead-details-modal');
    
    // Create modal content
    modalContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalhes do Visitante</h3>
                <button class="close-modal-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Informações Básicas</h3>
                    <div class="detail-group">
                        <h4>ID do Visitante</h4>
                        <p>${lead.id}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Nome</h4>
                        <p>${lead.name || 'Não disponível'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Email</h4>
                        <p>${lead.email || 'Não disponível'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Status</h4>
                        <p>${lead.status || 'Pendente'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Convertido</h4>
                        <p>${lead.converted ? 'Sim' : 'Não'}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Rastreamento de Atividade</h3>
                    <div class="detail-group">
                        <h4>Primeira Visita</h4>
                        <p>${new Date(lead.firstVisit).toLocaleString('pt-PT')}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Última Visita</h4>
                        <p>${new Date(lead.lastVisit).toLocaleString('pt-PT')}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Número de Visitas</h4>
                        <p>${lead.visitCount || 1}</p>
                    </div>
                    ${lead.converted ? 
                        `<div class="detail-group">
                            <h4>Data de Conversão</h4>
                            <p>${new Date(lead.conversionTime).toLocaleString('pt-PT')}</p>
                        </div>` : 
                        ''}
                </div>
                
                <div class="detail-section">
                    <h3>Informações Técnicas</h3>
                    <div class="detail-group">
                        <h4>Navegador/Dispositivo</h4>
                        <p>${lead.userAgent || 'Não disponível'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Idioma</h4>
                        <p>${lead.language || 'Não disponível'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Tamanho da Tela</h4>
                        <p>${lead.screenSize || 'Não disponível'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Referrer</h4>
                        <p>${lead.referrer || 'Acesso direto'}</p>
                    </div>
                    ${lead.latitude ? 
                        `<div class="detail-group">
                            <h4>Localização</h4>
                            <p>Lat: ${lead.latitude}, Long: ${lead.longitude}</p>
                        </div>` : 
                        ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="admin-btn secondary close-btn">Fechar</button>
            </div>
        </div>
    `;
    
    // Show modal
    modalContainer.classList.remove('hidden');
    
    // Add event listeners for close buttons
    const closeModalBtn = modalContainer.querySelector('.close-modal-btn');
    const closeBtn = modalContainer.querySelector('.close-btn');
    
    closeModalBtn.addEventListener('click', function() {
        modalContainer.classList.add('hidden');
    });
    
    closeBtn.addEventListener('click', function() {
        modalContainer.classList.add('hidden');
    });
    
    // Close on click outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            modalContainer.classList.add('hidden');
        }
    });
}

// Add lead as a guest
function addLeadAsGuest(lead, index) {
    if (confirm('Adicionar este visitante à lista de convidados?')) {
        // Generate a random phone if not available
        const phone = Math.floor(Math.random() * 1000000000).toString();
        
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        invitesList.push({
            name: lead.name || 'Visitante ' + lead.id.substring(8, 16),
            phone: '+351' + phone,
            status: 'pending',
            timestamp: new Date().toISOString(),
            fromLead: true,
            leadId: lead.id
        });
        
        localStorage.setItem('invitesList', JSON.stringify(invitesList));
        
        // Update lead as converted
        updateLeadStatus(index, 'added_to_invite');
        
        // Reload lists
        loadInvitesList();
        loadLeadsList();
    }
}

// Remove a lead
function removeLead(index) {
    if (confirm('Tem certeza que deseja remover este visitante da lista?')) {
        const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
        
        leadsList.splice(index, 1);
        localStorage.setItem('leadsList', JSON.stringify(leadsList));
        
        // Reload the list
        loadLeadsList();
    }
}

// Update lead status
function updateLeadStatus(index, status) {
    const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
    
    if (leadsList[index]) {
        leadsList[index].status = status;
        leadsList[index].lastUpdated = new Date().toISOString();
        
        localStorage.setItem('leadsList', JSON.stringify(leadsList));
    }
}

// Send WhatsApp invite
function sendWhatsAppInvite(guest, index) {
    // Get invitation message from settings
    let message = localStorage.getItem('invitationMessage') || 
        'Olá! Estás convidado para o aniversário da Luna! 🎂✨ Confirma a tua presença no link: ';
    
    // Add URL to message
    const url = window.location.origin + window.location.pathname.replace('/admin/dashboard.html', '/index.html');
    message += url;
    
    // Personalize message with name if available
    if (guest.name) {
        message = `Olá ${guest.name}! ${message}`;
    }
    
    // Format phone number (remove spaces, make sure it has the country code)
    let phone = guest.phone.replace(/\s+/g, '');
    if (!phone.startsWith('+')) {
        // If no country code, assume Portugal (+351)
        phone = '+351' + phone;
    }
    
    // Remove any + from the number for the WhatsApp link
    const cleanPhone = phone.replace('+', '');
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Update status to sent
    updateInviteStatus(index, 'sent');
}

// Update invite status
function updateInviteStatus(index, status) {
    const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
    
    if (invitesList[index]) {
        invitesList[index].status = status;
        invitesList[index].lastUpdated = new Date().toISOString();
        
        localStorage.setItem('invitesList', JSON.stringify(invitesList));
        
        // Reload the list to show updated status
        loadInvitesList();
    }
}

// Delete invite
function deleteInvite(index) {
    if (confirm('Tem certeza que deseja remover este convidado da lista?')) {
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        
        invitesList.splice(index, 1);
        localStorage.setItem('invitesList', JSON.stringify(invitesList));
        
        // Reload the list
        loadInvitesList();
    }
}

// Check if a new confirmation came from the invite list
function checkForInviteConfirmation(email, name) {
    const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
    
    // If there's no match, return
    if (!invitesList.some(guest => 
        guest.name.toLowerCase() === name.toLowerCase() || 
        guest.phone.includes(email.replace(/[^0-9]/g, '')))) {
        return;
    }
    
    // Send notification that someone from the invite list confirmed
    const notificationEmail = localStorage.getItem('notificationEmail') || 'lunamouraaguiar22@gmail.com';
    
    console.log(`Notificação para ${notificationEmail}: Um convidado da sua lista de convites confirmou presença: ${name}`);
    
    // In a real app, this would send an email
} 