// Menjalankan script setelah seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', function () {

    // --- LOGIKA BERSAMA (Menu & Modal) ---
    function setupCommonLogic() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const kasButtonHeader = document.getElementById('kas-button-header');
        const kasModal = document.getElementById('kas-modal');
        const closeModalButton = document.getElementById('close-modal');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });
        }
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        if (kasButtonHeader && kasModal) {
            kasButtonHeader.addEventListener('click', (e) => {
                e.preventDefault();
                kasModal.classList.remove('hidden');
                if (mobileMenu) mobileMenu.classList.add('hidden');
            });
        }
        if (closeModalButton && kasModal) {
            closeModalButton.addEventListener('click', () => kasModal.classList.add('hidden'));
        }
        if (kasModal) {
            kasModal.addEventListener('click', (e) => {
                if (e.target === kasModal) kasModal.classList.add('hidden');
            });
        }
    }

    // --- LOGIKA KHUSUS HALAMAN BLOG ---
    
    // ** DIPERBARUI: Daftar gambar header untuk 4 waktu **
    const timeBasedImages = {
        pagi: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop',
        siang: 'https://images.unsplash.com/photo-1559415595-87f7a7364494?q=80&w=1974&auto=format&fit=crop',
        sore: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
        malam: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop'
    };

    // ** DIPERBARUI: Fungsi untuk mendapatkan gambar berdasarkan 4 waktu **
    function getHeaderImageByTime() {
        const currentHour = new Date().getHours(); // Dapatkan jam saat ini (0-23)

        // Pagi (05:00 - 10:59)
        if (currentHour >= 5 && currentHour <= 10) {
            return timeBasedImages.pagi;
        }
        // Siang (11:00 - 14:59)
        if (currentHour >= 11 && currentHour <= 14) {
            return timeBasedImages.siang;
        }
        // Sore (15:00 - 17:59)
        if (currentHour >= 15 && currentHour <= 17) {
            return timeBasedImages.sore;
        }
        // Malam (18:00 - 04:59) - semua waktu selain yang di atas
        return timeBasedImages.malam;
    }

    const allPosts = [
        { id: 'post-1', title: 'Mendesain UI Aplikasi Mobile', imageUrl: 'https://placehold.co/400x400/7c3aed/ffffff?text=UI/UX', url: '#' },
        { id: 'post-2', title: 'Fotografi Alam Liar', imageUrl: 'https://placehold.co/400x400/16a34a/ffffff?text=Photo', url: '#' },
        { id: 'post-3', title: 'Proyek Terbaru: Website Toko Online', imageUrl: 'https://placehold.co/400x400/db2777/ffffff?text=Web', url: '#' },
        { id: 'post-4', title: 'Media sosial dan saweria', imageUrl: '../foto/Untitled.png', url: '#' },
    ];
    const pageHeader = document.getElementById('page-header');
    const postsGridContainer = document.getElementById('blog-posts-grid');

    function renderPosts(posts) {
        if (!postsGridContainer) return;
        postsGridContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('a');
            postCard.href = post.url;
            postCard.className = 'group block bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow';
            postCard.innerHTML = `
                <div class="relative"><img src="${post.imageUrl}" alt="${post.title}" class="w-full h-32 object-cover"><div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div></div>
                <div class="p-3"><h3 class="font-semibold text-gray-800 text-sm">${post.title}</h3></div>
            `;
            postsGridContainer.appendChild(postCard);
        });
    }

    function initBlogPage() {
        if (!pageHeader) return;
        // Mengatur gambar header secara dinamis
        const dynamicImageUrl = getHeaderImageByTime();
        pageHeader.style.backgroundImage = `url('${dynamicImageUrl}')`;
        
        renderPosts(allPosts);
    }
    
    // --- INISIALISASI ---
    setupCommonLogic();
    initBlogPage();
});
