// countItem.js

const countItem = () => {
  const gridView = document.getElementById('grid-view');
  const artworks = gridView.querySelectorAll('#thumbnail');
  return artworks.length;
};

export default countItem;
