const hexToRGBA = (hex: string, opacity: number) => {
  const rgb = hex
    .replace('#', '')
    .split(/(?=(?:..)*$)/)
    .map(x => parseInt(x, 16));
  return `rgba(${rgb.at(0)}, ${rgb.at(1)}, ${rgb.at(2)}, ${opacity})`;
};

export default { hexToRGBA };
