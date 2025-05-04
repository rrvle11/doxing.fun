const profileDisplay = document.getElementById('profile-display');
const profilePic = document.getElementById('profile-pic');
const profileDesc = document.getElementById('profile-desc');

const fontFace = new FontFace('FreeSerif', 'url(../fonts/FreeSerif-YO4a.woff)');
fontFace.load().then(function(loadedFace) {
  document.fonts.add(loadedFace);
  profileDesc.style.fontFamily = 'FreeSerif, serif';
}).catch(function(error) {
  console.error('Font loading failed:', error);
});

const profiles = {
  cute: {
    img: 'images/cute.jpeg',
    desc: 'but adorable',
  },
  shy: {
    img: 'images/shy.jpeg',
    desc: 'dodging taxes',
  },
  motori: {
    img: 'images/motori.jpg',
    desc: 'SLEEPS WITH ONE EYE OPEN AND THREE PLANS READY',
  },
  hardline: {
    img: 'images/hardline.jpg',
    desc: 'OWNER @ NYTRIX',
  },
  romanc3: {
    img: 'images/romanc3.jpg',
    desc: 'could fall in love with a discord ai ',
  },
  y6t: {
    img: 'images/y6t.jpg',
    desc: 'schizophrenic loser',
  }
};

Object.values(profiles).forEach(profile => {
  const img = new Image();
  img.src = profile.img;
});

let currentProfile = null;

const hardlineLinks = document.querySelector('.hardline-links');
const motoriLinks = document.querySelector('.motori-links');

document.querySelectorAll('.profile-name').forEach(nameEl => {
  nameEl.addEventListener('click', (e) => {
    e.stopPropagation();
    const key = nameEl.dataset.name;
    if (currentProfile === key) {
      profileDisplay.style.display = 'none';
      profilePic.src = '';
      profileDesc.textContent = '';
      currentProfile = null;
      hardlineLinks.style.display = 'none';
      motoriLinks.style.display = 'none';
    } else {
      const profile = profiles[key];
      if (profile) {
        profilePic.src = profile.img;
        profileDesc.textContent = profile.desc;
        profilePic.alt = `${key} profile picture`;
        profileDisplay.style.display = 'flex';
        currentProfile = key;
        hardlineLinks.style.display = key === 'hardline' ? 'flex' : 'none';
        motoriLinks.style.display = key === 'motori' ? 'flex' : 'none';
      }
    }
  });
});
