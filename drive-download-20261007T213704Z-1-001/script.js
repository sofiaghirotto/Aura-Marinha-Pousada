document.addEventListener('DOMContentLoaded', () => {

    /* 1. MENU MOBILE */
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    /* 2. HIGHLIGHT NAV SCROLL */
    const sections = document.querySelectorAll('section');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.navbar a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.navbar a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    /* 3. PARALLAX */
    const heroBg = document.getElementById('heroBg');
    let ticking = false;

    function updateParallax() {
        const scrollValue = window.scrollY;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollValue * 0.35}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    /* 4. MODAL ACOMODAÇÕES */
    const detailsButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('roomModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    const roomDetails = {
        "Suíte Brisa": "A Suíte Brisa é perfeita para momentos a dois. Oferece ambiente climatizado, iluminação aconchegante, banho privativo com ducha a aquecimento solar e vista para os jardins tropicais da pousada.",
        "Suíte Maré": "A Suíte Maré acomoda até 3 pessoas com extremo conforto. Possui varanda privativa equipada com rede artesanal de descanso, frigobar, ar-condicionado silencioso e decoração inspirada nas praias de Ubatuba.",
        "Suíte Oceano Master": "A nossa acomodação mais charmosa e espaçosa. Possui cama de casal estilo Dossel, sala de estar integrada, varanda privativa ampla com vista panorâmica para o mar e kit de amenidades exclusivas."
    };

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const roomName = button.getAttribute('data-room');
            if (roomDetails[roomName]) {
                modalTitle.textContent = roomName;
                modalText.textContent = roomDetails[roomName];
                modal.classList.add('active');
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    /* 5. FORMULÁRIO */
    const cadastroForm = document.getElementById('cadastroForm');
    const mensagemCadastro = document.getElementById('mensagemCadastro');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nomeInput = document.getElementById('nome').value.trim();
            const primeiroNome = nomeInput.split(' ')[0] || 'Hóspede';

            mensagemCadastro.textContent = `Obrigado, ${primeiroNome}! Seu cadastro foi realizado com sucesso. Entraremos em contato via WhatsApp em breve!`;
            cadastroForm.reset();
        });
    }

    /* 6. CARROSSEL DE FOTOS */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
});