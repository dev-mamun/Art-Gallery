import { LIKES_URL } from './apiConfig';

const emptyLikes = (artworkIds) => artworkIds.map((id) => ({
  item_id: String(id),
  likes: 0,
}));

const getArtworkLikes = async (artworkIds) => {
  try {
    const response = await fetch(LIKES_URL);

    if (!response.ok) {
      console.error(`Failed to get artwork likes: ${response.status} ${response.statusText}`);
      return emptyLikes(artworkIds);
    }

    const data = await response.json();

    return artworkIds.map((id) => {
      const artworkLikes = data.find((artwork) => String(artwork.item_id) === String(id));

      return {
        item_id: String(id),
        likes: artworkLikes ? Number(artworkLikes.likes) : 0,
      };
    });
  } catch (error) {
    console.error('Get artwork likes error:', error);
    return emptyLikes(artworkIds);
  }
};

export default getArtworkLikes;
