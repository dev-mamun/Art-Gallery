// getArtWorkLikes.js
const apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/t1efvb5DXWdaedCYX6j5/likes';

const getArtworkLikes = async (artworkIds) => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Failed to get artwork likes: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return artworkIds.map((id) => {
    const artworkLikes = data.find((artwork) => artwork.item_id === String(id));
    return {
      item_id: String(id),
      likes: artworkLikes ? artworkLikes.likes : 0,
    };
  });
};

export default getArtworkLikes;