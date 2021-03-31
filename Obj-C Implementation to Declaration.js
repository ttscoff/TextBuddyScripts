/**
 * Implementation to Declaration
 * Just turns:
 *
 * - (NSString *)myMethod:(NSString *)params {
   * // BUTTLOAD OF CODE
 * }
 *
 * Into
 *
 * - (NSString *)myMethod:(NSString *)params;
 */


function post(input) {
  let output = [],
      methodRX = /^([-+].*?)\s*(?=\{|$)/mg;

  let matches = input.match(methodRX);

  matches.forEach((m) => {
      output.push(m.replace(/\s*$/, '') + ';');
  });
  return output.join("\n");
}
