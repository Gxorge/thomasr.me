let refUrl = window.location.hash.replace(/\#/, '').replace(/(http)s*\:\/\//g, '');
if (refUrl.length < 1 && document.referrer) { refUrl = document.referrer.replace(/(http)s*\:\/\//g, ''); }

const beforeSlash = refUrl.split('/')[0];
const afterSlash = (refUrl.split('/')[1]) ? refUrl.split(/\/(.+)/)[1] : '';

if (!beforeSlash || beforeSlash.length < 1) window.location = '/';

document.getElementById('page-description').innerText = `${beforeSlash} has been archived or deprecated`;
document.getElementById('js-archive-link').href = `https://archive.thomasr.me/${beforeSlash}/${afterSlash}`;

if(afterSlash.length >= 1) document.getElementById('js-this-site-link').href = `/${afterSlash}`;