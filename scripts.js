//experience animation
const experience = document.querySelector('.experience');
const projecImgs = [
  { data: 'minesweeper', src: './assets/img/minesweeper.png' },
  { data: 'trainer', src: './assets/img/css-train.png' },
  { data: 'shelter', src: './assets/img/shelter.png' },
  { data: 'plants', src: './assets/img/plants.png' },
  { data: 'keyboard', src: './assets/img/keyboard.png' },
  { data: 'cinemaddict', src: './assets/img/cinemaddict.png' },
  { data: 'travel', src: './assets/img/travel.png' },
  { data: 'portfolio', src: './assets/img/screen2.png' },
  { data: 'design', src: './assets/img/design.png' },
  { data: 'bikes', src: './assets/img/bikes.png' },
  { data: 'git-search', src: './assets/img/git-search.png' },
  { data: 'comments-form', src: './assets/img/comments-form.png' },
  { data: 'elite-fire', src: './assets/img/elite-fire.png' },
  { data: 'levelup', src: './assets/img/levelup.png' },
  { data: 'watchStore', src: './assets/img/watchStore.jpg' },
  { data: 'JD', src: './assets/img/JD.png' },
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

let computedStyleForSkills = getComputedStyle(skills);
let currentOpacity = computedStyleForSkills.opacity;

let scale = 1;
let lastScrollTop = 0;

document.addEventListener('scroll', function () {
  let skillsPosition = {
      top: window.scrollY + skillsContainer.getBoundingClientRect().top,
      bottom: window.scrollY + skillsContainer.getBoundingClientRect().bottom,
    },
    windowPosition = {
      top: window.scrollY,
      bottom: window.scrollY + document.documentElement.clientHeight,
    },
    experiencePosition = {
      top: window.scrollY + experience.getBoundingClientRect().top,
      bottom: window.scrollY + experience.getBoundingClientRect().bottom,
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

    if (experiencePosition.top - windowPosition.top < 500) {
      scale -= 0.04;
      scaledImg.style.transform = `scale(${scale})`;
      scaledImg.style.borderRadius = '15%';
      if (scale == 0.2 || scale < 0.2) {
        experience.querySelector('.scaled').style.visibility = '';
        scaledImg.classList.add('non-display');
      }
    }
  } else {
    if (skillsPosition.bottom - windowPosition.top > 630) {
      currentOpacity += 0.02;
      skills.style.opacity = currentOpacity;
      skills.classList.add('fixed');
      scale = 1;
      scaledImg.style.transform = `scale(${scale})`;
      scaledImg.style.borderRadius = '0';

      if (currentOpacity > 1 || skillsPosition.top - windowPosition.top > 0) {
        currentOpacity = 1;
        skills.classList.remove('fixed');
        scaledImg.classList.remove('non-display');
      }
    }
  }

  lastScrollTop = top;
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
