// Lightbox: klik gambar project untuk memperbesar
(function () {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
        '<button class="lightbox-btn lightbox-close" aria-label="Tutup">×</button>' +
        '<button class="lightbox-btn lightbox-prev" aria-label="Sebelumnya">‹</button>' +
        '<img class="lightbox-img" alt="">' +
        '<button class="lightbox-btn lightbox-next" aria-label="Berikutnya">›</button>' +
        '<div class="lightbox-count"></div>';
    document.body.appendChild(box);

    const img = box.querySelector('.lightbox-img');
    const count = box.querySelector('.lightbox-count');
    let images = [];
    let index = 0;
    let project = null;

    function show() {
        const current = images[index];
        img.src = current.src;
        img.alt = current.alt;
        count.textContent = (index + 1) + ' / ' + images.length;
    }

    function open(list, start, projectName) {
        images = list;
        project = projectName;
        index = start;
        show();
        box.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        // sinkronkan slider di halaman dengan gambar terakhir yang dilihat
        if (project && typeof goToSlide === 'function') {
            goToSlide(project, index);
        }
        box.classList.remove('open');
        document.body.style.overflow = '';
    }

    function move(step) {
        index = (index + step + images.length) % images.length;
        show();
    }

    // klik pada slider -> buka gambar yang sedang aktif
    document.querySelectorAll('.slides').forEach(function (slides) {
        slides.addEventListener('click', function () {
            const list = Array.from(slides.querySelectorAll('img'));
            const active = list.findIndex(function (el) { return el.classList.contains('active'); });
            const cls = Array.from(slides.classList).find(function (c) { return c.endsWith('-slides'); });
            const name = cls ? cls.replace('-slides', '') : null;
            open(list, active === -1 ? 0 : active, name);
        });
    });

    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', function () { move(-1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { move(1); });

    // klik area gelap untuk menutup
    box.addEventListener('click', function (e) {
        if (e.target === box) close();
    });

    // keyboard: Esc, panah kiri, panah kanan
    document.addEventListener('keydown', function (e) {
        if (!box.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') move(-1);
        if (e.key === 'ArrowRight') move(1);
    });
})();