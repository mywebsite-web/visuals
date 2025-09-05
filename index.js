
    /* ========== Data: only custom uploads, no generated projects ========== */
    const projectData = [];

    /* ---------- localStorage: custom uploads ---------- */
    const LS_KEY = 'customImages';
    function getCustomImages() { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch(e) { return []; } }
    function setCustomImages(arr) { localStorage.setItem(LS_KEY, JSON.stringify(arr)); }

    /* ---------- Render project cards (uploads only) ---------- */
    const projectGrid = document.getElementById('projectGrid');
    function renderProjectCards() {
      projectGrid.querySelectorAll('.dynamic-card').forEach(el => el.remove());
      const custom = getCustomImages();
      if (custom.length) {
        const art = buildProjectCard('uploads', 'Uploads', 'uploads', 'Uploads — Your images', custom[0]?.src || '', custom);
        projectGrid.insertBefore(art, projectGrid.firstChild);
      }
      document.querySelectorAll('[data-action="open"]').forEach(btn => {
        btn.removeEventListener('click', onOpenBtnClick);
        btn.addEventListener('click', onOpenBtnClick);
      });
      attachPlaceholderClicks();
    }

    function buildProjectCard(id, title, category, metaText, thumbSrc, images) {
      const art = document.createElement('article');
      art.className = 'card dynamic-card';
      art.dataset.category = category;
      art.dataset.projectId = id;
      const thumb = document.createElement('img');
      thumb.className = 'thumb';
      thumb.loading = 'lazy';
      thumb.alt = `${title} thumbnail`;
      thumb.src = thumbSrc;
      const cc = document.createElement('div'); cc.className = 'card-content';
      const h3 = document.createElement('h3'); h3.textContent = title;
      const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = metaText;
      cc.appendChild(h3); cc.appendChild(meta);
      const vb = document.createElement('div'); vb.className = 'view-btn';
      const btn = document.createElement('button'); btn.className = 'btn'; btn.dataset.action = 'open'; btn.dataset.project = id; btn.textContent = 'View Work';
      vb.appendChild(btn);
      const s = document.createElement('script'); s.type = 'application/json'; s.className = 'project-data';
      s.textContent = JSON.stringify({ title, images });
      art.appendChild(thumb); art.appendChild(cc); art.appendChild(vb); art.appendChild(s);
      return art;
    }

    function onOpenBtnClick(e) {
      const id = e.currentTarget.dataset.project;
      if (id === 'uploads') {
        const custom = getCustomImages();
        if (custom.length === 0) return alert('No uploads yet.');
        galleryImages = custom.slice();
        currentProject = { title: 'Uploads' };
        currentIndex = 0;
        modalTitle.textContent = 'Uploads';
        modalSub.textContent = `${galleryImages.length} images`;
        renderSlides(galleryImages);
        showModal();
        return;
      }
      openProject(id, 0);
    }

    /* ---------- Modal and gallery logic ---------- */
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalSub = document.getElementById('modalSub');
    const slidesRoot = document.getElementById('slidesRoot');
    const modalCaption = document.getElementById('modalCaption');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadAll = document.getElementById('downloadAll');
    let currentProject = null;
    let currentIndex = 0;
    let galleryImages = [];
    let lastFocusedEl = null;

    const projectImages = {
      'p1': [
        { src: 'img1.jpg', caption: 'Project 1 Image 1' },
        { src: 'img6.jpg', caption: 'Project 1 Image 2' },
        { src: 'img11.jpg', caption: 'Project 1 Image 3' },
        { src: 'img14.jpg', caption: 'Project 1 Image 4' },
        { src: 'img56.jpg', caption: 'Project 1 Image 5' }
      ],
      'p2': [
        { src: 'img7.jpg', caption: 'Project 2 Image 1' },
        { src: 'img55.jpg', caption: 'Project 2 Image 2' },
        { src: 'img49.jpg', caption: 'Project 2 Image 3' },
        { src: 'img48.jpg', caption: 'Project 2 Image 4' },
        { src: 'img40.jpg', caption: 'Project 2 Image 5' }
      ],
      'p3': [
        { src: 'img12.jpg', caption: 'Project 3 Image 1' },
        { src: 'img32.jpg', caption: 'Project 3 Image 2' },
        { src: 'img51.jpg', caption: 'Project 3 Image 3' },
        { src: 'img53.jpg', caption: 'Project 3 Image 4' },
        { src: 'img33.jpg', caption: 'Project 3 Image 5' }
      ],
      'p4': [
        { src: 'img16.jpg', caption: 'Project 4 Image 1' },
        { src: 'img17.jpg', caption: 'Project 4 Image 2' },
        { src: 'img3.jpg', caption: 'Project 4 Image 3' },
        { src: 'img19.jpg', caption: 'Project 4 Image 4' },
        { src: 'img20.jpg', caption: 'Project 4 Image 5' }
      ],
      'p5': [
        { src: 'img21.jpg', caption: 'Project 5 Image 1' },
        { src: 'img34.jpg', caption: 'Project 5 Image 2' },
        { src: 'img23.jpg', caption: 'Project 5 Image 3' },
        { src: 'img24.jpg', caption: 'Project 5 Image 4' },
        { src: 'img25.jpg', caption: 'Project 5 Image 5' }
      ],
      'p6': [
        { src: 'img58.jpg', caption: 'Project 6 Image 1' },
        { src: 'img60.jpg', caption: 'Project 6 Image 2' },
        { src: 'img57.jpg', caption: 'Project 6 Image 3' },
        { src: 'img58.jpg', caption: 'Project 6 Image 4' },
        { src: 'img60.jpg', caption: 'Project 6 Image 5' }
      ],
      'p7': [
        { src: 'img50.jpg', caption: 'Project 7 Image 1' },
        { src: 'img53.jpg', caption: 'Project 7 Image 2' },
        { src: 'img55.jpg', caption: 'Project 7 Image 3' },
        { src: 'img41.jpg', caption: 'Project 7 Image 4' },
        { src: 'img53.jpg', caption: 'Project 7 Image 5' }
      ],
      'p8': [
        { src: 'img8.jpg', caption: 'Project 8 Image 1' },
        { src: 'img63.jpg', caption: 'Project 8 Image 2' },
        { src: 'img62.jpg', caption: 'Project 8 Image 3' },
        { src: 'img64.jpeg', caption: 'Project 8 Image 4' },
        { src: 'img65.webp', caption: 'Project 8 Image 5' }
      ],
      'p9': [
        { src: 'img66.jpg', caption: 'Project 9 Image 1' },
        { src: 'img67.webp', caption: 'Project 9 Image 2' },
        { src: 'img68.webp', caption: 'Project 9 Image 3' },
        { src: 'img69.webp', caption: 'Project 9 Image 4' },
        { src: 'img70.webp', caption: 'Project 9 Image 5' }
      ],
      'p10': [
        { src: 'img72.jpeg', caption: 'Project 10 Image 1' },
        { src: 'img73.jpg', caption: 'Project 10 Image 2' },
        { src: 'img74.jpg', caption: 'Project 10 Image 3' },
        { src: 'img75.webp', caption: 'Project 10 Image 4' },
        { src: 'img76.jpg', caption: 'Project 10 Image 5' }
      ]
    };

    function buildProjectsMap() {
      const map = {};
      document.querySelectorAll('#projectGrid .card.dynamic-card').forEach(card => {
        const id = card.dataset.projectId;
        const json = card.querySelector('.project-data').textContent.trim();
        try { map[id] = JSON.parse(json); } catch(e) { map[id] = { title: 'Untitled', images: [] }; }
      });
      return map;
    }

    function openProject(id, startIndex = 0) {
      const projectsMap = buildProjectsMap();
      const p = projectsMap[id];
      if (!p) return;
      currentProject = p;
      currentIndex = startIndex;
      galleryImages = (p.images || []).slice();
      modalTitle.textContent = p.title || 'Project';
      modalSub.textContent = `${galleryImages.length} images`;
      renderSlides(galleryImages);
      showModal();
    }

    function openAllWorks() {
      const custom = getCustomImages();
      galleryImages = [];
      if (custom.length) {
        galleryImages = galleryImages.concat(custom.map((c, idx) => ({ src: c.src, caption: c.caption || `Upload ${idx + 1}` })));
      }
      for (let i = 1; i <= 60; i++) {
        galleryImages.push({ src: `img${i}.jpg`, caption: `Image ${i}` });
      }
      if (galleryImages.length === 0) return;
      currentProject = { title: 'All Works' };
      currentIndex = 0;
      modalTitle.textContent = 'All Works';
      modalSub.textContent = `${galleryImages.length} images`;
      renderSlides(galleryImages);
      showModal();
    }

    function renderSlides(images = []) {
      slidesRoot.innerHTML = '';
      images.forEach((img, i) => {
        const s = document.createElement('div');
        s.className = 'slide';
        s.dataset.index = i;
        const im = document.createElement('img');
        im.loading = 'lazy';
        im.alt = img.caption || `Image ${i + 1}`;
        im.src = img.src;
        s.appendChild(im);
        slidesRoot.appendChild(s);
      });
      showSlide(currentIndex);
    }

    function showSlide(i) {
      const slides = slidesRoot.querySelectorAll('.slide');
      if (slides.length === 0) return;
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      currentIndex = i;
      slides.forEach(s => s.classList.remove('visible'));
      const active = slidesRoot.querySelector(`.slide[data-index='${i}']`);
      if (active) {
        active.classList.add('visible');
        const img = active.querySelector('img');
        const caption = (galleryImages[i] && galleryImages[i].caption) || '';
        modalCaption.textContent = caption;
        downloadBtn.onclick = () => downloadImage(img.src);
        downloadAll.href = galleryImages[0] && galleryImages[0].src || '#';
      }
    }

    function showModal() {
      lastFocusedEl = document.activeElement;
      modalBackdrop.style.display = 'flex';
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeModalBtn.focus();
      document.addEventListener('keydown', handleKeydown);
      trapFocus(modalBackdrop);
    }

    function closeModal() {
      modalBackdrop.style.display = 'none';
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    function handleKeydown(e) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    }

    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    closeModalBtn.addEventListener('click', closeModal);
    document.getElementById('viewAll').addEventListener('click', openAllWorks);

    function downloadImage(url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = url.split('/').pop().split('?')[0] || 'image.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    function trapFocus(container) {
      const focusable = container.querySelectorAll('a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      function handle(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
      }
      container.addEventListener('keydown', handle);
      container._removeTrap = () => container.removeEventListener('keydown', handle);
    }

    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });

    (function addSwipe(el) {
      let startX = 0, startY = 0, threshold = 60;
      el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; });
      el.addEventListener('touchend', e => {
        const distX = (e.changedTouches[0].clientX - startX);
        const distY = (e.changedTouches[0].clientY - startY);
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
          if (distX > 0) showSlide(currentIndex - 1);
          else showSlide(currentIndex + 1);
        }
      });
    })(slidesRoot);

    document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('#projectGrid .card').forEach(card => {
        if (f === 'all' || card.dataset.category === f) card.style.display = '';
        else card.style.display = 'none';
      });
    }));

    /* ---------- Contact Modal Logic ---------- */
    const contactToggle = document.getElementById('contactToggle');
    const contactModalBackdrop = document.getElementById('contactModalBackdrop');
    const closeContactModal = document.getElementById('closeContactModal');

    function showContactModal() {
      contactModalBackdrop.style.display = 'flex';
      contactModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeContactModal.focus();
      document.addEventListener('keydown', handleContactKeydown);
      trapFocus(contactModalBackdrop);
    }

    function closeContactModalFunc() {
      contactModalBackdrop.style.display = 'none';
      contactModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleContactKeydown);
      contactToggle.focus();
    }

    function handleContactKeydown(e) {
      if (e.key === 'Escape') closeContactModalFunc();
    }

    contactToggle.addEventListener('click', showContactModal);
    closeContactModal.addEventListener('click', closeContactModalFunc);
    contactModalBackdrop.addEventListener('click', (e) => {
      if (e.target === contactModalBackdrop) closeContactModalFunc();
    });

    document.getElementById('bookBtn').addEventListener('click', () => {
      window.open('https://wa.me/234XXXXXXXXXX?text=Hi%20I%20want%20to%20book%20a%20shoot', '_blank');
    });

    const logoBox = document.getElementById('logoBox');
    const adminPanel = document.getElementById('adminPanel');
    const imgUpload = document.getElementById('imgUpload');
    const adminImages = document.getElementById('adminImages');
    const clearUploads = document.getElementById('clearUploads');

    logoBox.addEventListener('dblclick', () => {
      const isShown = adminPanel.style.display === 'block';
      adminPanel.style.display = isShown ? 'none' : 'block';
      adminPanel.setAttribute('aria-hidden', isShown ? 'true' : 'false');
      renderAdminThumbnails();
    });

    imgUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const arr = getCustomImages();
        if (e.target.result.length > 1024 * 1024 * 4) {
          if (!confirm('Image is large and may fill localStorage quickly. Continue?')) return;
        }
        arr.push({ src: e.target.result, caption: `Upload ${arr.length + 1}` });
        setCustomImages(arr);
        renderAdminThumbnails();
        renderProjectCards();
      };
      reader.readAsDataURL(file);
      this.value = '';
    });

    function renderAdminThumbnails() {
      adminImages.innerHTML = '';
      const arr = getCustomImages();
      arr.forEach((item, idx) => {
        const im = document.createElement('img');
        im.src = item.src;
        im.title = 'Click to delete';
        im.addEventListener('click', () => { if (confirm('Delete this upload?')) { deleteUpload(idx); } });
        adminImages.appendChild(im);
      });
    }

    function deleteUpload(index) {
      const arr = getCustomImages();
      arr.splice(index, 1);
      setCustomImages(arr);
      renderAdminThumbnails();
      renderProjectCards();
    }

    clearUploads.addEventListener('click', () => {
      if (confirm('Remove all uploaded images from localStorage?')) {
        localStorage.removeItem(LS_KEY);
        renderAdminThumbnails();
        renderProjectCards();
      }
    });

    const consentBar = document.getElementById('consentBar');
    const acceptBtn = document.getElementById('acceptConsent');
    const declineBtn = document.getElementById('declineConsent');
    if (localStorage.getItem('portfolio_consent') === 'accepted') consentBar.style.display = 'none';
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('portfolio_consent', 'accepted');
      consentBar.style.display = 'none';
    });
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('portfolio_consent', 'declined');
      consentBar.style.display = 'none';
    });

    function attachPlaceholderClicks() {
      document.querySelectorAll('#projectGrid .card.placeholder').forEach(card => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        const id = card.dataset.projectId;
        const images = projectImages[id] || [{ src: img.src, caption: img.alt || '' }];
        card.onclick = null;
        card.addEventListener('click', function(e) {
          if (e.target.tagName === 'BUTTON') return; // let button handler take care
          galleryImages = images;
          currentProject = { title: title };
          currentIndex = 0;
          modalTitle.textContent = title;
          modalSub.textContent = `${galleryImages.length} images`;
          renderSlides(galleryImages);
          showModal();
        });
      });
    }

    function renderInitial() {
      renderProjectCards();
      attachPlaceholderClicks();
      document.getElementById('year').textContent = new Date().getFullYear();
      document.getElementById('whatsappLink').href = 'https://wa.me/YOURPHONENUMBER';
      document.getElementById('instaLink').href = 'https://instagram.com/YOURHANDLE';
      document.getElementById('twitterLink').href = 'https://x.com/YOURHANDLE';
      document.getElementById('emailLink').href = 'mailto:hello@alexrowan.example';
    }

    renderInitial();
  