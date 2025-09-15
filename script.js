// Animación de flores amarillas cayendo
document.addEventListener('DOMContentLoaded', () => {
    const flowerContainer = document.querySelector('.falling-flowers');
    // SVG de girasol estilizado
    const sunflowerSVG = `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="19" r="8" fill="#a67c00"/>
        <g>
            <ellipse cx="19" cy="5" rx="4" ry="8" fill="#ffd700"/>
            <ellipse cx="19" cy="33" rx="4" ry="8" fill="#ffd700"/>
            <ellipse cx="5" cy="19" rx="8" ry="4" fill="#ffe066"/>
            <ellipse cx="33" cy="19" rx="8" ry="4" fill="#ffe066"/>
            <ellipse cx="8" cy="8" rx="3" ry="6" fill="#ffd700"/>
            <ellipse cx="30" cy="8" rx="3" ry="6" fill="#ffd700"/>
            <ellipse cx="8" cy="30" rx="3" ry="6" fill="#ffd700"/>
            <ellipse cx="30" cy="30" rx="3" ry="6" fill="#ffd700"/>
        </g>
    </svg>`;
    function createSunflower() {
        const flower = document.createElement('div');
        flower.classList.add('flower-petal');
        flower.innerHTML = sunflowerSVG;
        flower.style.position = 'absolute';
        flower.style.left = Math.random() * window.innerWidth + 'px';
        flower.style.top = '-40px';
        flower.style.opacity = 0.8 + Math.random() * 0.2;
        flower.style.transform = `scale(${0.7 + Math.random() * 0.6}) rotate(${Math.random()*360}deg)`;
        flower.style.filter = `drop-shadow(0 0 16px #ffd70088)`;
        flowerContainer.appendChild(flower);
        let speed = 1 + Math.random() * 1.5;
        let sway = Math.random() * 2 + 1;
        let angle = Math.random() * 360;
        function fall() {
            let top = parseFloat(flower.style.top);
            let left = parseFloat(flower.style.left);
            top += speed;
            angle += sway;
            left += Math.sin(angle/40) * sway;
            flower.style.top = top + 'px';
            flower.style.left = left + 'px';
            if (top < window.innerHeight + 40) {
                requestAnimationFrame(fall);
            } else {
                flower.remove();
            }
        }
        fall();
    }
    setInterval(createSunflower, 1200); // Menos girasoles cayendo
    for(let i=0;i<7;i++) setTimeout(createSunflower, i*350); // Menos girasoles iniciales

    // Carrusel de galería
    const images = document.querySelectorAll('.carousel-images img');
    let current = 0;
    function showImage(idx) {
        images.forEach((img, i) => {
            img.style.display = i === idx ? 'block' : 'none';
        });
    }
    showImage(current);
    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        current = (current + 1) % images.length;
        showImage(current);
    });
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    // Animación de corazón al hacer clic
    function showHeart() {
        const heart = document.getElementById('animatedHeart');
        heart.innerHTML = `<svg viewBox="0 0 120 120"><path d="M60 100 Q20 60 60 30 Q100 60 60 100 Z" fill="#ffd700" stroke="#a67c00" stroke-width="4"/><path d="M60 90 Q30 60 60 40 Q90 60 60 90 Z" fill="#fffbe6" opacity="0.7"/></svg>`;
        heart.classList.add('show');
        setTimeout(() => heart.classList.remove('show'), 1200);
    }
    document.body.addEventListener('click', (e) => {
        // Solo si no es botón de carrusel
        if (!e.target.classList.contains('carousel-btn')) {
            showHeart();
        }
    });
    document.querySelector('.love-btn').addEventListener('click', showHeart);
    // Mensaje especial para Mary
    // Modal Mary
    const maryModal = document.getElementById('maryModal');
    const maryModalClose = document.getElementById('maryModalClose');
    const maryAnimatedName = document.getElementById('maryAnimatedName');
    const maryModalText = document.getElementById('maryModalText');

    function animateMaryName(name, element, speed = 180) {
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < name.length) {
                element.innerHTML += `<span style="opacity:0.7;">${name[i]}</span>`;
                element.querySelectorAll('span')[i].style.animation = `fadeIn 0.5s ${i*0.13}s forwards`;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function showMaryModal() {
        maryModal.classList.add('show');
        animateMaryName('MARY', maryAnimatedName, 220);
        maryModalText.innerHTML = `<span class="emoji">🌻</span> Eres mi sol, mi girasol y mi alegría. <span class="emoji">💛</span><br>Gracias por iluminar mi vida cada día.<br><span class="emoji">🌻</span> Te amo infinitamente <span class="emoji">💛</span>`;
    }
    function hideMaryModal() {
        maryModal.classList.remove('show');
        maryAnimatedName.innerHTML = '';
        maryModalText.innerHTML = '';
    }
    document.querySelector('.love-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        showHeart();
        showMaryModal();
    });
    maryModalClose.addEventListener('click', hideMaryModal);
    maryModal.addEventListener('click', function(e) {
        if (e.target === maryModal) hideMaryModal();
    });
});
