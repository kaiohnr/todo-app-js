const btnChangeTheme = document.querySelector('.theme-btn');

(function () {
  if (localStorage.getItem('theme')) {
    btnChangeTheme.src = './images/icon-sun.svg';
    document.body.classList.add('dark');
  }
})();

btnChangeTheme.addEventListener('click', function () {
  if (btnChangeTheme.getAttribute('src') == './images/icon-sun.svg') {
    document.body.classList.toggle('dark');
    btnChangeTheme.src = './images/icon-moon.svg';
    localStorage.removeItem('theme');
  } else {
    document.body.classList.toggle('dark');
    btnChangeTheme.src = './images/icon-sun.svg';
    localStorage.setItem('theme', 'dark');
  }
});
