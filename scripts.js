//experience animation
const experience = document.querySelector('.experience');
const projecImgs = [
  { data: 'threejs', src: './assets/img/threejs.jpg' },
  { data: 'pokemons', src: './assets/img/pokemons.png' },
  { data: 'minesweeper', src: './assets/img/minesweeper.png' },
  { data: 'trainer', src: './assets/img/css-train.png' },
  { data: 'shelter', src: './assets/img/shelter.png' },
  { data: 'plants', src: './assets/img/plants.png' },
  { data: 'keyboard', src: './assets/img/keyboard.png' },
  { data: 'portfolio', src: './assets/img/screen2.png' },
  { data: 'cinemaddict', src: './assets/img/cinemaddict.png' },
  // { data: 'travel', src: './assets/img/travel.png' },
  // { data: 'design', src: './assets/img/design.png' },
  // { data: 'bikes', src: './assets/img/bikes.png' },
  // { data: 'git-search', src: './assets/img/git-search.png' },
  // { data: 'comments-form', src: './assets/img/comments-form.png' },
  { data: 'elite-fire', src: './assets/img/elite-fire.png' },
  // { data: 'watchStore', src: './assets/img/watchStore.jpg' },
  // { data: 'JD', src: './assets/img/JD.png' },
  { data: 'beautySalon', src: './assets/img/beautySalon.jpg' },
  { data: 'crm', src: './assets/img/crm.jpg' },
];

function buildGrid() {
  document.querySelectorAll('.experience-row').forEach((row) => row.remove());

  projecImgs.forEach((el, i) => {
    if (window.innerWidth < 570) {
      expRow = document.createElement('div');
      expRow.classList.add('experience-row');
      experience.append(expRow);
    } else if (window.innerWidth < 830) {
      if (i % 3 == 0) {
        expRow = document.createElement('div');
        expRow.classList.add('experience-row');
        experience.append(expRow);
      }
    } else {
      if (i % 5 == 0) {
        expRow = document.createElement('div');
        expRow.classList.add('experience-row');
        experience.append(expRow);
      }
    }

    const expBtn = document.createElement('button');
    expBtn.classList.add('experience-thumbnail');
    expBtn.classList.add('js-open-modal');
    expBtn.setAttribute('data-modal', el.data);
    expBtn.style.backgroundImage = `url(${el.src})`;

    if (window.innerWidth < 830 && el.src == './assets/img/screen2.png') {
      expBtn.style.backgroundImage = `url('./assets/img/small.png')`;
    }

    if (window.innerWidth < 570 && el.src == './assets/img/screen2.png') {
      expBtn.style.backgroundImage = `url('./assets/img/mobile-screen.png')`;
    }

    if (el.src == './assets/img/screen2.png' && window.innerWidth >= 830) {
      const expBtnOver = document.createElement('img');
      expBtnOver.classList.add('scaled-img');
      expBtnOver.setAttribute('src', './assets/img/screen2.png');

      expBtn.style.visibility = 'hidden';
      expBtn.classList.add('scaled');
      expRow.append(expBtnOver);
    }
    expRow.append(expBtn);
  });
}

buildGrid();

//skills opacity
const skills = document.querySelector('#skills');
const skillsContainer = document.querySelector('.skills-wrapper');
let scaledImg, scaledThumb;
let vh, expAbsTop, ANIM_START_Y, ANIM_DURATION, ANIM_END_Y;

let computedStyleForSkills = getComputedStyle(skills);
let currentOpacity = computedStyleForSkills.opacity;

const aboutP = document.querySelector('.about p');
const MIN_SCALE = 0.2;

function initAnimation() {
  scaledImg = document.querySelector('.scaled-img');
  scaledThumb = experience.querySelector('.scaled');

  if (scaledImg && scaledThumb) {
    const imgRect = scaledImg.getBoundingClientRect();
    const thumbRect = scaledThumb.getBoundingClientRect();
    scaledImg.style.transformOrigin = `${thumbRect.left + thumbRect.width / 2 - imgRect.left}px ${thumbRect.top + thumbRect.height / 2 - imgRect.top}px`;
  }

  vh = document.documentElement.clientHeight;
  expAbsTop = window.scrollY + experience.getBoundingClientRect().top;
  ANIM_START_Y = expAbsTop - vh * 0.5;
  ANIM_DURATION = vh * 0.8;
  ANIM_END_Y = ANIM_START_Y + ANIM_DURATION;

  animDone = false;
  scale = computeScale(window.scrollY);
  applyScaleState(scale);
  if (scale <= MIN_SCALE) animDone = true;
}

function computeScale(scrollY) {
  if (scrollY <= ANIM_START_Y) return 1;
  if (scrollY >= ANIM_END_Y) return MIN_SCALE;
  return 1 - ((scrollY - ANIM_START_Y) / ANIM_DURATION) * (1 - MIN_SCALE);
}

function applyScaleState(s) {
  if (!scaledImg || !scaledThumb) return;
  if (s <= MIN_SCALE) {
    scaledImg.style.transform = `scale(${MIN_SCALE})`;
    scaledImg.style.borderRadius = '15%';
    scaledThumb.style.visibility = '';
    scaledImg.classList.add('non-display');
  } else {
    scaledImg.style.transform = `scale(${s})`;
    scaledImg.style.borderRadius = s < 1 ? '15%' : '0';
    scaledImg.classList.remove('non-display');
    scaledThumb.style.visibility = 'hidden';
  }
}

let animDone = false;
let scale = 1;

initAnimation();

let lastScrollTop = window.scrollY;

document.addEventListener('scroll', function () {
  let skillsPosition = {
      top: window.scrollY + skillsContainer.getBoundingClientRect().top,
      bottom: window.scrollY + skillsContainer.getBoundingClientRect().bottom,
    },
    windowPosition = {
      top: window.scrollY,
      bottom: window.scrollY + document.documentElement.clientHeight,
    };

  let top = window.scrollY;

  if (navJumping) { lastScrollTop = top; return; }
  const isMobile = window.innerWidth < 830;
  const aboutPBottom = aboutP ? aboutP.getBoundingClientRect().bottom : null;
  const fadeOutTrigger = isMobile
    ? aboutPBottom !== null && aboutPBottom <= windowPosition.bottom - windowPosition.top
    : skillsPosition.top - windowPosition.top < 10;
  const fadeInTrigger = isMobile
    ? aboutPBottom !== null && aboutPBottom > windowPosition.bottom - windowPosition.top
    : skillsPosition.bottom - windowPosition.top > 630;

  if (lastScrollTop < top) {
    if (fadeOutTrigger) {
      currentOpacity -= 0.02;
      skills.style.opacity = currentOpacity;
      if (!isMobile) skills.classList.add('fixed');

      if (currentOpacity < 0 || skillsPosition.bottom - windowPosition.top < 750) {
        currentOpacity = 0;
        skills.classList.remove('fixed');
      }
    }
  } else {
    if (fadeInTrigger) {
      currentOpacity += 0.02;
      skills.style.opacity = currentOpacity;
      if (!isMobile) skills.classList.add('fixed');

      if (currentOpacity > 1 || skillsPosition.top - windowPosition.top > 0) {
        currentOpacity = 1;
        skills.classList.remove('fixed');
      }
    }
  }

  if (!animDone) {
    scale = computeScale(top);
    applyScaleState(scale);
    if (scale <= MIN_SCALE) animDone = true;
  }

  lastScrollTop = top;
});

// burger menu
const burger = document.querySelector('.js-burger');
const navList = document.querySelector('.navigation-list');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
});

let navJumping = false;

navList.querySelectorAll('.navigation-link').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
    currentOpacity = 1;
    skills.style.opacity = 1;
    skills.classList.remove('fixed');
    navJumping = true;
    setTimeout(() => { navJumping = false; }, 800);
  });
});

// lang change
const langBtn = document.querySelector('.language-btn');
langBtn.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  popup.classList.add('show-popup');

  setTimeout(() => {
    popup.classList.remove('show-popup');
  }, 5000);
});

//modal window
const overlay = document.querySelector('#overlay-modal');
const closeButtons = document.querySelectorAll('.js-modal-close');

experience.addEventListener('click', function (e) {
  const btn = e.target.closest('.js-open-modal');
  if (!btn) return;
  e.preventDefault();

  let modalId = btn.getAttribute('data-modal');
  let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

  modalElem.classList.add('active');
  overlay.classList.add('active');
  document.querySelector('.body').classList.add('stop-scroll');
});

closeButtons.forEach(function (item) {
  item.addEventListener('click', function () {
    let parentModal = this.closest('.modal');
    parentModal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.body').classList.remove('stop-scroll');
  });
});

// пересчёт при пересечении брейкпоинта
let currentBreakpoint = window.innerWidth < 570 ? 'sm' : window.innerWidth < 830 ? 'md' : 'lg';
let resizeTimer;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newBreakpoint = window.innerWidth < 570 ? 'sm' : window.innerWidth < 830 ? 'md' : 'lg';
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      buildGrid();
      initAnimation();
    }
  }, 200);
});
