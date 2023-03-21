// const baseURL = 'https://api.artic.edu/api/v1/';
// const para = 'artworks?fields=id,title,artwork_type_title,thumbnail';

// const URL = baseURL + para;
// // console.log(URL);

const card = document.getElementById('card');

const url = 'https://api.artic.edu/api/v1/artworks?fields=id,title,artwork_type_title,thumbnail';

const fetchData = async () => {
  card.innerHTML = '';

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const artworks = data.data;
      const paintings = artworks.filter((artwork) => artwork.artwork_type_title === 'Painting');
      const myPaintings = paintings.slice(0, 6).map((painting) => painting.id);
      // console.log(myPaintings);

      myPaintings.forEach((element) => {
        const thumbnail = document.createElement('article');
        thumbnail.id = 'thumbnail';

        thumbnail.innerHTML = `
          <div class="image"><img src="${element.thumbnail}" alt=""></div>
          <div id="desc">
            <p>${element.title}</p>
            <button id="heart"><i class="fa-regular fa-heart"></i></button>
          </div>
          <button id="comments">Comments</button>
          <button id="reservation">Reservation</button>
        `;

        card.appendChild(thumbnail);
      });
    });
  // .catch((error) => console.error(error));
};

// fetchData();

export default fetchData;