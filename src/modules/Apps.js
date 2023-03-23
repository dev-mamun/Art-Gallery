/** ****************************************
 * Project: js-capstone
 * File: Apps.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import HttpRequest from './HttpRequest';
import Involvement from './Involvement';

const toastr = require('toastr');

const bootstrap = require('bootstrap');

class Apps {
  #$activity;

  #$request;

  constructor() {
    this.baseUrl = '';
    this.controller = {};
    this.#$activity = new Involvement();
    this.#$request = new HttpRequest();
  }

  events = () => {
    this.controller = new AbortController();
    const $comment = document.querySelectorAll('.comment');
    $comment.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.details(e.target.dataset.id, e.target.dataset.image);
      }, { signal: this.controller.signal });
    });
  };

  details = async ($id) => {
    await this.getArtWorkById($id);
  };

  getArtWorkById = async ($id) => {
    const params = {
      fields: ['id', 'title', 'alt_titles', 'artist_display', 'place_of_origin', 'image_id', 'gallery_title', 'artwork_type_title', 'department_title', 'artist_title'],
    };
    const $url = `https://api.artic.edu/api/v1/artworks/${$id}?${new URLSearchParams(params)}`;
    const $response = this.#$request.get($url);
    $response.then(($res) => {
      const $item = $res.data;
      $item.imageUrl = `https://www.artic.edu/iiif/2/${$res.data.image_id}/full/843,/0/default.jpg`;
      this.showDetail($item);
    })
      .catch(($error) => {
        toastr.error($error);
      });
  };

  showDetail = ($item) => {
    const $content = `
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12">
                <img class="img-thumbnail mx-auto d-block"
                     src="${$item.imageUrl}">
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 text-center">
                <h4>${$item.title}</h4>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-3">
            <div class="col-7">
                Artist: ${$item.artist_title}
            </div>
            <div class="col-5">
                Origin: ${$item.place_of_origin}
            </div>
            <div class="col-7">
                Gallery: ${$item.gallery_title}
            </div>
            <div class="col-5">
                Type: ${$item.artwork_type_title}
            </div>
        </div>

        <div id="comment-list" class="row d-flex justify-content-center align-items-center mb-3">
            <div class="col-12 text-center">
                <h5>Comments (0)</h5>
            </div>
            <div class="col-12">
                <ul class="list-group list-group-flush">
                   
                </ul>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 text-center">
                <h5>Add Comment</h5>
            </div>
            <form class="row g-3">
            <input type="hidden" name="item_id" value="${$item.id}">
                <div class="mb-3">
                    <label for="name" class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="name" name="username"
                           placeholder="example: Mamun" required minlength="3" maxlength="10">
                </div>
                <div class="mb-3">
                    <label for="comment" class="form-label">
                        Your Insights
                    </label>
                    <textarea class="form-control" id="comment" placeholder="I'd love to buy it!" name="comment"
                              rows="3" required minlength="5" maxlength="20"></textarea>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-success">Comment</button>
                </div>
            </form>
        </div>
    </div>`;
    const $modalBody = document.querySelector('.modal-body');
    $modalBody.innerHTML = $content;
    const $myModal = new bootstrap.Modal('#staticBackdrop', {
      keyboard: false,
    });
    $myModal.show();
    this.#$activity.getComment($item.id);
    const $form = document.querySelector('form');
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      const $formData = new FormData($form);
      const $inputs = {
        item_id: $formData.get('item_id'),
        username: $formData.get('username'),
        comment: $formData.get('comment'),
      };
      $form.reset();
      this.saveComment($inputs);
    });
  };

  saveComment = ($data) => {
    this.#$activity.saveComment($data);
  };
}

export default Apps;