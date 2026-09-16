'use strict';

// Keep every link usable without JavaScript. Load the player only after a click.
(() => {
  document.querySelectorAll('img[data-fallback-image]').forEach(img => {
    const fallback = () => {
      if (!img.dataset.fallbackImage) return;
      const src = img.dataset.fallbackImage;
      delete img.dataset.fallbackImage;
      img.src = src;
    };
    img.addEventListener('error', fallback, { once: true });
    if (img.complete && !img.naturalWidth) fallback();
  });

  if (typeof HTMLDialogElement === 'undefined') return;
  const fr = document.documentElement.lang === 'fr';
  const dialog = document.createElement('dialog');
  dialog.className = 'terra-video-dialog';
  dialog.setAttribute('aria-labelledby', 'terra-video-dialog-title');

  const header = document.createElement('div');
  header.className = 'video-dialog-header';
  const heading = document.createElement('h2');
  heading.id = 'terra-video-dialog-title';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'video-dialog-close';
  close.textContent = '×';
  close.setAttribute('aria-label', fr ? 'Fermer la vidéo' : 'Close video');
  header.append(heading, close);

  const player = document.createElement('div');
  player.className = 'video-dialog-player';
  const footer = document.createElement('div');
  footer.className = 'video-dialog-footer';
  const external = document.createElement('a');
  external.target = '_blank';
  external.rel = 'noopener';
  external.textContent = fr ? 'Ouvrir sur YouTube ↗' : 'Open on YouTube ↗';
  const help = document.createElement('span');
  help.textContent = fr ? 'Si le lecteur est indisponible, utilisez le lien YouTube.' : 'If the player is unavailable, use the YouTube link.';
  footer.append(external, help);
  dialog.append(header, player, footer);
  document.body.append(dialog);

  let trigger = null;
  let previousOverflow = '';
  const cleanup = () => {
    player.replaceChildren();
    document.body.style.overflow = previousOverflow;
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  };
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', cleanup);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  document.querySelectorAll('a[data-video]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const id = link.dataset.video;
      if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
      event.preventDefault();
      trigger = link;
      previousOverflow = document.body.style.overflow;
      heading.textContent = link.dataset.videoTitle || 'Terra AI';
      external.href = link.href;
      dialog.classList.toggle('is-short', link.dataset.videoShort === 'true');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = heading.textContent;
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      player.replaceChildren(iframe);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      close.focus();
    });
  });
})();
