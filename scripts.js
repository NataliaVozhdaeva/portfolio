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
  { data: 'cinemaddict', src: './assets/img/cinemaddict.png' },
  { data: 'portfolio', src: './assets/img/screen2.png' },
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

  if (el.src == './assets/img/screen2.png') {
    const expBtnOver = document.createElement('img');
    expBtnOver.classList.add('scaled-img');

    if (window.innerWidth < 570) {
      expBtnOver.setAttribute('src', './assets/img/mobile-screen.png');
    } else if (window.innerWidth < 830) {
      expBtnOver.setAttribute('src', './assets/img/small.png');
    } else {
      expBtnOver.setAttribute('src', './assets/img/screen2.png');
    }

    expBtn.style.visibility = 'hidden';
    expBtn.classList.add('scaled');
    expRow.append(expBtnOver);
  }
  expRow.append(expBtn);
});

//skills opacity
const skills = document.querySelector('#skills');
const skillsContainer = document.querySelector('.skills-wrapper');
const scaledImg = document.querySelector('.scaled-img');
const scaledThumb = experience.querySelector('.scaled');

// Направляем transform-origin точно на центр thumbnail (пока scale=1, трансформаций нет)
if (scaledImg && scaledThumb) {
  const imgRect = scaledImg.getBoundingClientRect();
  const thumbRect = scaledThumb.getBoundingClientRect();
  scaledImg.style.transformOrigin = `${thumbRect.left + thumbRect.width / 2 - imgRect.left}px ${thumbRect.top + thumbRect.height / 2 - imgRect.top}px`;
}

let computedStyleForSkills = getComputedStyle(skills);
let currentOpacity = computedStyleForSkills.opacity;

// Позиционно-зависимая анимация: scale вычисляется из scrollY, а не инкрементально
const MIN_SCALE = 0.2;
const vh = document.documentElement.clientHeight;
const expAbsTop = window.scrollY + experience.getBoundingClientRect().top;
const ANIM_START_Y = expAbsTop - vh * 0.5;
const ANIM_DURATION = vh * 0.8;
const ANIM_END_Y = ANIM_START_Y + ANIM_DURATION;

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

// Применяем корректное состояние сразу при загрузке (в т.ч. при обновлении страницы)
let scale = computeScale(window.scrollY);
applyScaleState(scale);
if (scale <= MIN_SCALE) animDone = true;

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

  if (lastScrollTop < top) {
    if (skillsPosition.top - windowPosition.top < 10) {
      currentOpacity -= 0.02;
      skills.style.opacity = currentOpacity;
      skills.classList.add('fixed');

      if (currentOpacity < 0 || skillsPosition.bottom - windowPosition.top < 750) {
        currentOpacity = 0;
        skills.classList.remove('fixed');
      }
    }
  } else {
    if (skillsPosition.bottom - windowPosition.top > 630) {
      currentOpacity += 0.02;
      skills.style.opacity = currentOpacity;
      skills.classList.add('fixed');

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

navList.querySelectorAll('.navigation-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
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
const modalButtons = document.querySelectorAll('.js-open-modal');
const overlay = document.querySelector('#overlay-modal');
const closeButtons = document.querySelectorAll('.js-modal-close');

modalButtons.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    let modalId = this.getAttribute('data-modal');
    let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

    modalElem.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('.body').classList.add('stop-scroll');
  });
});

closeButtons.forEach(function (item) {
  item.addEventListener('click', function () {
    let parentModal = this.closest('.modal');
    parentModal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.body').classList.remove('stop-scroll');
  });
});
