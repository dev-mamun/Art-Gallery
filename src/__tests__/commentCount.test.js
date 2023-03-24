/** ****************************************
 * Project: js-capstone
 * File: commentCount.test.js
 * Created: 3/23/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Involvement from '../modules/Involvement';

const $activity = new Involvement();

describe('Testing comments counter', () => {
  test('Should Return Comments (2)', () => {
    const $items = [
      {
        comment: 'This is test',
        creation_date: '2023-03-23',
        username: 'Mamun',
      },
      {
        comment: 'This is test',
        creation_date: '2023-03-23',
        username: 'Mamun 1',
      },
    ];

    const $count = $activity.countComment($items);
    expect($count)
      .toBe('Comments (2)');
  });

  test('Should Return Comments (0)', () => {
    const $items = [];

    const $count = $activity.countComment($items);
    expect($count)
      .toBe('Comments (0)');
  });
});