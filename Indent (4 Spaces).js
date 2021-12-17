/**
 * Indent every line by 4 spaces
 */

function post(input) {
  return `    ${input.split(/\n/).join('\n    ')}`;
}
