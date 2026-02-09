document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic GitHub Projects Integration
    const portfolioGrid = document.querySelector('.portfolio-grid');

    const fetchAllRepos = async () => {
        try {
            const response = await fetch('https://api.github.com/users/Jayson056/repos?sort=updated&per_page=100');
            const repos = await response.json();

            if (Array.isArray(repos)) {
                portfolioGrid.innerHTML = ''; // Clear existing static cards

                repos.forEach(repo => {
                    // Skip the portfolio repo itself if desired
                    if (repo.name === 'JaysonWebPortfolio.io') return;

                    const card = document.createElement('div');
                    card.className = 'project-card content-blur';
                    card.setAttribute('data-repo', repo.full_name);

                    const description = repo.description || 'Professional software development project on GitHub.';

                    card.innerHTML = `
                        <div class="project-img">
                            <i class='bx bx-code-alt' style="font-size: 5rem; color: var(--primary);"></i>
                        </div>
                        <div class="project-info">
                            <h3>${repo.name}</h3>
                            <p>${description}</p>
                            <div class="repo-stats">
                                <span class="stars"><i class='bx bx-star'></i> <span>${repo.stargazers_count}</span></span>
                                <span class="forks"><i class='bx bx-git-repo-forked'></i> <span>${repo.forks_count}</span></span>
                            </div>
                            <button class="btn primary small open-modal">Explore Deeply</button>
                        </div>
                    `;
                    portfolioGrid.appendChild(card);
                });

                // Re-bind modal events for new cards
                bindModalEvents();
            }
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
        }
    };
    fetchAllRepos();

    // 2. Project 'Deep-Dive' Modals
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');

    const projectData = {
        'clawbolt': {
            title: 'CLAWBOLT AI Security',
            desc: 'A robust, API-less bridge between Telegram and localized AI agents. Built for extreme security and Human-in-the-Loop verification.',
            stack: ['Python', 'Telegram API', 'OCR/Computer Vision', 'Systemd'],
            features: ['Live Screen Monitoring', 'Secure Password Injection', 'Remote Command Execution']
        },
        'jvps': {
            title: 'JVPS Remote Desktop',
            desc: 'High-performance screen sharing and remote control directly in the browser. Zero plugins required.',
            stack: ['Flask', 'Gevent-WebSocket', 'PyAutoGUI', 'JavaScript'],
            features: ['Low Latency Stream', 'Keyboard/Mouse passthrough', 'Mobile Responsive UI']
        }
    };

    const bindModalEvents = () => {
        document.querySelectorAll('.open-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.project-card');
                const repo = card.getAttribute('data-repo');
                const projectKey = repo.split('/')[1].toLowerCase();
                const data = projectData[projectKey] || {
                    title: card.querySelector('h3').textContent,
                    desc: card.querySelector('p').textContent,
                    stack: ['GitHub Project'],
                    features: ['Refer to GitHub for details']
                };

                modalTitle.textContent = data.title;
                modalBody.innerHTML = `
                    <p style="margin-bottom: 2rem; font-size: 1.1rem; color: var(--text-dim);">${data.desc}</p>
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: var(--primary); margin-bottom: 1rem;">Core Tech Stack:</h4>
                        <div class="tags">
                            ${data.stack.map(s => `<span>${s}</span>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: var(--primary); margin-bottom: 1rem;">Key Features:</h4>
                        <ul style="list-style: none; color: var(--text-dim);">
                            ${data.features.map(f => `<li style="margin-bottom: 0.5rem;"><i class='bx bx-check-circle' style="color: var(--primary); margin-right: 0.5rem;"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>
                    <a href="https://github.com/${repo}" target="_blank" class="btn primary">View on GitHub</a>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target == modal) closeModal.onclick();
    };

    // 3. ClawBot Assistant - Deep Heuristic Intelligence
    const bubble = document.getElementById('clawbot-bubble');
    const chat = document.getElementById('clawbot-chat');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Deep Knowledge Base
    const KB = {
        "about": {
            keywords: ["who", "about", "jayson", "profile", "background"],
            answer: "Jayson Combate is a Full Stack Developer & AI Automation Specialist. He specializes in bridging complex AI logic with practical human interfaces using Python, Flask, and modern web tech."
        },
        "skills": {
            keywords: ["skill", "expertise", "coding", "language", "python", "javascript", "linux", "stack"],
            answer: "Jayson's elite stack includes: Python (Advanced Automation), JavaScript (Full Stack), AI Agency (LLM Orchestration), and Linux (Systemd/Automation). He is also proficient in Flask, CSS Glassmorphism, and Networking."
        },
        "clawbolt": {
            keywords: ["clawbolt", "security", "telegram", "bridge", "monitor"],
            answer: "CLAWBOLT is Jayson's flagship project—a secure, API-less bridge between Telegram and localized AI agents. It features real-time screen monitoring and secure password injection."
        },
        "projects": {
            keywords: ["project", "work", "portfolio", "github", "build"],
            answer: "Jayson has a diverse portfolio including CLAWBOLT (AI Security), JVPS (Remote Desktop), MEDIKA (Healthcare), and various AI utilities like BG Removal. Click 'Explore Deeply' on any card to see more!"
        },
        "contact": {
            keywords: ["contact", "hire", "email", "telegram", "reach", "message"],
            answer: "You can reach Jayson directly via Telegram @Jayson056 or use the professional contact form at the bottom of this page. He's always open to collaborating on innovative AI projects!"
        },
        "experience": {
            keywords: ["experience", "job", "career", "history", "years"],
            answer: "Jayson has extensive experience in building GUI automation tools, custom web applications, and AI integrations. He focuses on high-performance, secure, and user-centric systems."
        },
        "philosophy": {
            keywords: ["goal", "mission", "vision", "philosophy", "why"],
            answer: "Jayson's mission is to democratize complex technology by creating intuitive, secure bridges between users and powerful automation engines."
        }
    };

    bubble.onclick = () => {
        chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
        bubble.style.transform = chat.style.display === 'flex' ? 'scale(0.8)' : 'scale(1)';
    };

    closeChat.onclick = () => {
        chat.style.display = 'none';
        bubble.style.transform = 'scale(1)';
    };

    const addMessage = (text, type) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
        const text = userInput.value.trim().toLowerCase();
        if (!text) return;

        addMessage(userInput.value.trim(), 'user');
        userInput.value = '';

        // Thinking simulation
        const thinking = document.createElement('div');
        thinking.className = 'message ai';
        thinking.innerHTML = "<i>Thinking...</i>";
        chatMessages.appendChild(thinking);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            thinking.remove();
            let response = "I'm not quite sure about that specific detail, but I can tell you all about Jayson's projects, technical skills, or how to contact him. Try asking about 'CLAWBOLT' or his 'Skills'!";

            // Heuristic Matching
            let bestMatch = null;
            let maxHits = 0;

            for (const category in KB) {
                let hits = 0;
                KB[category].keywords.forEach(word => {
                    if (text.includes(word)) hits++;
                });
                if (hits > maxHits) {
                    maxHits = hits;
                    bestMatch = KB[category].answer;
                }
            }

            if (bestMatch) response = bestMatch;

            // Special greets
            if (text.includes("hello") || text.includes("hi")) {
                response = "Hello! I'm ClawBot, Jayson's digital assistant. I know everything about his projects and expertise. What would you like to know?";
            }

            addMessage(response, 'ai');
        }, 800);
    };

    sendBtn.onclick = handleChat;
    userInput.onkeydown = (e) => { if (e.key === 'Enter') handleChat(); };

    // 4. Contact Form Handler
    document.getElementById('contact-form').onsubmit = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Your message has been sent to Jayson via ClawBolt.');
            btn.textContent = originalText;
            btn.disabled = false;
            e.target.reset();
        }, 1500);
    };

    // 5. Basic Three.js Background Visuals
    const initThree = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-bg').appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xf9532d, wireframe: true, transparent: true, opacity: 0.1 });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        camera.position.z = 50;

        const animate = () => {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };
    initThree();
});
