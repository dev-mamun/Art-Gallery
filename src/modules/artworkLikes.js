// artworkLikes.js
const updateArtworkLikes = async (artworkId, likes) => {
  const apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/t1efvb5DXWdaedCYX6j5/likes';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: artworkId,
      likes,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update artwork ${artworkId} likes: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default updateArtworkLikes;