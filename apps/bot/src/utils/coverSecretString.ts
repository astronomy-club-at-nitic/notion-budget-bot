// 文字列の末尾20%のみを残して、それ以外を*で置き換える
// そのまま残る文字数は最大4文字
export const coverSecretString = (str: string): string => {
  const { length } = str;
  const coveredLength = Math.floor(Math.min(length * 0.2, 4));
  const covered = '*'.repeat(length - coveredLength);
  return `${covered}${str.slice(-coveredLength)}`;
};
