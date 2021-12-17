/**
 * Remove one level of indent
 */

function post(input) {
  let lines = input.split(/\n/);
  let first_indent = lines[0].match(/^\s+/)[0];
  let pattern = new RegExp(`^${first_indent}`);
  return lines.map(l => l.replace(pattern, '')).join("\n")
}
