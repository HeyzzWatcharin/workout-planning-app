export const wrapPDFText = (text: string, maxWidth: number, font: any, fontSize: number): string[] => {
    const words = text.split(' ');
  let line = '';
  const lines: string[] = [];

  words.forEach(word => {
    const testLine = line + (line ? ' ' : '') + word;
    if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
      if (line.length > 0) {
        lines.push(line);
      }
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
  };