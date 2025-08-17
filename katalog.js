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

    // --- LOGIKA KHUSUS HALAMAN KATALOG ---

    // ** DIPERBARUI: Daftar gambar header untuk 4 waktu **
    const timeBasedImages = {
        pagi: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop',
        siang: 'https://images.unsplash.com/photo-1559415595-87f7a7364494?q=80&w=1974&auto=format&fit=crop',
        sore: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
        malam: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop'
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

    const allProducts = [
        { id: 'template-autocad', name: 'Dynamic Autocad', category: 'Software', imageUrl: 'https://placehold.co/400x300/16a34a/ffffff?text=Dinamic block', downloadUrl: 'https://drive.google.com/drive/folders/1FE0lsZ1KkGZOeFnYfiHq6JohJMlj8McC?usp=drive_link' },
        { id: 'template-canva', name: 'Software DPIB', category: 'Template', imageUrl: 'https://placehold.co/400x300/7c3aed/ffffff?text=Software+DPIB', downloadUrl: 'https://drive.google.com/drive/folders/1EzyW0m76I6Kfha9wlrRgU1Ix3ZTuFzwv?usp=drive_link' },
    ];
    const pageHeader = document.getElementById('page-header');
    const searchInput = document.getElementById('search-input');
    const horizontalListContainer = document.getElementById('horizontal-product-list');
    const verticalListContainer = document.getElementById('vertical-product-list');
    const horizontalSection = document.getElementById('horizontal-section');
    const verticalSection = document.getElementById('vertical-section');

    function renderHorizontalProducts(products) {
        if (!horizontalListContainer) return;
        horizontalListContainer.innerHTML = '';
        products.slice(0, 3).forEach(product => {
            const productCard = document.createElement('a');
            productCard.href = product.downloadUrl;
            productCard.className = 'flex-shrink-0 w-40 bg-white rounded-xl shadow p-3 flex flex-col hover:shadow-lg transition-shadow';
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-24 object-cover rounded-lg mb-3">
                <div class="flex-grow flex flex-col justify-center text-center">
                    <h3 class="font-bold text-gray-800 text-sm">${product.name}</h3>
                </div>
                <div class="mt-3 w-full bg-purple-200 text-purple-800 font-semibold py-2 px-4 rounded-lg text-sm text-center">
                    Unduh
                </div>
            `;
            horizontalListContainer.appendChild(productCard);
        });
    }

    function renderVerticalProducts(products) {
        if (!verticalListContainer) return;
        verticalListContainer.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('div');
            productRow.className = 'bg-white rounded-xl shadow p-3 flex items-center space-x-4';
            productRow.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg flex-shrink-0">
                <div class="flex-grow">
                    <h3 class="font-semibold text-gray-800">${product.name}</h3>
                    <p class="text-xs text-gray-500">${product.category}</p>
                </div>
                <a href="${product.downloadUrl}" class="bg-purple-200 text-purple-800 font-semibold py-2 px-5 rounded-lg text-sm hover:bg-purple-300 transition-colors">
                    Unduh
                </a>
            `;
            verticalListContainer.appendChild(productRow);
        });
    }
    
    function renderAllProducts(products) {
        if (!horizontalSection || !verticalSection) return;
        if (products.length === 0) {
            horizontalSection.classList.add('hidden');
            verticalListContainer.innerHTML = `<p class="text-center text-gray-500 py-8">File tidak ditemukan.</p>`;
            verticalSection.classList.remove('hidden');
        } else {
            horizontalSection.classList.remove('hidden');
            verticalSection.classList.remove('hidden');
            renderHorizontalProducts(products);
            renderVerticalProducts(products);
        }
    }

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        renderAllProducts(filteredProducts);
    }

    function initKatalogPage() {
        if (!pageHeader) return;
        // Mengatur gambar header secara dinamis
        const dynamicImageUrl = getHeaderImageByTime();
        pageHeader.style.backgroundImage = `url('${dynamicImageUrl}')`;
        
        searchInput.addEventListener('input', handleSearch);
        renderAllProducts(allProducts);

        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > pageHeader.offsetHeight) {
                pageHeader.classList.add('header-hidden');
            } else {
                pageHeader.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // --- INISIALISASI ---
    setupCommonLogic();
    initKatalogPage();
});
