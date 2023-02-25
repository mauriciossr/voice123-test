export function spaceBlank(string) {
  const newString = string.replaceAll(' ', '%20');
  return newString;
}