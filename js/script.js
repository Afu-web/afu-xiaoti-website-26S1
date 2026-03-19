// ====== Configurations & Data ======

const galleryData = {
    afu: [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'
    ],
    xiaoti: [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpeg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg'
    ],
    photos: [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'
    ]
};

// ==========================================
// 攝影師名單區塊 (Photographer Data)
// 格式:  "資料夾名稱/照片檔名" : "攝影師名字"
// 若照片沒有填寫，燈箱就不會顯示攝影師欄位。
// ==========================================
const photographerMap = {
    "afu/1.jpg": "Halikoss",
    "afu/2.jpg": "Halikoss",
    "afu/3.jpg": "Halikoss",
    "afu/4.jpg": "Halikoss",
    "afu/5.jpg": "Halikoss",
    "afu/6.jpg": "Halikoss",
    "afu/7.jpg": "Halikoss",
    "afu/8.jpg": "Halikoss",
    "afu/9.jpg": "Halikoss",
    "xiaoti/1.jpg": "Sanu Keçisy",
    "xiaoti/2.jpg": "Sanu Keçisy",
    "xiaoti/3.jpg": "魚松",
    "xiaoti/4.jpg": "魚松",
    "xiaoti/5.jpg": "艾斯赤嵐",
    "xiaoti/6.jpg": "戀風",
    "xiaoti/7.jpg": "許尼",
    "xiaoti/8.jpg": "夢夜",
    "xiaoti/9.jpg": "晴雲",
    "xiaoti/10.jpg": "淚熐",
    "xiaoti/11.jpg": "晴雲",
    "xiaoti/12.jpg": "Shelby",
    "xiaoti/13.jpg": "Shelby",
    "xiaoti/14.jpg": "白喵",
    "xiaoti/15.jpg": "魚松",
    "xiaoti/16.jpg": "魚松",
    // 你可以在這裡繼續新增...
};

// Translations Dictionary (中英雙語設定)
const i18n = {
    "zh": {
        "toggle_lang": "English",

        "name_afu": "阿福 Afu",
        "desc_afu": "願望之光化作絢麗的映象<br>夢想與現實交織成永恆的旋律<br>🪡TAS兽化工作室",

        "name_xiaoti": "曉禔 XiaoTi",
        "desc_xiaoti": "🦊仙氣散逸 傳遞溫暖的白色狐狸🐾<br>🪡桃酥酥獸裝工作室",

        "name_photos": "攝影作品 Portfolio",
        "desc_photos": "捕捉光影的瞬間，凝結時間的碎片。",

        "tab_afu_gallery": "阿福<br>AFU",
        "tab_xiaoti_gallery": "曉禔<br>XiaoTi",
        "tab_photos_gallery": "攝影作品",

        "btn_fb_afu": "Facebook (Afu Huli)",
        "btn_fb_xiaoti": "Facebook (曉禔)",
        "btn_twitter": "Twitter (X)",

        "gallery_empty": "相簿建置中 📭"
    },
    "en": {
        "toggle_lang": "繁體中文",

        "name_afu": "Afu",
        "desc_afu": "The light of wishes transforms into brilliant reflections<br>dreams and reality weave an eternal melody<br>🪡TAS兽化工作室",

        "name_xiaoti": "XiaoTi",
        "desc_xiaoti": "🦊 An ethereal presence, a white fox delivering warmth 🐾<br>🪡桃酥酥獸裝工作室",

        "name_photos": "Photography",
        "desc_photos": "Capturing moments of light and shadow,<br>freezing fragments of time.",

        "tab_afu_gallery": "阿福<br>AFU",
        "tab_xiaoti_gallery": "曉禔<br>XiaoTi",
        "tab_photos_gallery": "Photography",

        "btn_fb_afu": "Facebook (Afu Huli)",
        "btn_fb_xiaoti": "Facebook (XiaoTi)",
        "btn_twitter": "Twitter (X)",

        "gallery_empty": "Gallery is empty 📭"
    }
};

// State
let currentLang = 'zh';
let currentTab = 'afu'; // 'afu', 'xiaoti', or 'photos'

// DOM Elements
const body = document.body;
const langToggle = document.getElementById('lang-toggle');
const avatarContainer = document.getElementById('avatar-container');
const avatarImg = document.getElementById('profile-avatar');
const navBtns = document.querySelectorAll('.nav-btn');
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// Fallback Demo Images
const placeholderImages = {
    afu: [],
    xiaoti: [],
    photos: []
};

// Init
function init() {
    langToggle.addEventListener('click', handleLangChange);

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => switchMode(e.target.dataset.tab));
    });

    // Lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Run initial renders (skip fade animation on load)
    updateUIContent(true);
    renderGallery();
}

function handleLangChange() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateUIContent();
    renderGallery(); // Re-render gallery to update "Empty" message if exist
}

function switchMode(newMode) {
    if (newMode === currentTab) return;
    currentTab = newMode;

    // Switch active button
    navBtns.forEach(btn => {
        if (btn.dataset.tab === currentTab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Change body theme class
    body.className = `theme-${currentTab} transition-theme`;

    updateUIContent();

    // Add fade out animation to gallery
    const gallerySection = document.querySelector('.gallery-section');
    gallerySection.classList.add('fade-out');

    setTimeout(() => {
        renderGallery();
        gallerySection.classList.remove('fade-out');
    }, 400); // 400ms matches CSS transition
}

function updateUIContent(skipAnim = false) {
    const t = i18n[currentLang];
    const elementsToUpdate = document.querySelectorAll('[data-i18n]');

    // Update avatar based on mode
    const expectedAvatarSrc = `images/${currentTab}/avatar.jpg`;

    const imgTest = new Image();
    imgTest.onload = () => {
        avatarImg.src = expectedAvatarSrc;
        avatarContainer.style.display = 'block';
    };
    imgTest.onerror = () => {
        // Hide avatar container if the specific mode has no avatar (like photography)
        if (currentTab === 'photos') {
            avatarContainer.style.display = 'none';
        } else {
            avatarImg.src = `images/demo_${currentTab}_avatar.webp`;
            avatarContainer.style.display = 'block';
        }
    };
    imgTest.src = expectedAvatarSrc;

    if (skipAnim) {
        elementsToUpdate.forEach(el => {
            const key = el.dataset.i18n;
            // Name and Desc uses currentTab prefix replacement dynamically
            if (key.startsWith('name_') || key.startsWith('desc_')) {
                const isName = el.classList.contains('profile-name');
                const actualKey = isName ? `name_${currentTab}` : `desc_${currentTab}`;
                el.innerHTML = t[actualKey];
            } else {
                el.innerHTML = t[key];
            }

            // Re-assign nav button labels cleanly
            if (el.classList.contains('nav-btn')) {
                el.innerHTML = t[key];
            }
        });
        return;
    }

    // Fade animation logic
    const profileSection = document.querySelector('.profile-section');
    profileSection.classList.add('fade-out');

    setTimeout(() => {
        elementsToUpdate.forEach(el => {
            const key = el.dataset.i18n;
            if (key.startsWith('name_') || key.startsWith('desc_')) {
                const isName = el.classList.contains('profile-name');
                const actualKey = isName ? `name_${currentTab}` : `desc_${currentTab}`;
                el.innerHTML = t[actualKey];
            } else {
                el.innerHTML = t[key];
            }
        });
        profileSection.classList.remove('fade-out');
    }, 400);
}

function renderGallery() {
    galleryGrid.innerHTML = '';

    let images = galleryData[currentTab] || [];
    let isDemo = false;

    // Check demo fallbacks
    if (images.length === 0 && placeholderImages[currentTab] && placeholderImages[currentTab].length > 0) {
        images = placeholderImages[currentTab];
        isDemo = true;
    }

    if (images.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'empty-gallery-msg';
        msg.innerHTML = i18n[currentLang]['gallery_empty'];
        galleryGrid.appendChild(msg);
        return;
    }

    images.forEach((filename, index) => {
        const folder = isDemo ? '' : currentTab + '/';
        const src = `images/${folder}${filename}`;

        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.style.animationDelay = `${index * 0.05}s`;

        const img = document.createElement('img');

        // Error handling for missing local files
        img.onerror = function () {
            this.onerror = null;
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" font-family="Arial" font-size="14" fill="%23888" text-anchor="middle" dominant-baseline="middle">Image Not Found</text></svg>';
        };

        img.src = src;
        img.alt = `Gallery ${currentTab}`;
        img.loading = 'lazy';

        div.onclick = () => openLightbox(img.src, `${currentTab}/${filename}`);
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

function openLightbox(src, relativePath) {
    lightboxImg.src = src;

    // Check for photographer credit
    const lightboxCredit = document.getElementById('lightbox-credit');
    if (photographerMap[relativePath]) {
        lightboxCredit.innerHTML = `Photography by: ${photographerMap[relativePath]}`;
        lightboxCredit.style.display = 'block';
    } else {
        lightboxCredit.style.display = 'none';
        lightboxCredit.innerHTML = '';
    }

    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

// Start
document.addEventListener('DOMContentLoaded', init);
