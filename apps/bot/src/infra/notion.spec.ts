/* eslint-disable no-console */
import { retriveDatabaseMetadata } from './notion.js';

describe('retriveDatabaseMetadata', () => {
  test('データベースの情報を取得できる', async () => {
    // Arrange

    // Act
    const response = await retriveDatabaseMetadata();
    console.info(response);

    // Assert
    expect(response).not.toBeUndefined();
  });

  test('データベースの持つプロパティーが変化していない', async () => {
    // Arrange

    // Act
    const { properties } = await retriveDatabaseMetadata();

    // Assert
    expect(properties).toMatchSnapshot();
  });
});
