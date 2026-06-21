import { LIKES_URL } from './apiConfig';

const updateArtworkLikes = async (artworkId, increment = 1) => {
  const itemId = String(artworkId);

  const likesResponse = await fetch(LIKES_URL);

  if (!likesResponse.ok) {
    throw new Error(`Failed to load likes: ${likesResponse.status} ${likesResponse.statusText}`);
  }

  const likes = await likesResponse.json();
  const existingLike = likes.find((item) => String(item.item_id) === itemId);

  if (existingLike) {
    const updatedLikes = Number(existingLike.likes) + Number(increment);

    const updateResponse = await fetch(`${LIKES_URL}/${existingLike.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: itemId,
        likes: updatedLikes,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update artwork ${itemId} likes: ${updateResponse.status} ${updateResponse.statusText}`);
    }

    return updateResponse.json();
  }

  const createResponse = await fetch(LIKES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
      likes: Number(increment),
    }),
  });

  if (!createResponse.ok) {
    throw new Error(`Failed to create artwork ${itemId} likes: ${createResponse.status} ${createResponse.statusText}`);
  }

  return createResponse.json();
};

export default updateArtworkLikes;
