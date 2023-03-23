/** ****************************************
 * Project: js-capstone
 * File: Apps.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Involvement from './Involvement';

// const toastr = require('toastr');

const bootstrap = require('bootstrap');

class Apps {
  #$activity;

  constructor() {
    this.baseUrl = '';
    this.controller = {};
    this.#$activity = new Involvement();
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

  details = ($id, $image) => {
    const $content = `
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12">
                <img class="img-thumbnail mx-auto d-block"
                     src="${$image}">
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 text-center">
                <h4>Starry Night and the Astronauts</h4>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center m-3">
            <div class="col-6">
                Artist: Alma Thomas
            </div>
            <div class="col-6">
                Origin: United States
            </div>
            <div class="col-6">
                Gallery: Gallery 291
            </div>
            <div class="col-6">
                Type: Painting
            </div>
        </div>

        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 text-center">
                <h5>Comments (2)</h5>
            </div>
            <div class="col-12">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">03/11/21 Alex: I'd love to buy it!</li>
                    <li class="list-group-item">03/11/21 Mamun: I love it.</li>
                    <li class="list-group-item">03/11/21 Mia: I love</li>
                    <li class="list-group-item">03/11/21 Alex: I'd love to buy it. how much it
                        cost
                    </li>
                </ul>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 text-center">
                <h5>Add Comment</h5>
            </div>
            <form class="row g-3">
                <div class="mb-3">
                    <label for="name" class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="name"
                           placeholder="example: Mamun">
                </div>
                <div class="mb-3">
                    <label for="comment" class="form-label">
                        Your Insights
                    </label>
                    <textarea class="form-control" id="comment" placeholder="I'd love to buy it!"
                              rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-success">Comment</button>
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
    //this.#$activity.getComment($id);
  };
}

export default Apps;