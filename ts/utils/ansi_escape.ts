/**
 *  All those infos are taken from https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors
 *  and also https://en.wikipedia.org/wiki/ANSI_escape_code#Description
 */

const prefix = '\x1b[';
const suffix = 'm';

function getCode(code: string | number) {
  return `${prefix}${code}${suffix}`;
}
export const ansi = {
  reset: getCode(0),
  bold: getCode(1),
  italic: getCode(3),
  underline: getCode(4),
  slowBlink: getCode(5),
  blink: getCode(6),
  reverse: getCode(7),
  hide: getCode(8),
  crossed: getCode(9),
  stop: {
    bold: getCode(22),
    italic: getCode(23),
    underline: getCode(24),
    blink: getCode(25),
    reverse: getCode(27),
    hide: getCode(28),
    crossed: getCode(29),
  },
  color: {
    black: getCode(30),
    red: getCode(31),
    green: getCode(32),
    yellow: getCode(33),
    blue: getCode(34),
    magenta: getCode(35),
    cyan: getCode(36),
    white: getCode(37),
    gray: getCode(90),
    bright: {
      red: getCode(91),
      green: getCode(92),
      yellow: getCode(93),
      blue: getCode(94),
      magenta: getCode(95),
      cyan: getCode(96),
      white: getCode(97),
    },
  },
  background: {
    black: getCode(40),
    red: getCode(41),
    green: getCode(42),
    yellow: getCode(43),
    blue: getCode(44),
    magenta: getCode(45),
    cyan: getCode(46),
    white: getCode(47),
    gray: getCode(100),
    bright: {
      red: getCode(101),
      green: getCode(102),
      yellow: getCode(103),
      blue: getCode(104),
      magenta: getCode(105),
      cyan: getCode(106),
      white: getCode(107),
    },
  },
};
