/* ==========================================================================
   CUSTOM JAVASCRIPT + ANIMASI SCROLL WEB DESA KERTAJAYA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Web Kertajaya (Tema Rustic) Berhasil Dimuat!");

    // 1. Smooth Scrolling untuk Tautan Jangkar
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let link of smoothScrollLinks) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
            }
        });
    }

    // 2. Auto-close Navbar Mobile
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle.classList.contains('show')) bsCollapse.toggle();
            });
        });
    }

    // 3. ANIMASI SCROLL (Mendeteksi elemen masuk ke layar)
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.15, // Elemen muncul saat 15% bagiannya terlihat di layar
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Animasi hanya berjalan satu kali
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- 4. FITUR DARK MODE OPTIMASI ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Mengambil elemen gambar profil (hanya ada di halaman Tentang Desa)
    const profilImg = document.getElementById('gambar-profil'); 

    // Fungsi terpusat untuk menerapkan tema dan menukar gambar
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            // Menukar src gambar profil jika elemennya ada di halaman tersebut
            if (profilImg && profilImg.src.includes('profil-light.png')) {
                profilImg.src = profilImg.src.replace('profil-light.png', 'profil-dark.png');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            // Mengembalikan gambar profil ke mode terang
            if (profilImg && profilImg.src.includes('profil-dark.png')) {
                profilImg.src = profilImg.src.replace('profil-dark.png', 'profil-light.png');
            }
        }
    }

    // Cek tema yang tersimpan di Local Storage saat halaman dimuat
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Logika saat tombol Dark Mode diklik
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            // Simpan pilihan ke memori browser
            localStorage.setItem('theme', newTheme);
            
            // Terapkan perubahan
            applyTheme(newTheme);
        });
    }
});