// Matrix rain effect
function createMatrixRain() {
    const matrixElement = document.getElementById('matrixCanvas');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    
    setInterval(() => {
        const span = document.createElement('span');
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixElement.appendChild(span);
        
        if (matrixElement.children.length > 100) {
            matrixElement.removeChild(matrixElement.children[0]);
        }
    }, 100);
}

// Chart visualization
function createSystemBar() {
    const systemBar = document.createElement('div');
    systemBar.className = 'system-bar';
    systemBar.innerHTML = `
        <div class="metrics-container">
            <div class="metric">
                <span>CPU:</span>
                <div class="progress-bar">
                    <div class="progress" id="cpuUsage"></div>
                </div>
            </div>
            <div class="metric">
                <span>RAM:</span>
                <div class="progress-bar">
                    <div class="progress" id="ramUsage"></div>
                </div>
            </div>
            <div class="metric">
                <span>NETWORK:</span>
                <div class="progress-bar">
                    <div class="progress" id="networkUsage"></div>
                </div>
            </div>
        </div>
        <div class="audio-controls">
            <span class="track-name">PLAYING: RUSS</span>
            <span class="track-time">0:00</span>
            <input type="range" id="volumeSlider" min="0" max="100" value="50" class="volume-slider">
            <span class="volume-icon">VOL</span>
        </div>
    `;
    document.body.insertBefore(systemBar, document.body.firstChild);
    
    let metrics = {
        cpu: { value: 75, target: 75, speed: 0.2 },
        ram: { value: 60, target: 60, speed: 0.1 },
        network: { value: 45, target: 45, speed: 0.3 }
    };

    function updateMetric(metric) {
        // Add static-like random fluctuation
        const staticNoise = (Math.random() - 0.5) * 3;
        
        // Occasionally add signal interference
        if (Math.random() < 0.05) {
            return metric.value + staticNoise + (Math.random() < 0.5 ? -8 : 8);
        }
        
        // Smoothly move towards target with static effect
        metric.value += (metric.target - metric.value) * metric.speed + staticNoise;
        
        // Occasionally set new target (system load changes)
        if (Math.random() < 0.01) {
            metric.target = Math.min(Math.max(30, metric.target + (Math.random() - 0.5) * 30), 95);
        }
        
        return metric.value;
    }

    setInterval(() => {
        document.getElementById('cpuUsage').style.width = `${updateMetric(metrics.cpu)}%`;
        document.getElementById('ramUsage').style.width = `${updateMetric(metrics.ram)}%`;
        document.getElementById('networkUsage').style.width = `${updateMetric(metrics.network)}%`;
    }, 30); // Faster updates for more static-like effect
}

// Chart visualization with glow effect
function createChart() {
    const ctx = document.getElementById('dataChart').getContext('2d');
    
    // Add glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 12}, (_, i) => i + 1),
            datasets: [{
                data: Array.from({length: 12}, () => Math.random() * 100),
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 750,
                easing: 'easeInOutQuart',
                animations: {
                    numbers: {
                        type: 'number',
                        duration: 750,
                        easing: 'linear',
                        from: (ctx) => {
                            if (ctx.type === 'data') {
                                return ctx.previous && ctx.previous.dataset && ctx.previous.dataset.data[ctx.dataIndex];
                            }
                            return 0;
                        }
                    }
                },
                delay: (context) => context.dataIndex * 50
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        stepSize: 20
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });

    // Update chart with new data every 2 seconds
    setInterval(() => {
        const newData = Array.from({length: 12}, () => Math.random() * 100);
        chart.data.datasets[0].data = newData;
        chart.update(); // Remove 'none' to enable animations
    }, 2000);
}

// Add at the end of your existing code
function createMaze() {
    const maze = document.getElementById('mazePattern');
    
    function createLine() {
        const line = document.createElement('div');
        line.className = 'maze-line';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.animationDelay = Math.random() * 5 + 's';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        maze.appendChild(line);
        
        // Remove the line after animation
        setTimeout(() => {
            maze.removeChild(line);
        }, 8000);
    }

    // Create new lines periodically
    setInterval(createLine, 200);
    
    // Create initial set of lines
    for(let i = 0; i < 20; i++) {
        createLine();
    }
}

function initAudio() {
    const audio = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.querySelector('.volume-icon');
    const trackTime = document.querySelector('.track-time');
    
    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        const volume = Math.max(0.001, e.target.value / 100); // Prevent volume from being exactly 0
        audio.volume = volume;
        volumeIcon.textContent = volume <= 0.001 ? 'MUTE' : 'VOL';
    });
    
    // Toggle mute
    volumeIcon.addEventListener('click', () => {
        audio.muted = !audio.muted;
        volumeIcon.textContent = audio.muted ? 'MUTE' : 'VOL';
        if (!audio.muted) {
            const volume = Math.max(0.001, volumeSlider.value / 100);
            audio.volume = volume;
        }
    });

    // Update track time
    setInterval(() => {
        if (!audio.paused) {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
            trackTime.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);

    // Try to play automatically or on first interaction
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }
}

// Make sure initAudio is called when the page loads
// Add this new function
function createScreensaver() {
    const canvas = document.createElement('canvas');
    canvas.id = 'screensaverCanvas';
    const ctx = canvas.getContext('2d');
    
    const container = document.createElement('div');
    container.className = 'data-visualization screensaver';
    container.appendChild(canvas);
    
    const firstViz = document.querySelector('.data-visualization');
    firstViz.parentNode.insertBefore(container, firstViz.nextSibling);

    let eye = {
        x: 0.5,
        y: 0.5,
        size: 60,
        pupilSize: 25,
        targetX: 0.5,
        targetY: 0.5,
        blinkState: 1,
        nextBlink: Date.now() + Math.random() * 5000
    };

    // Add matrix rain
    let drops = [];
    const fontSize = 14;
    const characters = '01';
    const lineLength = 8; // Length of each code line
    
    function initMatrix(width, height) {
        const columns = Math.floor(width / fontSize);
        drops = Array(columns).fill().map(() => ({
            y: Math.random() * -100,
            speed: 0.5 + Math.random() * 1, // Slower speed
            chars: Array(lineLength).fill().map(() => characters[Math.floor(Math.random() * characters.length)]),
            opacity: Math.random() * 0.3 + 0.2 // More subtle opacity
        }));
    }

    function drawMatrix(ctx, width, height) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        drops.forEach((drop, i) => {
            // Draw line of characters
            drop.chars.forEach((char, j) => {
                const opacity = drop.opacity * (1 - j/lineLength); // Fade out effect
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.font = `${fontSize}px monospace`;
                ctx.fillText(char, i * fontSize, drop.y - (j * fontSize));
            });
            
            // Update position
            drop.y += drop.speed;
            
            // Reset when off screen
            if (drop.y > height + (lineLength * fontSize)) {
                drop.y = -fontSize;
                drop.chars = Array(lineLength).fill().map(() => 
                    characters[Math.floor(Math.random() * characters.length)]
                );
                drop.opacity = Math.random() * 0.3 + 0.2;
                drop.speed = 0.5 + Math.random() * 1;
            }
        });
    }

    function draw() {
        const width = canvas.width = container.clientWidth;
        const height = canvas.height = container.clientHeight;
        
        if (drops.length === 0) {
            initMatrix(width, height);
        }
        
        drawMatrix(ctx, width, height);
        drawEye(ctx, width, height);
        
        requestAnimationFrame(draw);
    }
    
    container.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        eye.targetX = (e.clientX - rect.left) / rect.width;
        eye.targetY = (e.clientY - rect.top) / rect.height;
    });

    function drawEye(ctx, width, height) {
        // More responsive eye movement
        eye.x += (eye.targetX - eye.x) * 0.3;
        eye.y += (eye.targetY - eye.y) * 0.3;

        // Handle blinking
        if (Date.now() > eye.nextBlink) {
            eye.blinkState = Math.max(0, eye.blinkState - 0.15);
            if (eye.blinkState === 0) {
                eye.blinkState = 1;
                eye.nextBlink = Date.now() + Math.random() * 5000 + 2000;
            }
        }

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';

        // Draw outer eye with vertical scaling for blink
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(
            width/2, 
            height/2, 
            eye.size, 
            eye.size * 0.6 * eye.blinkState, 
            0, 0, Math.PI * 2
        );
        ctx.fill();

        const maxOffset = eye.size * 0.3;
        const pupilX = width/2 + (eye.x - 0.5) * maxOffset;
        const pupilY = height/2 + (eye.y - 0.5) * maxOffset;

        // Draw pupil with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, eye.pupilSize * eye.blinkState, 0, Math.PI * 2);
        ctx.fill();

        // Draw highlight
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(
            pupilX - eye.pupilSize/3, 
            pupilY - eye.pupilSize/3, 
            eye.pupilSize/4 * eye.blinkState, 
            0, Math.PI * 2
        );
        ctx.fill();
    }

    draw();
}

// Add this as a separate function
function createPastesContainer() {
    const pastesContainer = document.createElement('div');
    pastesContainer.className = 'pastes-container';
    pastesContainer.innerHTML = `
        <div class="paste-header">RECENT PASTES</div>
        <div class="paste-list">
            <div class="paste-item">
                <span class="paste-title">Daiho Full dox | Downfall</span>
                <span class="paste-info">5928 views • Feb 17, 2025</span>
            </div>
            <div class="paste-item">
                <span class="paste-title">Kaan Kamikā | Blacklist | sensit...</span>
                <span class="paste-info">12356 views • Dec 28, 2024</span>
            </div>
            <div class="paste-item">
                <span class="paste-title">How to Ensure that your Paste sta...</span>
                <span class="paste-info">98953 views • Jul 14, 2024</span>
            </div>
            <div class="paste-item">
                <span class="paste-title">Transparency Report</span>
                <span class="paste-info">182429 views • Jul 11, 2024</span>
            </div>
        </div>
    `;
    
    // Insert after screensaver
    const screensaver = document.querySelector('.screensaver');
    screensaver.parentNode.insertBefore(pastesContainer, screensaver.nextSibling);
}

// Add this function to create the paste popup functionality
// Modify the setupPastePopups function to load content from text files
function setupPastePopups() {
    // Create overlay and popup container
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    const popup = document.createElement('div');
    popup.className = 'paste-popup';
    popup.innerHTML = `
        <div class="paste-popup-header">
            <div class="paste-popup-title"></div>
            <div class="paste-popup-close">×</div>
        </div>
        <div class="paste-popup-content"></div>
        <div class="paste-popup-meta">
            <span class="paste-popup-author"></span>
            <span class="paste-popup-date"></span>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Paste metadata - content will be loaded from files
    const pasteMetadata = {
        "Daiho Full dox | Downfall": {
            file: "paste1.txt",
            author: "Robio [Kitty]",
            date: "Feb 17, 2025"
        },
        "Kaan Kamikā | Blacklist | sensit...": {
            file: "paste2.txt",
            author: "blood [Kitty]",
            date: "Dec 28, 2024"
        },
        "How to Ensure that your Paste sta...": {
            file: "paste3.txt",
            author: "money [Admin]",
            date: "Jul 14, 2024"
        },
        "Transparency Report": {
            file: "paste4.txt",
            author: "peer [Founder]",
            date: "Jul 11, 2024"
        }
    };
    
    // Function to load paste content from file
    async function loadPasteContent(filename) {
        try {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            return await response.text();
        } catch (error) {
            console.error(error);
            return `Error loading content from ${filename}`;
        }
    }
    
    // Improved click handler with file loading
    document.addEventListener('click', async function(e) {
        const pasteItem = e.target.closest('.paste-item');
        if (pasteItem) {
            const title = pasteItem.querySelector('.paste-title').textContent;
            
            // Find matching paste metadata
            let metadata = null;
            for (const key in pasteMetadata) {
                if (title === key || title.includes(key.split('...')[0])) {
                    metadata = pasteMetadata[key];
                    break;
                }
            }
            
            if (metadata) {
                // Show loading state
                popup.querySelector('.paste-popup-title').textContent = title;
                popup.querySelector('.paste-popup-content').textContent = "Loading...";
                popup.querySelector('.paste-popup-author').textContent = metadata.author;
                popup.querySelector('.paste-popup-date').textContent = metadata.date;
                
                // Apply special styling for different authors
                const authorElement = popup.querySelector('.paste-popup-author');
                authorElement.textContent = metadata.author;
                
                // Remove any existing author classes
                authorElement.classList.remove('Robio-kitty-author', 'money-admin-author', 'peer-founder-author');
                
                // Add appropriate class based on author
                if (metadata.author === "Robio [Kitty]") {
                    authorElement.classList.add('blood-kitty-author');
                } else if (metadata.author === "money [Admin]") {
                    authorElement.classList.add('money-admin-author');
                } else if (metadata.author === "peer [Founder]") {
                    authorElement.classList.add('peer-founder-author');
                }
                
                // Add animation classes
                document.body.classList.add('blur-background');
                overlay.style.display = 'block';
                popup.style.display = 'block';
                
                // Trigger animation
                setTimeout(() => {
                    popup.classList.add('popup-active');
                }, 10);
                
                // Load content from file
                const content = await loadPasteContent(metadata.file);
                popup.querySelector('.paste-popup-content').textContent = content;
            }
        }
    });
    
    // Close popup with animation
    function closePopup() {
        popup.classList.remove('popup-active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
            document.body.classList.remove('blur-background');
        }, 300);
    }
    
    // Close popup when clicking the close button or overlay
    popup.querySelector('.paste-popup-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Prevent closing when clicking inside the popup
    popup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Fix the initialization section at the end of the file
// Add this at the beginning of your script
let captchaVerified = false;

// Add this function to handle the CAPTCHA callback
function captchaCallback(token) {
    captchaVerified = true;
    document.querySelector('.captcha-container').style.display = 'none';
    document.querySelector('.content-container').style.display = 'block';
    
    // Initialize components after CAPTCHA verification
    initializeComponents();
}

// Move initialization code to a separate function
function initializeComponents() {
    createSystemBar();
    initAudio();
    createChart();
    createScreensaver();
    createPastesContainer();
    setupPastePopups();
    createMaze();
}

// Modify your DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', () => {
    // Components will be initialized after CAPTCHA verification
});
