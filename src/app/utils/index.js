const imageRegex = /(https?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(?:png|jpe?g|gif|gifv)/ig;
const youtubeRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;
const extRegex = /^.*\.(png|jpe?g|gif|gifv|mp4)(\?.*)?$/;

export function getExt(url) {
  const matches = url.match(extRegex);
  return matches ? matches[1] : 'unknown';
}

export function extractYoutubes(str) {
  let m;
  const results = [];
  while ((m = youtubeRegex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === youtubeRegex.lastIndex) {
      youtubeRegex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    results.push(m[1]);
  }
  return results;
}

export function extractImages(text) {
  const images = text.match(imageRegex);
  return images === null ? [] : images;
}

export function toHttps(url) {
  const matches = url.match(/^http:\/\/((?:[im]\.)?imgur\.com\/.*)$/);
  if (matches) {
    return `https://${matches[1]}`;
  }
  return url;
}

function hash(str) {
  if (str) {
    return [...str].map(x => x.charCodeAt(0)).reduce((sum, x) => (sum * 31 + x) | 0, 0) | 0;
  }
  return 0;
}

export function getColorFromToeknId(colorToken, publicId) {
  const c = 2.549999952316284;
  const v = Math.abs(31 * (31 + hash(colorToken)) + hash(publicId));
  const r = Math.round((v % 70) * c);
  const g = Math.round(((v / 100 | 0) % 70) * c);
  const b = Math.round((((v / 100 | 0) / 100 | 0) % 70) * c);
  return {r, g, b};
}

