/**
 * Indent every line by 2 spaces
 */

function post(input) {
  return `  ${input.split(/\n/).join('\n  ')}`;
}
