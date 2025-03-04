// Gallery data
const galleryImages = [
    { src: 'img/corte-criança.png', category: 'cortes', caption: 'Corte Moderno Masculino' },
    { src: 'images/cortes-2.jpg', category: 'cortes', caption: 'Corte Fade' },
    { src: 'images/coloracao-1.jpg', category: 'coloracao', caption: 'Loiro Platinado' },
    { src: 'images/coloracao-2.jpg', category: 'coloracao', caption: 'Coloração Fantasia' },
    { src: 'images/trancas-1.jpg', category: 'tranças', caption: 'Box Braids' },
    { src: 'images/trancas-2.jpg', category: 'tranças', caption: 'Tranças Nagô' },
    { src: 'images/dreads-1.jpg', category: 'dreads', caption: 'Dreads Naturais' },
    { src: 'images/dreads-2.jpg', category: 'dreads', caption: 'Manutenção Dreads' },
    { src: 'images/barba-1.jpg', category: 'barba', caption: 'Barba Modelada' },
    { src: 'images/barba-2.jpg', category: 'barba', caption: 'Barba Degradê' }
];

// Gallery initialization
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-content');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    let currentImageIndex = 0;
    let filteredImages = [...galleryImages];

    // Create gallery items
    function renderGallery(images) {
        galleryGrid.innerHTML = '';
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}">
                <div class="gallery-item-overlay">
                    <span>${image.caption}</span>
                </div>
            `;
            galleryItem.addEventListener('click', () => openModal(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter images
            filteredImages = filter === 'all' 
                ? galleryImages 
                : galleryImages.filter(img => img.category === filter);

            renderGallery(filteredImages);
        });
    });

    // Modal functions
    function openModal(index) {
        currentImageIndex = index;
        updateModalImage();
        modal.style.display = 'flex';
    }

    function updateModalImage() {
        const image = filteredImages[currentImageIndex];
        modalImg.src = image.src;
        modalCaption.textContent = image.caption;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateModalImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateModalImage();
    }

    // Modal event listeners
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Initial render
    renderGallery(galleryImages);
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Prevent scroll when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});
document.getElementById('appointment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `
📅 *Novo Agendamento Recebido*!

👤 *Nome:* ${name}
📞 *Telefone:* ${phone}
✂️ *Serviço:* ${service}
📆 *Data:* ${date}
🕒 *Horário:* ${time}
📝 *Observações:* ${message}
`;

    sendWhatsAppNotification(whatsappMessage);
});
function sendWhatsAppNotification(message) {
    const phoneNumber = '5583993265161'; // Exemplo: 55 + DDD + número -> 5511987654321
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank'); // Abre o link no WhatsApp Web ou App
}

// Time slots configuration
const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
];

// Populate time slots
function populateTimeSlots() {
    const timeSelect = document.getElementById('time');
    
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Initialize time slots when DOM is loaded
document.addEventListener('DOMContentLoaded', populateTimeSlots);
