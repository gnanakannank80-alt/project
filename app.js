const defaultStudentsCse2 = [
    { id: "731724104001", name: "ABBU G YUVARAJ" },
    { id: "731724104002", name: "ABINAYA S" },
    { id: "731724104003", name: "ABINAYA V" },
    { id: "731724104004", name: "ARAVINDHAN K" },
    { id: "731724104005", name: "ARCHANA J" },
    { id: "731724104006", name: "AYESHA REENA S" },
    { id: "731724104007", name: "BHARANI P" },
    { id: "731724104009", name: "DEEPA K" },
    { id: "731724104010", name: "DEEPIKA K" },
    { id: "731724104011", name: "DEVADHARSHINI B" },
    { id: "731724104012", name: "ELAMATHI V R" },
    { id: "731724104013", name: "GAYATHRI K" },
    { id: "731724104014", name: "GNANAKANNAN K" },
    { id: "731724104015", name: "GOKUL PRASAD K" },
    { id: "731724104016", name: "GUNARANJANI A" },
    { id: "731724104017", name: "GUNASREE S" },
    { id: "731724104018", name: "INDHUMATHI K" },
    { id: "731724104019", name: "JAYAKUMAR J" },
    { id: "731724104020", name: "KAVINPRIYAN M" },
    { id: "731724104021", name: "KAVITHA P" },
    { id: "731724104022", name: "KAVYA K" },
    { id: "731724104023", name: "KRISHNASAMY K" },
    { id: "731724104024", name: "MAHALAKSHMI K" },
    { id: "731724104025", name: "MALAR VIZHI N" },
    { id: "731724104026", name: "MUTHULA E" },
    { id: "731724104027", name: "MONIKA S" },
    { id: "731724104028", name: "MYTHILI M" },
    { id: "731724104029", name: "NANDHINI R" },
    { id: "731724104030", name: "PAVITHRA B" },
    { id: "731724104031", name: "PONRAJ P" },
    { id: "731724104032", name: "POOJASHREE P" },
    { id: "731724104033", name: "PRAKASH V" },
    { id: "731724104034", name: "PRIYADHARSHINI C" },
    { id: "731724104035", name: "SABANA S" },
    { id: "731724104036", name: "SABARISH P" },
    { id: "731724104037", name: "SABARISHANKAR K" },
    { id: "731724104038", name: "SADHISH P" },
    { id: "731724104039", name: "SATHISH M" },
    { id: "731724104040", name: "SAUBAL B" },
    { id: "731724104042", name: "SHARMILA A" },
    { id: "731724104043", name: "SHOBANA B S" },
    { id: "731724104044", name: "SRIJA V" },
    { id: "731724104045", name: "SUTHESH M" },
    { id: "731724104046", name: "THAVAGAR T" },
    { id: "731724104047", name: "THENNARASU G" },
    { id: "731724104048", name: "VAASHINI S" },
    { id: "731724104049", name: "VIDHYA V" },
    { id: "731724104050", name: "VIMAL S" },
    { id: "731724104051", name: "YAZHINI" },
    { id: "731724104052", name: "YOGESHWARI G" },
    { id: "731724104053", name: "YUKESH M" }
];

document.addEventListener('DOMContentLoaded', () => {
    // State
    let students = [];
    let currentCourse = '';
    let currentUser = JSON.parse(localStorage.getItem('mpnmj_user')) || null;
    let isDarkMode = localStorage.getItem('mpnmj_theme') === 'dark';

    // Elements
    const splashScreen = document.getElementById('splash-screen');
    const loginPage = document.getElementById('login-page');
    const appContainer = document.getElementById('app-container');
    const themeSwitch = document.getElementById('theme-switch');

    // Initialize App
    initApp();

    function initApp() {
        // Theme
        applyTheme(isDarkMode);
        if (themeSwitch) themeSwitch.checked = isDarkMode;

        // Splash screen simulation
        setTimeout(() => {
            splashScreen.classList.remove('active-view');
            if (currentUser && currentUser.email && currentUser.mobile) {
                appContainer.classList.add('active-view');
                fillSettings();
                loadHome();
            } else {
                loginPage.classList.add('active-view');
            }
        }, 2500);

        setupEventListeners();
    }

    function setupEventListeners() {
        // Theme Toggle
        themeSwitch.addEventListener('change', (e) => {
            isDarkMode = e.target.checked;
            applyTheme(isDarkMode);
            localStorage.setItem('mpnmj_theme', isDarkMode ? 'dark' : 'light');
        });

        // Login Submit
        document.getElementById('sign-in-btn').addEventListener('click', handleLogin);

        // Bottom Nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget.getAttribute('data-target');
                navigateTo(target);
                
                // Update active state in nav
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Home Course selection
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                currentCourse = card.getAttribute('data-course');
                loadStudentList();
            });
        });

        // Back button on student list
        document.getElementById('list-back-btn').addEventListener('click', loadHome);

        // Student Search
        document.getElementById('student-search').addEventListener('input', (e) => {
            renderStudentTable(e.target.value);
        });

        // Add Student
        document.getElementById('add-student-btn').addEventListener('click', () => {
            openStudentModal();
        });

        // Submit Attendance
        document.getElementById('submit-attendance-btn').addEventListener('click', submitAttendance);

        // Save Profile
        document.getElementById('save-profile-btn').addEventListener('click', saveProfile);
        
        // Logout
        document.getElementById('logout-btn').addEventListener('click', logout);

        // Modals
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            document.getElementById('student-modal').classList.remove('show');
        });
        document.getElementById('close-delete-btn').addEventListener('click', () => {
            document.getElementById('delete-modal').classList.remove('show');
        });
        document.getElementById('save-student-btn').addEventListener('click', saveStudent);
        document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);

        // Send Report
        document.getElementById('send-report-btn').addEventListener('click', sendReport);
    }

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.replace('light-mode', 'dark-mode');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
        }
    }

    function handleLogin() {
        const email = document.getElementById('login-email').value;
        const mobile = document.getElementById('login-mobile').value;
        const password = document.getElementById('login-password').value;

        if (!email || !mobile || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== '235689') {
            alert('Invalid Password');
            return;
        }

        currentUser = { email, mobile, name: '', dept: '', year: '' };
        localStorage.setItem('mpnmj_user', JSON.stringify(currentUser));
        
        loginPage.classList.remove('active-view');
        appContainer.classList.add('active-view');
        fillSettings();
        loadHome();
    }

    function navigateTo(sectionId) {
        document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
        document.getElementById(sectionId).classList.add('active-section');

        if (sectionId === 'report-page') {
            updateReportPage();
        }
    }

    function loadHome() {
        navigateTo('home-page');
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-target') === 'home-page');
        });
    }

    function loadStudentList() {
        const titleMap = {
            'cse-2': 'MPNMJ Student List (CSE 2nd Year)',
            'cse-3': 'MPNMJ Student List (CSE 3rd Year)'
        };
        document.getElementById('list-title').innerText = titleMap[currentCourse] || 'Student List';
        
        // Load from local storage or defaults
        const stored = localStorage.getItem(`mpnmj_students_${currentCourse}`);
        if (stored) {
            students = JSON.parse(stored);
        } else {
            if (currentCourse === 'cse-2') {
                // Initialize defaults with Present status
                students = defaultStudentsCse2.map(s => ({...s, dept: 'CSE', year: '2nd Year', status: 'Present'}));
            } else {
                students = [];
            }
            saveStudents();
        }

        document.getElementById('student-search').value = '';
        renderStudentTable();
        
        // Custom nav logic for hiding bottom nav when in list view or keeping it (prompt says all pages, so keep it)
        // But here we just navigate the section.
        document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
        document.getElementById('student-list-page').classList.add('active-section');
    }

    function saveStudents() {
        if(currentCourse) {
            localStorage.setItem(`mpnmj_students_${currentCourse}`, JSON.stringify(students));
            updateStats();
        }
    }

    function renderStudentTable(filter = '') {
        const tbody = document.getElementById('student-table-body');
        tbody.innerHTML = '';
        
        const filtered = students.filter(s => 
            s.name.toLowerCase().includes(filter.toLowerCase()) || 
            s.id.toLowerCase().includes(filter.toLowerCase())
        );

        if(filtered.length === 0){
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No students found</td></tr>`;
        }

        filtered.forEach((st, idx) => {
            // we find original index
            const origIndex = students.findIndex(x => x.id === st.id);
            const tr = document.createElement('tr');
            
            const isPresent = st.status !== 'Absent';
            
            tr.innerHTML = `
                <td>${st.id}</td>
                <td>${st.name}</td>
                <td>
                    <div class="attendance-toggle" onclick="toggleAttendance(${origIndex})">
                        <span class="status-pill ${isPresent ? 'status-present' : 'status-absent'}">
                            ${isPresent ? '✅ Present' : '❌ Absent'}
                        </span>
                    </div>
                </td>
                <td>
                    <div class="action-btns">
                        <i class="fa-solid fa-pen action-icon edit" onclick="openStudentModal(${origIndex})"></i>
                        <i class="fa-solid fa-trash action-icon delete" onclick="openDeleteModal('${st.id}')"></i>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        updateStats();
    }

    window.toggleAttendance = function(index) {
        if (students[index]) {
            students[index].status = students[index].status === 'Absent' ? 'Present' : 'Absent';
            saveStudents();
            renderStudentTable(document.getElementById('student-search').value);
        }
    }

    function updateStats() {
        document.getElementById('total-students').innerText = students.length;
        const present = students.filter(s => s.status !== 'Absent').length;
        document.getElementById('present-students').innerText = present;
        document.getElementById('absent-students').innerText = students.length - present;
    }

    function submitAttendance() {
        // Updates report page automatically as we navigate
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-target') === 'report-page');
        });
        navigateTo('report-page');
    }

    function updateReportPage() {
        const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        document.getElementById('report-date').innerText = today;

        document.getElementById('report-from-email').value = currentUser?.email || '';

        const absentees = students.filter(s => s.status === 'Absent');
        const listEl = document.getElementById('absent-list');
        const msgEl = document.getElementById('no-absentees-msg');
        
        listEl.innerHTML = '';
        if (absentees.length > 0) {
            msgEl.classList.add('hidden');
            absentees.forEach((st, i) => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="name">${i+1}. ${st.name}</span><span class="reg">${st.id}</span>`;
                listEl.appendChild(li);
            });
        } else {
            msgEl.classList.remove('hidden');
        }
    }

    function sendReport() {
        const toEmail = document.getElementById('report-to-email').value || '';
        const absentees = students.filter(s => s.status === 'Absent');
        
        const subject = encodeURIComponent("Today's Attendance Report - MPNMJEC");
        
        let bodyText = "Today's Absent Students List:\n\n";
        if(absentees.length === 0){
            bodyText += "All students are present today.";
        } else {
            absentees.forEach((s, i) => {
                bodyText += `${i+1}. ${s.name} - ${s.id}\n`;
            });
        }
        
        bodyText += "\n\nRegards,\nMPNMJEC Faculty";
        const bodyContent = encodeURIComponent(bodyText);

        const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${bodyContent}`;
        window.location.href = mailtoLink;
    }

    // Modal logic
    window.openStudentModal = function(index = -1) {
        document.getElementById('student-modal-title').innerText = index >= 0 ? 'Edit Student' : 'Add Student';
        if (index >= 0) {
            const st = students[index];
            document.getElementById('student-index').value = index;
            document.getElementById('student-id-input').value = st.id;
            document.getElementById('student-name-input').value = st.name;
            document.getElementById('student-dept-input').value = st.dept || 'CSE';
            document.getElementById('student-year-input').value = st.year || '2nd Year';
        } else {
            document.getElementById('student-index').value = '-1';
            document.getElementById('student-id-input').value = '';
            document.getElementById('student-name-input').value = '';
        }
        document.getElementById('student-modal').classList.add('show');
    }

    function saveStudent() {
        const index = parseInt(document.getElementById('student-index').value);
        const id = document.getElementById('student-id-input').value.trim();
        const name = document.getElementById('student-name-input').value.trim();
        const dept = document.getElementById('student-dept-input').value.trim();
        const year = document.getElementById('student-year-input').value.trim();

        if(!id || !name) {
            alert('ID and Name are required!');
            return;
        }

        if (index >= 0) {
            students[index] = { ...students[index], id, name, dept, year };
        } else {
            // Add new -> defaulting to Present
            students.push({ id, name, dept, year, status: 'Present' });
        }
        saveStudents();
        renderStudentTable(document.getElementById('student-search').value);
        document.getElementById('student-modal').classList.remove('show');
    }

    window.openDeleteModal = function(id) {
        document.getElementById('delete-student-id').value = id;
        document.getElementById('delete-password-input').value = '';
        document.getElementById('delete-modal').classList.add('show');
    }

    function confirmDelete() {
        const pass = document.getElementById('delete-password-input').value;
        const idToDelete = document.getElementById('delete-student-id').value;
        
        if (pass !== '235689') {
            alert('Incorrect Admin Password!');
            return;
        }

        students = students.filter(s => s.id !== idToDelete);
        saveStudents();
        renderStudentTable(document.getElementById('student-search').value);
        document.getElementById('delete-modal').classList.remove('show');
    }

    function fillSettings() {
        if(currentUser) {
            document.getElementById('settings-mobile').value = currentUser.mobile || '';
            document.getElementById('settings-email').value = currentUser.email || '';
            document.getElementById('settings-name').value = currentUser.name || '';
            document.getElementById('settings-dept').value = currentUser.dept || '';
            document.getElementById('settings-year').value = currentUser.year || '';
        }
    }

    function saveProfile() {
        if(currentUser) {
            currentUser.name = document.getElementById('settings-name').value;
            currentUser.dept = document.getElementById('settings-dept').value;
            currentUser.year = document.getElementById('settings-year').value;
            localStorage.setItem('mpnmj_user', JSON.stringify(currentUser));
            alert('Profile saved successfully!');
        }
    }

    function logout() {
        if(confirm('Are you sure you want to sign out?')) {
            localStorage.removeItem('mpnmj_user');
            currentUser = null;
            appContainer.classList.remove('active-view');
            loginPage.classList.add('active-view');
            
            // clear inputs
            document.getElementById('login-email').value = '';
            document.getElementById('login-mobile').value = '';
            document.getElementById('login-password').value = '';
        }
    }
});
