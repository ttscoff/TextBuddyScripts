/**
 * Indent every line by 1 tab
 */

function post(input) {
  return `\t${input.split(/\n/).join('\n\t')}`;
}
