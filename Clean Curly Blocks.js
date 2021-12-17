/**
 * Remove {{blocks}} from text, compress newlines
 */

function post(input) {
  return input.replace(/\{\{.*?\}\}/gs, '').replace(/^\s+$/mg, '').replace(/(^\n$){2,}/mg,"\n");
}
