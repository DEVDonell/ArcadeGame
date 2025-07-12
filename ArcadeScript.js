//Donell Fakude
//Arcade Script
//File name: ArcadeScript.js


// Start game and open modal
function startGame(gameName) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    title.textContent = gameName;
    modal.classList.remove('hidden');

    content.innerHTML = `
        <div class="h-64 bg-black rounded flex flex-col items-center justify-center">
            <p class="retro-font text-lg text-yellow-400 mb-4">${gameName.toUpperCase()}</p>
            <p class="text-gray-400 mb-4">This would be the actual game in a real implementation.</p>
            <div class="flex space-x-4">
                <div class="w-8 h-8 bg-red-500"></div>
                <div class="w-8 h-8 bg-blue-500"></div>
                <div class="w-8 h-8 bg-green-500"></div>
                <div class="w-8 h-8 bg-yellow-500"></div>
            </div>
        </div>
    `;
}

// Close modal
function closeModal() {
    document.getElementById('gameModal').classList.add('hidden');
}

// Sound elements
    const bgMusic = document.getElementById("bgMusic");
    const clickSound = document.getElementById("clickSound");
    const loadSound = document.getElementById("loadSound"); 


// Simulate fullscreen alert
function fullscreenGame() {
    const gameTitle = document.getElementById('modalTitle').textContent;
    alert(`Going fullscreen with ${gameTitle}!`);
}

// Blinking arcade title every 2s
setInterval(() => {
    const title = document.getElementById('arcadeTitle');
    title.classList.toggle('glow');
}, 2000);



// Ensure audio plays after user interaction
document.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
}, { once: true });

function startGame(gameName) {
    clickSound.play(); // Play button clic

    const modal = document.getElementById('gameModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    title.textContent = gameName;
    modal.classList.remove('hidden');

    setTimeout(() => {
        loadSound.play(); // Play loading sound

        content.innerHTML = `
            <div class="h-64 bg-black rounded flex flex-col items-center justify-center">
                <p class="retro-font text-lg text-yellow-400 mb-4">${gameName.toUpperCase()}</p>
                <p class="text-gray-400 mb-4">This would be the actual game in a real implementation.</p>
                <div class="flex space-x-4">
                    <div class="w-8 h-8 bg-red-500"></div>
                    <div class="w-8 h-8 bg-blue-500"></div>
                    <div class="w-8 h-8 bg-green-500"></div>
                    <div class="w-8 h-8 bg-yellow-500"></div>
                </div>
            </div>`;
    }, 1000);
}

function closeModal() {
    document.getElementById('gameModal').classList.add('hidden');
}

function fullscreenGame() {
    const gameTitle = document.getElementById('modalTitle').textContent;
    alert(`Going fullscreen with ${gameTitle}!`);
}

// Toggle music
function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    if (bgMusic.paused) {
        bgMusic.play();
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        bgMusic.pause();
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
    }
}

// Arcade title blinking
setInterval(() => {
    const title = document.getElementById('arcadeTitle');
    title.classList.toggle('glow');
}, 2000);
