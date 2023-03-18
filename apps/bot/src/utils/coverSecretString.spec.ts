import { coverSecretString } from './coverSecretString.js';

describe('coverSecretString', () => {
  test('文字列が十分長い場合でも、末尾が4文字までしか残らない', () => {
    // Arrange
    const secret = 'bcvsuEnjkeEvnjsQcZff0euvbsjdQ';

    // Act
    const covered = coverSecretString(secret);

    // Assert
    expect(covered).toBe('*************************sjdQ');
  });

  test('文字列が短い場合でも、下の文字列が推測不可能である', () => {
    // Arrange
    const sercet = 'fsiee3vg';

    // Act
    const covered = coverSecretString(sercet);

    // Assert
    expect(covered).toBe('*******g');
  });
});
