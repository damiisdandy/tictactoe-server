export const generateID = (len: number) => {
  const ALPHABETS = 'ABCDEFGHIJKLMNOPQRESTUVWXYZ';
  const ALPHABETS_LOWER = ALPHABETS.toLowerCase();
  const NUMBERS = '0123456789';
  const ALPHANUMERICALS = ALPHABETS + ALPHABETS_LOWER + NUMBERS;

  let uniqueID = '';
  for (let index = 0; index < len; index++) {
    const index = Math.round(Math.random() * (ALPHANUMERICALS.length - 1))
    uniqueID += ALPHANUMERICALS[index]
  }
  return uniqueID;
}
