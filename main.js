alert("JS وصل شد ✅");
// ==========================================
// سیستم مدیریت تم (Theme Manager)
// ==========================================
const ThemeManager = {
  THEMES: {
    light: 'light',
    dark: 'dark'
  },
  STORAGE_KEY: 'selected-theme',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) || this.THEMES.light;
    this.setTheme(savedTheme);
    this.attachEventListeners();
  },

  setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // به‌روزرسانی دکمه تم
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === this.THEMES.dark ? '☀️' : '🌙';
      }
    }
  },

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === this.THEMES.dark ? this.THEMES.light : this.THEMES.dark;
    this.setTheme(newTheme);
  },

  attachEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
};

// ==========================================
// اسلایدر رویدادها (Event Slider)
// ==========================================
const EventSlider = {
  currentSlide: 0,
  slideInterval: null,
  SLIDE_DURATION: 5000, // 5 ثانیه

  slides: [
    {
      title: 'همایش ملی هوش مصنوعی و یادگیری ماشین',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800',
      date: '1404/02/15',
      type: 'همایش',
      badge: 'badge-primary'
    },
    {
      title: 'سخنرانی: آینده فناوری بلاکچین',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      date: '1404/01/28',
      type: 'سخنرانی',
      badge: 'badge-success'
    },
    {
      title: 'کارگاه عملی طراحی UX/UI',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      date: '1404/02/05',
      type: 'کارگاه',
      badge: 'badge-warning'
    },
    {
      title: 'کنفرانس امنیت سایبری',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      date: '1404/02/20',
      type: 'کنفرانس',
      badge: 'badge-danger'
    }
  ],

  init() {
    const sliderContainer = document.getElementById('event-slider');
    if (!sliderContainer) return;

    this.render();
    this.startAutoSlide();
    this.attachEventListeners();
  },

  render() {
    const sliderContainer = document.getElementById('event-slider');
    const slide = this.slides[this.currentSlide];

    sliderContainer.innerHTML = `
      <div class="slider-content">
        <img src="${slide.image}" alt="${slide.title}" class="slider-image">
        <div class="slider-overlay">
          <div class="slider-text">
            <span class="badge ${slide.badge}">${slide.type}</span>
            <h3 class="slider-title">${slide.title}</h3>
            <p class="slider-date">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ${slide.date}
            </p>
          </div>
        </div>
        <button class="slider-btn slider-btn-prev" onclick="EventSlider.prevSlide()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button class="slider-btn slider-btn-next" onclick="EventSlider.nextSlide()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="slider-indicators">
          ${this.slides.map((_, index) => 
            `<span class="slider-indicator ${index === this.currentSlide ? 'active' : ''}" onclick="EventSlider.goToSlide(${index})"></span>`
          ).join('')}
        </div>
      </div>
    `;
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.render();
    this.resetAutoSlide();
  },

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.render();
    this.resetAutoSlide();
  },

  goToSlide(index) {
    this.currentSlide = index;
    this.render();
    this.resetAutoSlide();
  },

  startAutoSlide() {
    this.slideInterval = setInterval(() => this.nextSlide(), this.SLIDE_DURATION);
  },

  resetAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.startAutoSlide();
  },

  attachEventListeners() {
    // رویدادها قبلاً با onclick اضافه شده‌اند
  }
};

// ==========================================
// شمارش معکوس (Countdown Timer)
// ==========================================
const CountdownTimer = {
  timers: [],

  init() {
    const countdownElements = document.querySelectorAll('[data-countdown]');
    
    countdownElements.forEach(element => {
      const targetDate = element.getAttribute('data-countdown');
      this.timers.push({ element, targetDate });
    });

    if (this.timers.length > 0) {
      this.startCountdown();
    }
  },

  startCountdown() {
    setInterval(() => {
      this.timers.forEach(timer => {
        this.updateCountdown(timer.element, timer.targetDate);
      });
    }, 1000);
  },

  updateCountdown(element, targetDate) {
    const now = new Date();
    const target = this.parseJalaliDate(targetDate);
    const diff = target - now;

    if (diff <= 0) {
      element.innerHTML = '<span class="countdown-finished">این رویداد برگزار شده است</span>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    element.innerHTML = `
      <div class="countdown-container">
        <div class="countdown-item">
          <span class="countdown-value">${this.padZero(days)}</span>
          <span class="countdown-label">روز</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-item">
          <span class="countdown-value">${this.padZero(hours)}</span>
          <span class="countdown-label">ساعت</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-item">
          <span class="countdown-value">${this.padZero(minutes)}</span>
          <span class="countdown-label">دقیقه</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-item">
          <span class="countdown-value">${this.padZero(seconds)}</span>
          <span class="countdown-label">ثانیه</span>
        </div>
      </div>
    `;
  },

  parseJalaliDate(jalaliDate) {
    // تبدیل تاریخ جلالی به میلادی (به صورت تقریبی برای نمایش)
    // فرمت: 1404/02/15 09:00
    const [datePart, timePart] = jalaliDate.split(' - ');
    const [year, month, day] = datePart.split('/').map(Number);
    const [hour, minute] = (timePart || '00:00').split(':').map(Number);

    // تبدیل تقریبی: 1404 شمسی ≈ 2025 میلادی
    const gregorianYear = year + 621;
    const gregorianMonth = month - 1; // ماه‌های جاوااسکریپت از 0 شروع می‌شوند
    
    return new Date(gregorianYear, gregorianMonth, day, hour, minute, 0);
  },

  padZero(num) {
    return num.toString().padStart(2, '0');
  }
};

// ==========================================
// مدیریت فرم نظرسنجی (Survey Form)
// ==========================================
const SurveyForm = {
  STORAGE_KEY: 'survey-data',
  ratings: {
    overall: 0,
    content: 0,
    organization: 0,
    speakers: 0,
    venue: 0
  },

  init() {
    const form = document.getElementById('survey-form');
    if (!form) return;

    this.attachRatingListeners();
    this.attachFormSubmitListener();
    this.loadSavedData();
  },

  attachRatingListeners() {
    const ratingContainers = document.querySelectorAll('.rating');
    
    ratingContainers.forEach(container => {
      const stars = container.querySelectorAll('.star');
      const ratingType = container.getAttribute('data-rating');
      
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.setRating(ratingType, index + 1, container);
        });

        star.addEventListener('mouseenter', () => {
          this.highlightStars(container, index + 1);
        });
      });

      container.addEventListener('mouseleave', () => {
        const currentRating = this.ratings[ratingType] || 0;
        this.highlightStars(container, currentRating);
      });
    });
  },

  setRating(type, rating, container) {
    this.ratings[type] = rating;
    this.highlightStars(container, rating);
    
    const label = container.querySelector('span:last-child');
    if (label) {
      label.textContent = `${rating} از 5`;
      label.style.color = '#2563eb';
    }
  },

  highlightStars(container, count) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < count) {
        star.classList.remove('empty');
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
        star.classList.add('empty');
      }
    });
  },

  attachFormSubmitListener() {
    const form = document.getElementById('survey-form');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('survey-email');
      const comment = document.getElementById('comments');
      const messageContainer = document.getElementById('form-message');

      // پاک کردن پیام‌های قبلی
      messageContainer.innerHTML = '';
      messageContainer.className = 'form-message';

      // اعتبارسنجی
      const errors = [];

      // بررسی ایمیل
      if (!email || !email.value.trim()) {
        errors.push('لطفاً ایمیل خود را وارد کنید');
      } else if (!this.isValidEmail(email.value)) {
        errors.push('فرمت ایمیل صحیح نیست');
      }

      // بررسی کامنت
      if (!comment || !comment.value.trim()) {
        errors.push('لطفاً نظر خود را وارد کنید');
      }

      // بررسی رتبه‌بندی‌ها
      if (!this.ratings.overall || this.ratings.overall === 0) {
        errors.push('لطفاً رضایت کلی را انتخاب کنید');
      }
      if (!this.ratings.content || this.ratings.content === 0) {
        errors.push('لطفاً کیفیت محتوا را ارزیابی کنید');
      }
      if (!this.ratings.organization || this.ratings.organization === 0) {
        errors.push('لطفاً سازماندهی را ارزیابی کنید');
      }
      if (!this.ratings.speakers || this.ratings.speakers === 0) {
        errors.push('لطفاً سخنرانان را ارزیابی کنید');
      }
      if (!this.ratings.venue || this.ratings.venue === 0) {
        errors.push('لطفاً محل برگزاری را ارزیابی کنید');
      }

      // نمایش خطاها یا موفقیت
      if (errors.length > 0) {
        messageContainer.className = 'form-message error';
        messageContainer.innerHTML = errors.map(error => `<p>• ${error}</p>`).join('');
      } else {
        // ذخیره در LocalStorage
        this.saveToLocalStorage(email.value, comment.value);
        
        messageContainer.className = 'form-message success';
        messageContainer.innerHTML = '<p>✓ نظر شما با موفقیت ارسال شد</p>';
        
        // پاک کردن فرم بعد از 2 ثانیه
        setTimeout(() => {
          form.reset();
          this.resetRatings();
          messageContainer.innerHTML = '';
        }, 2000);
      }
    });
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  saveToLocalStorage(email, comment) {
    const surveyData = {
      email: email,
      comment: comment,
      ratings: this.ratings,
      timestamp: new Date().toISOString()
    };

    // دریافت داده‌های قبلی
    const existingData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    
    // اضافه کردن داده جدید
    existingData.push(surveyData);
    
    // ذخیره
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
  },

  loadSavedData() {
    // نمایش آخرین نظرات ذخیره شده (اختیاری)
    const savedData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    console.log('نظرات ذخیره شده:', savedData);
  },

  resetRatings() {
    this.ratings = {
      overall: 0,
      content: 0,
      organization: 0,
      speakers: 0,
      venue: 0
    };

    const ratingContainers = document.querySelectorAll('.rating');
    ratingContainers.forEach(container => {
      this.highlightStars(container, 0);
      const label = container.querySelector('span:last-child');
      if (label) {
        label.textContent = 'انتخاب نشده';
        label.style.color = '#6b7280';
      }
    });
  }
};

// ==========================================
// راه‌اندازی اولیه
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  EventSlider.init();
  CountdownTimer.init();
  SurveyForm.init();
});
