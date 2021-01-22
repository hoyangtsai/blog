(function(document) {
  const sidenav = document.querySelector('#sidenav-open');

  sidenav.addEventListener('keyup', e => {
    if (e.code === 'Escape') {
      document.location.hash = '';
    }
  });

  const closenav = document.querySelector('#sidenav-close');
  const opennav = document.querySelector('#sidenav-button');

  sidenav.addEventListener('transitionend', e => {
    if (e.propertyName !== 'transform') {
      return;
    }

    const isOpen = document.location.hash === '#sidenav-open';

    isOpen
      ? closenav.focus()
      : opennav.focus();
  });
})(document);
