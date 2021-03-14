function post(input) {
  let output = `- (NSString *)description {\n\treturn [NSString stringWithFormat:@"`,
      placeholders = [],
      replacements = [],
      propRX = /[\s\t]*@property\s*(?:\([\s\S]*?\))?\s*([^<\s]+)\s*(?:<[\s\S]*?>)?\s*(?:\s*\*\s*)?(?:\s*_\S+)?\s*([\s\S]*?);/g;

  let classRX = /@interface\s+(.*?)\s*:/;
  if (classRX.test(input)) {
    className = classRX.exec(input)[1];
  }
  placeholders.push(`${className} description: %@`);
  replacements.push(`[super description]`);

  let matches = input.match(propRX);
  matches.forEach((m) => {
    let match = propRX.exec(m);
    if (match) {
      let type = match[1],
          title = match[2],
          result = typeForTitle(title, type);
      placeholders.push(result.placeholder);
      replacements.push(result.replacement);
    }

  });
  let places = placeholders.join('\\n');
  let replaces = replacements.join(', ');
  output += `${places}", ${replaces}];\n}`;
  return output;
}

function typeForTitle(title,type) {
  switch (type) {
    case 'unsignedint':
      holder = "%u";
      replacement = `self.${title}`;
      break;
    case 'unsignedchar':
      holder = "%c";
      replacement = `self.${title}`;
      break;
    case 'unichar':
      holder = "%C";
      replacement = `self.${title}`;
      break;
    case 'int':
    case 'NSInteger':
    case 'NSUInteger':
      holder = "%zd";
      replacement = `self.${title}`;
      break;
    case 'double':
    case 'float':
    case 'CGFloat':
      holder = "%f";
      replacement = `self.${title}`;
      break;
    case 'CFIndex':
      holder = "%ld";
      replacement = `self.${title}`;
      break;
    case 'pointer':
      holder = "%p";
      replacement = `self.${title}`;
      break;
    case 'BOOL':
      holder = "%i";
      replacement = `self.${title}`;
      break;
    case 'NSRange':
      holder = "%@";
      replacement = `NSStringFromRange(self.${title})`;
      break;
    case 'CGPoint':
      holder = "%@";
      replacement = `NSStringFromCGPoint(self.${title})`;
      break;
    case 'CGVector':
      holder = "%@";
      replacement = `NSStringFromCGVector(self.${title})`;
      break;
    case 'CGSize':
      holder = "%@";
      replacement = `NSStringFromCGSize(self.${title})`;
      break;
    case 'CGRect':
      holder = "%@";
      replacement = `NSStringFromCGRect(self.${title})`;
      break;
    case 'CGAffineTransform':
      holder = "%@";
      replacement = `NSStringFromCGAffineTransform(self.${title})`;
      break;
    case 'UIEdgeInsets':
      holder = "%@";
      replacement = `NSStringFromUIEdgeInsets(self.${title})`;
      break;
    case 'UIOffset':
      holder = "%@";
      replacement = `NSStringFromUIOffset(self.${title})`;
      break;
    case 'SEL':
      holder = "%@";
      replacement = `NSStringFromSelector(self.${title})`;
      break;
    case 'Class':
      holder = "%@";
      replacement = `NSStringFromClass(self.${title})`;
      break;
    case 'Protocol':
      holder = "%@";
      replacement = `NSStringFromProtocol(self.${title})`;
      break;
    default:
      holder = "%@";
      replacement = `self.${title}`;
      break;
  }
  return {placeholder:`${title}: ${holder}`, replacement: replacement}
}