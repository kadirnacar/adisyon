declare var process: any;

export function clone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Is server prerendering by Node.js.
 * There can't be any DOM: window, document, etc.
 */
export function isNode(): boolean {
  return (
    typeof process === 'object' && process.versions && !!process.versions.node
  );
}

export function isObjectEmpty(obj): boolean {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const enumVales = (myEnum): string[] => {
  let result: string[] = [];
  for (var enumMember in myEnum) {
    var isValueProperty = parseInt(enumMember, 10) >= 0;
    if (isValueProperty) {
      result.push(myEnum[enumMember]);
    }
  }
  return result;
};
export const arrayToObject = (array, key, value) => {
  if (!array) return {};
  return array.reduce((obj, item) => {
    obj[item[key]] = item[value];
    return obj;
  }, {});
};

export const performTimeConsumingTask = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve('result');
    }, 3000),
  );
};

export function invertColor(hex, bw?) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  var rString = (255 - r).toString(16);
  var gString = (255 - g).toString(16);
  var bString = (255 - b).toString(16);
  return '#' + padZero(rString) + padZero(gString) + padZero(bString);
}

export function padZero(str, len?) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function rgbToYIQ({r, g, b}) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function hexToRgb(hex) {
  if (!hex || hex === undefined || hex === '') {
    return undefined;
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : undefined;
}

export function contrast(colorHex, threshold = 128) {
  if (colorHex === undefined) {
    return '#000';
  }

  const rgb = hexToRgb(colorHex);

  if (rgb === undefined) {
    return '#000';
  }

  return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
}
