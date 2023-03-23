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

  const artworksContainer = document.getElementById('artworks');
  artworks.forEach(async (artwork) => {
    // Trim title if it is too long
    const title = artwork.title.length > maxTitleLength
      ? `${artwork.title.slice(0, maxTitleLength)}...`
      : artwork.title;

    artworksContainer.innerHTML += `
      <article id="thumbnail" data-artwork-id="${artwork.id}">
        <div class='image'><img src="${artwork.imageUrl}" alt="${artwork.title}"></div>
        <div id="desc">
          <p>${title}</p>
          <button id="heart" class="heart"><i class="fa-regular fa-heart"></i></button>
          <button class="solid-heart"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="likes-count"></div>
        <button id="comments" data-id="${artwork.id}" data-image="${artwork.imageUrl}" class="btn btn-outline-success text-dark comment">Comments</button>
        <button id="reservation" data-id="${artwork.id}" data-image="${artwork.imageUrl}" class="btn btn-outline-secondary text-dark reservation">Reservation</button>
      </article>
    `;
    gridView.appendChild(artworksContainer);

    // Display likes counts
    const likesCount = await getArtworkLikes([artwork.id]);
    const likesCountElem = document.querySelector(`[data-artwork-id="${artwork.id}"] .likes-count`);
    const countLike = likesCount[0].likes;
    likesCountElem.innerHTML = `${countLike} Likes`;
  });

  // Event listener for heart icon
  const heart = document.querySelectorAll('.heart');
  heart.forEach((button) => {
    button.addEventListener('click', async () => {
      const solidHeart = button.nextElementSibling;
      button.style.display = 'none';
      solidHeart.style.display = 'block';

      // Update artwork likes in API
      const { artworkId } = button.closest('#thumbnail').dataset;
      await updateArtworkLikes(artworkId, 1);
    });
  });

  // code for displaying artworks
  const paintingCount = countItem();
  const paintingCountElem = document.getElementById('painting-count');
  paintingCountElem.innerHTML = `(${paintingCount})`;
  $gallery.events();
};

window.addEventListener('load', () => {
  const gallery = new Apps();
  displayArtworks(gallery);
  /*   const $activity = new Involvement();
    const data = $activity.getComments();
    console.log('Index: ', data); */
});
