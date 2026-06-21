/** ****************************************
 * Project: js-capstone
 * File: index.js
 * Created: 3/20/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>, Anita Sharma<sharma.anita00001@gmail.com>
 ****************************************** */
import './css/home.css';
import './css/apps.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.min';
import Apps from './modules/Apps';
import fetchArtworks from './modules/artworks';
import countItem from './modules/countItem';
import updateArtworkLikes from './modules/artworkLikes';
import getArtworkLikes from './modules/getArtWorkLikes';

const gridView = document.getElementById('grid-view');

// IDs of artworks to display
const artworkIds = [14572, 21934, 43869, 44426, 62323, 79586];
const maxTitleLength = 20;

const displayArtworks = async ($gallery) => {
  const artworks = await fetchArtworks(artworkIds);
  const artworkLikes = await getArtworkLikes(artworkIds);

  const likesMap = artworkLikes.reduce((items, item) => ({
    ...items,
    [item.item_id]: Number(item.likes),
  }), {});

  const artworksContainer = document.getElementById('artworks');
  artworksContainer.innerHTML = '';

  artworks.forEach((artwork) => {
    // Trim title if it is too long
    const title = artwork.title.length > maxTitleLength
      ? `${artwork.title.slice(0, maxTitleLength)}...`
      : artwork.title;

    const countLike = likesMap[String(artwork.id)] || 0;

    artworksContainer.innerHTML += `
      <article class="thumbnail" data-artwork-id="${artwork.id}">
        <div class='image'><img src="${artwork.imageUrl}" alt="${artwork.title}"></div>
        <div class="desc">
          <p>${title}</p>
          <button type="button" class="heart"><i class="fa-regular fa-heart"></i></button>
          <button type="button" class="solid-heart"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="likes-count" data-likes="${countLike}">${countLike} Likes</div>
        <button type="button" data-id="${artwork.id}" data-image="${artwork.imageUrl}" class="btn btn-outline-success text-dark comment">Comments</button>
        <button type="button" data-id="${artwork.id}" data-image="${artwork.imageUrl}" class="btn btn-outline-secondary text-dark reservation">Reservation</button>
      </article>
    `;
  });

  gridView.appendChild(artworksContainer);

  // Event listener for heart icon
  const heart = document.querySelectorAll('.heart');
  heart.forEach((button) => {
    button.addEventListener('click', async () => {
      const article = button.closest('[data-artwork-id]');
      const solidHeart = button.nextElementSibling;
      const likesCountElem = article.querySelector('.likes-count');
      const currentLikes = Number(likesCountElem.dataset.likes || 0);
      const optimisticLikes = currentLikes + 1;

      button.style.display = 'none';
      solidHeart.style.display = 'block';
      likesCountElem.dataset.likes = optimisticLikes;
      likesCountElem.innerHTML = `${optimisticLikes} Likes`;

      try {
        const { artworkId } = article.dataset;
        const updatedLike = await updateArtworkLikes(artworkId, 1);
        const updatedLikes = Number(updatedLike.likes || optimisticLikes);

        likesCountElem.dataset.likes = updatedLikes;
        likesCountElem.innerHTML = `${updatedLikes} Likes`;
      } catch (error) {
        console.error('Update artwork likes error:', error);
      }
    });
  });

  // code for displaying artworks
  const artworksItem = gridView.querySelectorAll('.thumbnail');
  const paintingCount = countItem(artworksItem);
  const paintingCountElem = document.getElementById('painting-count');
  paintingCountElem.innerHTML = `(${paintingCount})`;
  $gallery.events();
};

window.addEventListener('load', () => {
  const gallery = new Apps();
  displayArtworks(gallery);
});
