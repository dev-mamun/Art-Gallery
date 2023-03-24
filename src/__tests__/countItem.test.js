const countItem = require('../modules/countItem');

describe('countItem', () => {
  it('returns the correct count for an array of length 0', () => {
    const artworks = [];
    const result = countItem(artworks);
    expect(result).toBe(0);
  });

  it('returns the correct count for an array of length 1', () => {
    const artworks = ['Mona Lisa'];
    const result = countItem(artworks);
    expect(result).toBe(1);
  });

  it('returns the correct count for an array of length greater than 1', () => {
    const artworks = ['Mona Lisa', 'The Starry Night', 'The Persistence of Memory'];
    const result = countItem(artworks);
    expect(result).toBe(3);
  });
});
