// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM ---
    const userLevelSpan = document.getElementById('user-level');
    const userTitleSpan = document.getElementById('user-title');
    const userXPSpan = document.getElementById('user-xp');
    const xpToNextLevelSpan = document.getElementById('xp-to-next-level');
    const xpBar = document.getElementById('xp-bar');

    const questForm = document.getElementById('quest-form');
    const questTitleInput = document.getElementById('quest-title');
    const questDescriptionInput = document.getElementById('quest-description');
    const questLabelInput = document.getElementById('quest-label'); // New: Label input
    const questStartDateInput = document.getElementById('quest-start-date');
    const questEndDateInput = document.getElementById('quest-end-date');
    const questsContainer = document.getElementById('quests-container');
    const noQuestsMessage = questsContainer.querySelector('.no-quests-message');

    const backgroundMusic = document.getElementById('background-music');

    // --- Data Aplikasi (State) ---
    let user = {
        level: 1,
        xp: 0,
        xpNeededForNextLevel: 100, // XP needed to reach next level
        lastQuestCompletedTimestamp: null // Timestamp of the last completed quest
    };

    let quests = []; // Array untuk menyimpan semua quest

    // --- Title System Configuration ---
    const titles = [
        { level: 1, name: "Villager" }, // Title Level 1
        { level: 5, name: "Peasant" },
        { level: 10, name: "Squire" },
        { level: 15, name: "Knight Apprentice" },
        { level: 25, name: "Knight" },
        { level: 50, name: "Veteran Knight" },
        { level: 65, name: "Crusader" },
        { level: 75, name: "Baron" },
        { level: 85, name: "Viscount" },
        { level: 100, name: "Count" },
        { level: 120, name: "Marquis" },
        { level: 135, name: "Duke" },
        { level: 150, name: "Grand Duke" },
        { level: 175, name: "Prince" },
        { level: 200, name: "King" },
        { level: 225, name: "Emperor" },
        { level: 270, name: "High Emperor" },
        { level: 300, name: "Warden of the Realm" },
        { level: 350, name: "Immortal Champion" },
        { level: 400, name: "Mythic Hero" },
        { level: 500, name: "Legend of the Realm" }
    ];

    // --- XP Base Configuration ---
    const XP_PER_DAY_BASIC = 50; // Basic XP multiplier for duration
    const XP_DESCRIPTION_BONUS = 10;
    const XP_LABEL_BONUS = {
        normal: 10,
        important: 30,
        urgent: 50
    };

    // --- Fungsi Helper ---

    // Fungsi untuk mendapatkan title berdasarkan level
    function getTitleByLevel(level) {
        let currentTitle = titles[0].name; // Default to Villager
        for (let i = 0; i < titles.length; i++) {
            if (level >= titles[i].level) {
                currentTitle = titles[i].name;
            } else {
                break;
            }
        }
        return currentTitle;
    }

    // Fungsi untuk menghitung XP yang dibutuhkan untuk level berikutnya
    function calculateXPForNextLevel(level) {
        // Contoh: XP = Level * 100
        return level * 100;
    }

    // Fungsi untuk menghitung XP berdasarkan parameter quest
    function calculateQuestXP(startDate, endDate, description, label) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Durasi dalam hari

        let totalXP = diffDays * XP_PER_DAY_BASIC; // XP dari durasi

        if (description && description.trim() !== '') {
            totalXP += XP_DESCRIPTION_BONUS; // XP dari deskripsi
        }

        totalXP += XP_LABEL_BONUS[label] || 0; // XP dari label, default 0 jika label tidak ditemukan

        return totalXP;
    }

    // Fungsi untuk menyimpan data ke Local Storage
    function saveData() {
        localStorage.setItem('riseQuestUser', JSON.stringify(user));
        localStorage.setItem('riseQuestQuests', JSON.stringify(quests));
    }

    // Fungsi untuk memuat data dari Local Storage
    function loadData() {
        const savedUser = localStorage.getItem('riseQuestUser');
        const savedQuests = localStorage.getItem('riseQuestQuests');

        if (savedUser) {
            user = JSON.parse(savedUser);
        }
        if (savedQuests) {
            quests = JSON.parse(savedQuests);
        }

        user.xpNeededForNextLevel = calculateXPForNextLevel(user.level);
    }

    // Fungsi untuk memperbarui tampilan UI
    function updateUI() {
        userLevelSpan.textContent = user.level;
        userTitleSpan.textContent = getTitleByLevel(user.level);
        userXPSpan.textContent = user.xp;
        xpToNextLevelSpan.textContent = user.xpNeededForNextLevel;

        const xpPercentage = (user.xp / user.xpNeededForNextLevel) * 100;
        xpBar.style.width = `${xpPercentage > 100 ? 100 : xpPercentage}%`; // Cap at 100%

        renderQuests(); // Gambar ulang daftar quest
    }

    // Fungsi untuk merender daftar quest
    function renderQuests() {
        questsContainer.innerHTML = ''; // Kosongkan container

        if (quests.length === 0) {
            noQuestsMessage.style.display = 'block';
            return;
        } else {
            noQuestsMessage.style.display = 'none';
        }

        const sortedQuests = [...quests].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

        const questsByMonth = sortedQuests.reduce((acc, quest) => {
            const date = new Date(quest.endDate);
            const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(quest);
            return acc;
        }, {});

        for (const monthYear in questsByMonth) {
            const monthGroupDiv = document.createElement('div');
            monthGroupDiv.classList.add('month-group');
            monthGroupDiv.innerHTML = `<h3>${monthYear}</h3>`;
            
            questsByMonth[monthYear].forEach(quest => {
                const questItem = document.createElement('div');
                questItem.classList.add('quest-item');
                if (quest.completed) {
                    questItem.classList.add('completed');
                }
                questItem.dataset.id = quest.id;

                // Add priority class for styling if needed
                questItem.classList.add(`priority-${quest.label}`);

                questItem.innerHTML = `
                    <h4>${quest.title}</h4>
                    ${quest.description ? `<p>${quest.description}</p>` : ''}
                    <div class="quest-dates">
                        Priority: <span class="quest-label-display">${quest.label.charAt(0).toUpperCase() + quest.label.slice(1)}</span> |
                        Due: ${new Date(quest.endDate).toLocaleDateString()}
                    </div>
                    <div class="quest-actions">
                        <button class="complete-button glow-button">${quest.completed ? 'Re-open' : 'Complete'}</button>
                        <button class="delete-button glow-button">Delete</button>
                    </div>
                `;
                monthGroupDiv.appendChild(questItem);
            });
            questsContainer.appendChild(monthGroupDiv);
        }
    }

    // Fungsi untuk menambahkan XP
    function addXP(amount) {
        user.xp += amount;
        while (user.xp >= user.xpNeededForNextLevel) {
            user.xp -= user.xpNeededForNextLevel;
            user.level++;
            user.xpNeededForNextLevel = calculateXPForNextLevel(user.level);
        }
        saveData();
        updateUI();
    }

    // Fungsi untuk mereset level (punishment)
    function applyPunishmentIfDue() {
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari dalam milidetik
        const now = Date.now();

        // Cek apakah ada quest yang belum selesai
        const hasActiveQuests = quests.some(q => !q.completed);

        // Hukuman hanya berlaku jika ada quest aktif DAN sudah lebih dari seminggu sejak terakhir menyelesaikan quest
        if (hasActiveQuests && user.lastQuestCompletedTimestamp && (now - user.lastQuestCompletedTimestamp > ONE_WEEK_MS)) {
            const confirmReset = confirm(
                "Warning! You haven't completed any quests in the last week and still have active quests!\n" +
                "Your level will be reset to Lv1 as a penalty. Continue?"
            );

            if (confirmReset) {
                user.level = 1;
                user.xp = 0;
                user.xpNeededForNextLevel = calculateXPForNextLevel(user.level);
                user.lastQuestCompletedTimestamp = null; // Reset timestamp after punishment
                alert("Penalty applied! Level reset to Lv1.");
                saveData();
                updateUI();
            } else {
                alert("Penalty deferred. Keep going!");
                // Jika user menolak, Anda bisa menambahkan logika untuk menunda cek hukuman ini
                // untuk beberapa waktu (misal 1 hari) agar tidak terus muncul.
                // Untuk kesederhanaan, saat ini akan muncul lagi jika refresh.
            }
        }
    }

    // Fungsi untuk memainkan musik
    function playBackgroundMusic() {
        // Coba putar musik. Browser mungkin memblokir autoplay tanpa interaksi pengguna.
        backgroundMusic.volume = 0.2; // Set volume rendah
        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
            })
            .catch(error => {
                // Autoplay was prevented. Show a "Play Music" button or handle it.
                console.log("Autoplay of music prevented. User interaction needed.");
                // Opsional: Buat tombol play/pause di UI jika perlu kontrol manual
            });
        }
    }


    // --- Event Listeners ---

    // Menangani penambahan quest baru
    questForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = questTitleInput.value.trim();
        const description = questDescriptionInput.value.trim();
        const label = questLabelInput.value; // Get selected label
        const startDate = questStartDateInput.value;
        const endDate = questEndDateInput.value;

        if (!title || !startDate || !endDate) {
            alert('Please fill in quest title, start date, and end date.');
            return;
        }
        // Validasi tanggal: Start Date tidak boleh setelah End Date
        if (new Date(startDate) > new Date(endDate)) {
            alert('Start Date cannot be after End Date.');
            return;
        }


        const newQuest = {
            id: Date.now().toString(),
            title,
            description,
            label, // Add label to quest object
            startDate,
            endDate,
            completed: false
        };

        quests.push(newQuest);
        saveData();
        renderQuests();
        questForm.reset(); // Clear form
        // Set default label back to 'normal' after reset
        questLabelInput.value = 'normal';
    });

    // Menangani aksi pada quest (complete/delete) menggunakan event delegation
    questsContainer.addEventListener('click', (e) => {
        const button = e.target;
        const questItem = button.closest('.quest-item');

        if (!questItem) return;

        const questId = questItem.dataset.id;
        const questIndex = quests.findIndex(q => q.id === questId);

        if (questIndex === -1) return;

        if (button.classList.contains('complete-button')) {
            const currentQuest = quests[questIndex];
            currentQuest.completed = !currentQuest.completed; // Toggle completed status

            if (currentQuest.completed) {
                // Hitung XP hanya saat quest diselesaikan (bukan dibuka kembali)
                const xpEarned = calculateQuestXP(currentQuest.startDate, currentQuest.endDate, currentQuest.description, currentQuest.label);
                addXP(xpEarned);
                user.lastQuestCompletedTimestamp = Date.now(); // Update timestamp
            } else {
                // mengurangi XP saat quest dibuka kembali
                const xpLost = calculateQuestXP(currentQuest.startDate, currentQuest.endDate, currentQuest.description, currentQuest.label);
                user.xp -= xpLost; // Ini bisa membuat XP jadi negatif jika tidak hati-hati
            }
            saveData();
            updateUI();
        } else if (button.classList.contains('delete-button')) {
            // No confirmation popup as requested
            quests.splice(questIndex, 1);
            saveData();
            renderQuests();
        }
    });

    // Handle user interaction to potentially start music (e.g., first click anywhere)
    document.body.addEventListener('click', () => {
        playBackgroundMusic();
    }, { once: true }); // Only run once to attempt autoplay


    // --- Inisialisasi Aplikasi ---
    loadData();
    applyPunishmentIfDue();
    updateUI();
});