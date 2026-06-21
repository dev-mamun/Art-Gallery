// getArtWorkLikes.js
// const APP_ID = 't1efvb5DXWdaedCYX6j5';
// const apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/t1efvb5DXWdaedCYX6j5/likes';
// const LIKES_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${APP_ID}/likes`;

const BASE_URL = 'https://6a37eea0c105017aa6397789.mockapi.io';
const LIKES_URL = `${BASE_URL}/likes`;

const getArtworkLikes = async (artworkIds) => {
  try {
    const response = await fetch(LIKES_URL);

    if (!response.ok) {
      console.error(
        `Failed to get artwork likes: ${response.status} ${response.statusText}`
      );

      return artworkIds.map((id) => ({
        item_id: String(id),
        likes: 0,
      }));
    }

    const data = await response.json();

    return artworkIds.map((id) => {
      const artworkLikes = data.find(
        (artwork) => String(artwork.item_id) === String(id)
      );

      return {
        item_id: String(id),
        likes: artworkLikes ? Number(artworkLikes.likes) : 0,
      };
    });
  } catch (error) {
    console.error('Get artwork likes error:', error);

    return artworkIds.map((id) => ({
      item_id: String(id),
      likes: 0,
    }));
  }
};

export default getArtworkLikes;