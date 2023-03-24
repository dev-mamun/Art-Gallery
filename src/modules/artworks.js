const fetchArtworks = async (ids) => {
  const apiUrl = 'https://api.artic.edu/api/v1/artworks';
  const params = {
    ids: ids.join(),
    fields: ['id', 'title', 'image_id', 'artist_display'],
  };

  try {
    const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
    const data = await response.json();
    const artworks = data.data.map((artwork) => ({
      id: artwork.id,
      title: artwork.title,
      imageUrl: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
      artist: artwork.artist_display,
    }));

    return artworks;
  } catch (error) {
    return [];
  }
};

export default fetchArtworks;