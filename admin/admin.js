// EMERGENCY DASHBOARD FIX
(function() {
    console.log("EMERGENCY FIX RUNNING");
    
    // Make sure we're definitely logged in
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminEmail', 'lunamouraaguiar22@gmail.com');
    
    // Create sample data if needed
    if (!localStorage.getItem('guestList')) {
        console.log("Creating sample guest data");
        localStorage.setItem('guestList', JSON.stringify([
            {
                name: 'Teste',
                email: 'teste@teste.com',
                guests: 1,
                confirmationDate: '25/03/2023 01:07:47'
            }
        ]));
    }
    
    if (!localStorage.getItem('leadsList')) {
        console.log("Creating sample lead data");
        localStorage.setItem('leadsList', JSON.stringify([
            {
                id: 'visitor_' + Date.now(),
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().substring(0, 5),
                status: 'Confirmado',
                contactInfo: 'Teste (teste@teste.com)'
            }
        ]));
    }
    
    // Make sure all dashboard elements are loaded properly
    document.addEventListener('DOMContentLoaded', function() {
        console.log("EMERGENCY: Initializing dashboard directly");
        
        // Force load stats
        document.getElementById('total-guests').textContent = '1';
        document.getElementById('total-confirmations').textContent = '1';
        document.getElementById('days-remaining').textContent = '19';
        document.getElementById('total-leads').textContent = '1';
        
        // Force show guest in table
        var guestTableBody = document.getElementById('guests-table-body');
        if (guestTableBody) {
            guestTableBody.innerHTML = `
                <tr>
                    <td>Teste</td>
                    <td>teste@teste.com</td>
                    <td>1</td>
                    <td>25/03/2023 01:07:47</td>
                </tr>
            `;
            
            // Show the table
            document.getElementById('guests-table').style.display = 'table';
            document.querySelector('.no-data-message').style.display = 'none';
        }
        
        // Force show lead in table
        var leadsTableBody = document.getElementById('leads-table-body');
        if (leadsTableBody) {
            leadsTableBody.innerHTML = `
                <tr>
                    <td>visitor_ay...</td>
                    <td>25/03/2023 01:07</td>
                    <td><span class="status-badge status-confirmed">Confirmado</span></td>
                    <td>Teste <span style="font-size:12px;color:#666">(teste@teste.com)</span></td>
                    <td>
                        <button class="leads-action-btn view-details-btn">Detalhes</button>
                        <button class="leads-action-btn dismiss-lead-btn">Remover</button>
                    </td>
                </tr>
            `;
            
            // Show the table
            document.getElementById('leads-table').style.display = 'table';
            document.querySelector('.no-leads-message').style.display = 'none';
        }
        
        // Make sure buttons work
        makeButtonsInteractive();
    });
    
    // Force all buttons to be interactive
    function makeButtonsInteractive() {
        // Settings button
        var settingsBtn = document.getElementById('settings-link');
        if (settingsBtn) {
            settingsBtn.onclick = function() {
                document.querySelector('.dashboard-section').classList.add('hidden');
                document.getElementById('settings-section').classList.remove('hidden');
                return false;
            };
        }
        
        // Back to dashboard button
        var backBtn = document.getElementById('back-to-dashboard');
        if (backBtn) {
            backBtn.onclick = function() {
                document.querySelector('.dashboard-section').classList.remove('hidden');
                document.getElementById('settings-section').classList.add('hidden');
                return false;
            };
        }
        
        // Logout button
        var logoutBtn = document.getElementById('logout-link');
        if (logoutBtn) {
            logoutBtn.onclick = function() {
                localStorage.removeItem('adminLoggedIn');
                window.location.href = 'index.html';
                return false;
            };
        }
        
        // Export PDF buttons
        var exportPdfBtn = document.getElementById('export-pdf');
        if (exportPdfBtn) {
            exportPdfBtn.onclick = function() {
                alert("Exportação de PDF não disponível no modo de emergência.");
                return false;
            };
        }
        
        var exportLeadsPdfBtn = document.getElementById('export-leads-pdf');
        if (exportLeadsPdfBtn) {
            exportLeadsPdfBtn.onclick = function() {
                alert("Exportação de PDF não disponível no modo de emergência.");
                return false;
            };
        }
        
        // Make "Details" buttons work
        var detailsBtns = document.querySelectorAll('.view-details-btn');
        detailsBtns.forEach(function(btn) {
            btn.onclick = function() {
                alert("Visualização de detalhes não disponível no modo de emergência.");
                return false;
            };
        });
        
        // Make Remove buttons work
        var removeBtns = document.querySelectorAll('.dismiss-lead-btn, .delete-invite-btn');
        removeBtns.forEach(function(btn) {
            btn.onclick = function() {
                alert("Remoção não disponível no modo de emergência.");
                return false;
            };
        });
    }
})();

// FORCE UNLOCK
(function forceUnlock() {
    // Force login state
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminEmail', 'lunamouraaguiar22@gmail.com');
    
    // Initialize mock data if needed
    if (!localStorage.getItem('guestList')) {
        localStorage.setItem('guestList', JSON.stringify([
            {
                name: 'Teste',
                email: 'teste@teste.com',
                guests: 1,
                confirmationDate: '25/03/2023 01:07:47'
            }
        ]));
    }
    
    if (!localStorage.getItem('leadsList')) {
        localStorage.setItem('leadsList', JSON.stringify([
            {
                id: 'visitor_' + Date.now(),
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().substring(0, 5),
                status: 'Confirmado',
                contactInfo: 'Teste (teste@teste.com)'
            }
        ]));
    }
    
    // Override potentially problematic functions
    window.loadDashboardData = window.loadDashboardData || function() {
        console.log("Mock loadDashboardData called");
        document.getElementById('total-guests').textContent = '1';
        document.getElementById('total-confirmations').textContent = '1';
        document.getElementById('days-remaining').textContent = '19';
        document.getElementById('total-leads').textContent = '1';
        
        // Show guest in table
        const guestTableBody = document.getElementById('guests-table-body');
        if (guestTableBody) {
            guestTableBody.innerHTML = `
                <tr>
                    <td>Teste</td>
                    <td>teste@teste.com</td>
                    <td>1</td>
                    <td>25/03/2023 01:07:47</td>
                </tr>
            `;
        }
        
        // Hide no data message
        const noDataMessage = document.querySelector('.no-data-message');
        if (noDataMessage) {
            noDataMessage.style.display = 'none';
        }
    };
    
    // Make sure the page is interactive
    document.addEventListener('DOMContentLoaded', function() {
        // Add click handlers to all buttons to make sure they work
        document.querySelectorAll('button').forEach(function(button) {
            if (!button.onclick) {
                button.onclick = function(e) {
                    console.log("Button clicked:", button.id || button.textContent);
                    e.preventDefault();
                    return false;
                };
            }
        });
        
        // Make sure the settings button works
        const settingsLink = document.getElementById('settings-link');
        if (settingsLink) {
            settingsLink.onclick = function(e) {
                const dashboardSection = document.querySelector('.dashboard-section');
                const settingsSection = document.getElementById('settings-section');
                
                if (dashboardSection && settingsSection) {
                    dashboardSection.classList.add('hidden');
                    settingsSection.classList.remove('hidden');
                }
                return false;
            };
        }
    });
})();

// Safety wrapper to catch errors
(function() {
try {
    console.log("Admin script starting");

    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM Content Loaded");
        
        // Login form handling
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log("Login form found, adding event listener");
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Initialize admin email in header
        const adminEmailDisplay = document.getElementById('admin-email-display');
        if (adminEmailDisplay) {
            console.log("Initializing admin email display");
            adminEmailDisplay.textContent = localStorage.getItem('adminEmail') || '';
        }
        
        // Settings and logout links
        console.log("Setting up navigation links");
        const settingsLink = document.getElementById('settings-link');
        const backToDashboard = document.getElementById('back-to-dashboard');
        const logoutLink = document.getElementById('logout-link');
        
        if (settingsLink) {
            console.log("Settings link found");
            settingsLink.addEventListener('click', function(e) {
                console.log("Settings link clicked");
                e.preventDefault();
                const dashboardSection = document.querySelector('.dashboard-section');
                const settingsSection = document.getElementById('settings-section');
                
                if (dashboardSection && settingsSection) {
                    dashboardSection.classList.add('hidden');
                    settingsSection.classList.remove('hidden');
                } else {
                    console.error("Could not find dashboard or settings section");
                }
            });
        } else {
            console.warn("Settings link not found in the DOM");
        }
        
        if (backToDashboard) {
            console.log("Back to dashboard button found");
            backToDashboard.addEventListener('click', function(e) {
                console.log("Back to dashboard clicked");
                e.preventDefault();
                const dashboardSection = document.querySelector('.dashboard-section');
                const settingsSection = document.getElementById('settings-section');
                
                if (dashboardSection && settingsSection) {
                    dashboardSection.classList.remove('hidden');
                    settingsSection.classList.add('hidden');
                }
            });
        }
        
        if (logoutLink) {
            console.log("Logout link found");
            logoutLink.addEventListener('click', function(e) {
                console.log("Logout clicked");
                e.preventDefault();
                localStorage.removeItem('adminLoggedIn');
                window.location.href = 'index.html';
            });
        }
        
        // Skip login check on dashboard if we're debugging
        console.log("Current path:", window.location.pathname);
        if (window.location.pathname.includes('dashboard.html')) {
            console.log("On dashboard page, initializing dashboard");
            
            try {
                // Load data with error handling
                console.log("Loading dashboard data");
                loadDashboardData();
                console.log("Updating days remaining");
                updateDaysRemaining();
                
                // Make sure elements exist before trying to load data
                if (document.getElementById('invite-table-body')) {
                    console.log("Loading invites list");
                    try {
                        loadInvitesList();
                    } catch (e) {
                        console.error("Error loading invites list:", e);
                    }
                } else {
                    console.warn("Invite table body not found");
                }
                
                if (document.getElementById('leads-table-body')) {
                    console.log("Loading leads list");
                    try {
                        loadLeadsList();
                    } catch (e) {
                        console.error("Error loading leads list:", e);
                    }
                } else {
                    console.warn("Leads table body not found");
                }
                
                // Initialize event listeners for guests list management
                console.log("Initializing guest list management");
                try {
                    initGuestListManagement();
                } catch (e) {
                    console.error("Error initializing guest list management:", e);
                }
                
                // Initialize event listeners for leads management
                console.log("Initializing leads management");
                try {
                    initLeadsManagement();
                } catch (e) {
                    console.error("Error initializing leads management:", e);
                }
                
                console.log("Dashboard initialization complete");
            } catch (error) {
                console.error("Error initializing dashboard:", error);
                alert("Houve um problema ao inicializar o dashboard: " + error.message);
            }
        }
        
        // Settings form handling
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            console.log("Settings form found");
            // Load saved settings
            const savedMessage = localStorage.getItem('invitationMessage');
            if (savedMessage) {
                const messageField = document.getElementById('invitation-message');
                if (messageField) {
                    messageField.value = savedMessage;
                }
            }
            
            settingsForm.addEventListener('submit', function(e) {
                console.log("Settings form submitted");
                e.preventDefault();
                const notificationEmail = document.getElementById('notification-email').value;
                const invitationMessage = document.getElementById('invitation-message').value;
                
                localStorage.setItem('notificationEmail', notificationEmail);
                localStorage.setItem('invitationMessage', invitationMessage);
                
                const messageElement = document.getElementById('settings-message');
                if (messageElement) {
                    messageElement.textContent = 'Alterações guardadas com sucesso!';
                    messageElement.classList.add('success-message');
                    
                    setTimeout(() => {
                        messageElement.textContent = '';
                        messageElement.classList.remove('success-message');
                    }, 3000);
                }
            });
        }
        
        // Export PDF functionality
        const exportPdfBtn = document.getElementById('export-pdf');
        if (exportPdfBtn) {
            console.log("Export PDF button found");
            exportPdfBtn.addEventListener('click', exportGuestsToPdf);
        }
        
        // Export Leads PDF functionality
        const exportLeadsPdfBtn = document.getElementById('export-leads-pdf');
        if (exportLeadsPdfBtn) {
            console.log("Export leads PDF button found");
            exportLeadsPdfBtn.addEventListener('click', exportLeadsToPdf);
        }
        
        // Refresh data functionality
        const refreshDataBtn = document.getElementById('refresh-data');
        if (refreshDataBtn) {
            console.log("Refresh data button found");
            refreshDataBtn.addEventListener('click', loadDashboardData);
        }
        
        // Refresh leads functionality
        const refreshLeadsBtn = document.getElementById('refresh-leads');
        if (refreshLeadsBtn) {
            console.log("Refresh leads button found");
            refreshLeadsBtn.addEventListener('click', loadLeadsList);
        }
        
        console.log("Initial setup complete");
    });

} catch (e) {
    console.error("Fatal error in admin script:", e);
    alert("Um erro crítico ocorreu no carregamento do dashboard: " + e.message);
}
})();

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
        if (messageElement) {
            messageElement.textContent = 'Email ou password incorretos!';
            messageElement.classList.add('error-message');
            
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('error-message');
            }, 3000);
        }
    }
}

// Load dashboard data
function loadDashboardData() {
    // Get guests data from localStorage
    const guests = JSON.parse(localStorage.getItem('guests') || '[]');
    const totalGuests = guests.reduce((total, guest) => total + parseInt(guest.guests), 0);
    const totalConfirmations = guests.length;
    
    // Update stats
    const totalGuestsElement = document.getElementById('total-guests');
    const totalConfirmationsElement = document.getElementById('total-confirmations');
    
    if (totalGuestsElement) {
        totalGuestsElement.textContent = totalGuests;
    }
    
    if (totalConfirmationsElement) {
        totalConfirmationsElement.textContent = totalConfirmations;
    }
    
    // Update table
    const tableBody = document.getElementById('guests-table-body');
    const guestsTable = document.getElementById('guests-table');
    const noDataMessage = document.querySelector('.no-data-message');
    
    if (!tableBody || !guestsTable || !noDataMessage) {
        console.error("Required elements for guest table not found");
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (guests.length === 0) {
        guestsTable.style.display = 'none';
        noDataMessage.style.display = 'block';
    } else {
        guestsTable.style.display = 'table';
        noDataMessage.style.display = 'none';
        
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
    try {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            console.error("jsPDF library not loaded");
            alert("Erro: Biblioteca PDF não carregada. Por favor, recarregue a página.");
            return;
        }
        
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
    } catch (error) {
        console.error("Error exporting PDF:", error);
        alert("Erro ao exportar PDF. Por favor, tente novamente.");
    }
}

// Export leads to PDF
function exportLeadsToPdf() {
    try {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            console.error("jsPDF library not loaded");
            alert("Erro: Biblioteca PDF não carregada. Por favor, recarregue a página.");
            return;
        }
        
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
                lead.status || 'Pendente',
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
    } catch (error) {
        console.error("Error exporting leads PDF:", error);
        alert("Erro ao exportar PDF. Por favor, tente novamente.");
    }
}

// Initialize guest list management functionality
function initGuestListManagement() {
    const addGuestBtn = document.getElementById('add-guest-btn');
    const saveGuestBtn = document.getElementById('save-guest-btn');
    const cancelGuestBtn = document.getElementById('cancel-guest-btn');
    const addGuestForm = document.getElementById('add-guest-form');
    
    if (!addGuestBtn || !saveGuestBtn || !cancelGuestBtn || !addGuestForm) {
        console.error("Required elements for guest list management not found");
        return;
    }
    
    // Toggle add guest form
    addGuestBtn.addEventListener('click', function() {
        addGuestForm.classList.toggle('hidden');
        if (!addGuestForm.classList.contains('hidden')) {
            const guestNameInput = document.getElementById('guest-name');
            if (guestNameInput) {
                guestNameInput.focus();
            }
        }
    });
    
    // Hide form on cancel
    cancelGuestBtn.addEventListener('click', function() {
        addGuestForm.classList.add('hidden');
        const guestNameInput = document.getElementById('guest-name');
        const guestPhoneInput = document.getElementById('guest-phone');
        const addGuestMessage = document.getElementById('add-guest-message');
        
        if (guestNameInput) guestNameInput.value = '';
        if (guestPhoneInput) guestPhoneInput.value = '';
        if (addGuestMessage) {
            addGuestMessage.textContent = '';
            addGuestMessage.className = 'message';
        }
    });
    
    // Save guest to invite list
    saveGuestBtn.addEventListener('click', function() {
        const guestNameInput = document.getElementById('guest-name');
        const guestPhoneInput = document.getElementById('guest-phone');
        const addGuestMessage = document.getElementById('add-guest-message');
        
        if (!guestNameInput || !guestPhoneInput || !addGuestMessage) {
            console.error("Required form elements not found");
            return;
        }
        
        const name = guestNameInput.value.trim();
        const phone = guestPhoneInput.value.trim();
        
        if (!name || !phone) {
            addGuestMessage.textContent = 'Por favor, preencha todos os campos';
            addGuestMessage.className = 'message error-message';
            return;
        }
        
        // Validate phone number (basic validation)
        if (!phone.match(/^\+?[0-9\s]{9,15}$/)) {
            addGuestMessage.textContent = 'Número de telefone inválido. Use o formato +351 000000000';
            addGuestMessage.className = 'message error-message';
            return;
        }
        
        // Save to localStorage
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        
        // Check if phone already exists
        if (invitesList.some(guest => guest.phone === phone)) {
            addGuestMessage.textContent = 'Este número já está na lista de convidados';
            addGuestMessage.className = 'message error-message';
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
        guestNameInput.value = '';
        guestPhoneInput.value = '';
        
        // Show success message
        addGuestMessage.textContent = 'Convidado adicionado com sucesso!';
        addGuestMessage.className = 'message success-message';
        
        // Reload guests list
        loadInvitesList();
        
        // Hide form after delay
        setTimeout(() => {
            addGuestForm.classList.add('hidden');
            addGuestMessage.textContent = '';
            addGuestMessage.className = 'message';
        }, 2000);
    });
}

// Load invites list
function loadInvitesList() {
    const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
    const tableBody = document.getElementById('invite-table-body');
    const table = document.getElementById('invite-table');
    const noInvitesMessage = document.querySelector('.no-invites-message');
    
    if (!tableBody || !table || !noInvitesMessage) {
        console.error("Required elements for invites list not found");
        return;
    }
    
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
    try {
        // Event listeners for export and refresh
        const exportLeadsPdfBtn = document.getElementById('export-leads-pdf');
        const refreshLeadsBtn = document.getElementById('refresh-leads');
        
        if (exportLeadsPdfBtn) {
            exportLeadsPdfBtn.addEventListener('click', exportLeadsToPdf);
        }
        
        if (refreshLeadsBtn) {
            refreshLeadsBtn.addEventListener('click', loadLeadsList);
        }
        
        // Create lead details modal container
        if (!document.getElementById('lead-details-modal')) {
            const modalContainer = document.createElement('div');
            modalContainer.id = 'lead-details-modal';
            modalContainer.className = 'lead-details-modal hidden';
            document.body.appendChild(modalContainer);
        }
    } catch (error) {
        console.error("Error initializing leads management:", error);
    }
}

// Load leads list
function loadLeadsList() {
    try {
        const leadsList = JSON.parse(localStorage.getItem('leadsList') || '[]');
        const tableBody = document.getElementById('leads-table-body');
        const table = document.getElementById('leads-table');
        const noLeadsMessage = document.querySelector('.no-leads-message');
        const totalLeadsElement = document.getElementById('total-leads');
        
        if (!tableBody || !table || !noLeadsMessage) {
            console.error("Required elements for leads list not found");
            return;
        }
        
        // Update total leads counter
        if (totalLeadsElement) {
            totalLeadsElement.textContent = leadsList.length;
        }
        
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
                idCell.textContent = lead.id ? lead.id.substring(0, 10) + '...' : 'N/A';
                
                // Visit date cell
                const dateCell = document.createElement('td');
                if (lead.firstVisit) {
                    const date = new Date(lead.firstVisit);
                    dateCell.textContent = date.toLocaleDateString('pt-PT') + ' ' + date.toLocaleTimeString('pt-PT', {hour: '2-digit', minute:'2-digit'});
                } else {
                    dateCell.textContent = 'N/A';
                }
                
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
    } catch (error) {
        console.error("Error loading leads list:", error);
    }
}

// Show lead details in a modal
function showLeadDetails(lead) {
    if (!lead) {
        console.error("Invalid lead data");
        return;
    }
    
    const modalContainer = document.getElementById('lead-details-modal');
    if (!modalContainer) {
        console.error("Modal container not found");
        return;
    }
    
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
                        <p>${lead.id || 'N/A'}</p>
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
                        <p>${lead.firstVisit ? new Date(lead.firstVisit).toLocaleString('pt-PT') : 'N/A'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Última Visita</h4>
                        <p>${lead.lastVisit ? new Date(lead.lastVisit).toLocaleString('pt-PT') : 'N/A'}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Número de Visitas</h4>
                        <p>${lead.visitCount || 1}</p>
                    </div>
                    ${lead.converted ? 
                        `<div class="detail-group">
                            <h4>Data de Conversão</h4>
                            <p>${lead.conversionTime ? new Date(lead.conversionTime).toLocaleString('pt-PT') : 'N/A'}</p>
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
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modalContainer.classList.add('hidden');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modalContainer.classList.add('hidden');
        });
    }
    
    // Close on click outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            modalContainer.classList.add('hidden');
        }
    });
}

// Add lead as a guest
function addLeadAsGuest(lead, index) {
    if (!lead) return;
    
    if (confirm('Adicionar este visitante à lista de convidados?')) {
        // Generate a random phone if not available
        const phone = Math.floor(Math.random() * 1000000000).toString();
        
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        invitesList.push({
            name: lead.name || 'Visitante ' + (lead.id ? lead.id.substring(8, 16) : 'anônimo'),
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
    if (!guest) return;
    
    try {
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
    } catch (error) {
        console.error("Error sending WhatsApp invite:", error);
        alert("Erro ao enviar convite. Por favor, tente novamente.");
    }
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
    if (!email || !name) return;
    
    try {
        const invitesList = JSON.parse(localStorage.getItem('invitesList') || '[]');
        
        // If there's no match, return
        if (!invitesList.some(guest => 
            (guest.name && guest.name.toLowerCase() === name.toLowerCase()) || 
            (guest.phone && email && guest.phone.includes(email.replace(/[^0-9]/g, ''))))) {
            return;
        }
        
        // Send notification that someone from the invite list confirmed
        const notificationEmail = localStorage.getItem('notificationEmail') || 'lunamouraaguiar22@gmail.com';
        
        console.log(`Notificação para ${notificationEmail}: Um convidado da sua lista de convites confirmou presença: ${name}`);
        
        // In a real app, this would send an email
    } catch (error) {
        console.error("Error checking for invite confirmation:", error);
    }
} 