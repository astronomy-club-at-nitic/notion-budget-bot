/* eslint-disable no-console */
import { SubjectSchema } from './subject.js';

describe('SubjectSchema', () => {
  test('should be valid', () => {
    // Arrange
    const subject: unknown = {
      id: '1',
      name: 'project1',
      amount: 1200,
      paymentDate: new Date(),
      paymentStatus: 'draft',
      reportStatus: 'notyet',
      project: [
        {
          id: '1',
          name: 'project1',
          emoji: '👍',
        },
      ],
      payer: [
        {
          id: '1',
          name: 'member1',
          emoji: '👍',
        },
      ],
    };

    // Act
    expect(() => {
      const result = SubjectSchema.parse(subject);
      console.log(result);
    })
      // Assert
      .not.toThrow();
  });
});
