document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-theme');
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark');

    // About Me editable logic
    const editBtn = document.querySelector('.edit-text-btn');
    const aboutContent = document.querySelector('.editable-content');

    if (editBtn && aboutContent) {
        const saved = localStorage.getItem('aboutMe');
        if (saved && saved.trim() !== "") {
            aboutContent.textContent = saved;
        } else {
            aboutContent.textContent = aboutContent.dataset.placeholder || "Tell us about yourself...";
        }
        aboutContent.contentEditable = "false";
        editBtn.textContent = "Edit";

        editBtn.addEventListener('click', function () {
            if (aboutContent.isContentEditable) {
                aboutContent.contentEditable = "false";
                editBtn.textContent = "Edit";
                localStorage.setItem('aboutMe', aboutContent.textContent.trim());
            } else {
                aboutContent.contentEditable = "true";
                aboutContent.focus();
                editBtn.textContent = "Save";
            }
        });
    }

    // Alert on hover for projects box
    const projectsBox = document.getElementById('projects-box');
    if (projectsBox) {
        let alerted = false;
        projectsBox.addEventListener('mouseenter', function () {
            if (!alerted) {
                alert("There's no project yet, Thank you!❤️");
                alerted = true;
                setTimeout(() => { alerted = false; }, 2000);
            }
        });
    }

    // Diamonds animation
    const diamondsBackground = document.querySelector('.diamonds-background');
    const numberOfDiamonds = 13; 

    function generateRandomDiamond(i) {
        const diamond = document.createElement('div');
        diamond.classList.add('diamond');
        diamondsBackground.appendChild(diamond);
    }

    for (let i = 0; i < numberOfDiamonds; i++) {
        generateRandomDiamond(i);
    }

    // Floating Flowers Animation
    const flowersBackground = document.querySelector('.flowers-background');
    const flowerSVG = `
        <svg class="flower-shape" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <ellipse cx="19" cy="8" rx="6" ry="8" fill="#f5a8c2" />
                <ellipse cx="30" cy="15" rx="6" ry="8" fill="#f8bbd0" transform="rotate(45 30 15)" />
                <ellipse cx="30" cy="28" rx="6" ry="8" fill="#f5a8c2" transform="rotate(90 30 28)" />
                <ellipse cx="19" cy="36" rx="6" ry="8" fill="#f8bbd0" />
                <ellipse cx="8" cy="28" rx="6" ry="8" fill="#f5a8c2" transform="rotate(135 8 28)" />
                <ellipse cx="8" cy="15" rx="6" ry="8" fill="#f8bbd0" transform="rotate(180 8 15)" />
                <circle cx="19" cy="22" r="6" fill="#fffde7" />
            </g>
        </svg>
    `;
    const flowerCount = 10;
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = flowerSVG;
        flowersBackground.appendChild(flower);
    }

    // Certificate modal logic
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.querySelector('.certificate-modal .modal-img');
    const modalClose = document.querySelector('.certificate-modal .modal-close');
    document.querySelectorAll('.certificate-thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = thumb.getAttribute('data-img');
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modalImg.src = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
});
