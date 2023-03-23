/** ****************************************
 * Project: js-capstone
 * File: Involvement.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import HttpRequest from './HttpRequest';

const toastr = require('toastr');

class Involvement {
  #$request;

  #baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

  #appId = 't1efvb5DXWdaedCYX6j5';

  constructor() {
    this.#$request = new HttpRequest();
  }

  set baseUrl($val) {
    this.#baseUrl = $val;
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  set appId($val) {
    this.#appId = $val;
  }

  get appId() {
    return this.#appId;
  }

  getAppId = () => {
    const $url = `${this.baseUrl}`;
    const $response = this.#$request.post($url);
    $response.then(($res) => {
      this.appId = $res;
    })
      .catch(($error) => {
        throw new Error($error);
      });
  };

  getComment = ($id) => {
    const $url = `${this.baseUrl}${this.appId}/comments/?item_id=${$id}`;
    const $response = this.#$request.get($url);

    $response.then(($res) => {
      const $comments = document.getElementById('comment-list');
      $comments.children[1].children[0].innerHTML = '';
      $comments.children[0].children[0].innerText = `Comments (${$res.length})`;
      $res.forEach(($item) => {
        const $date = new Date(`${$item.creation_date}`);
        const $month = $date.getMonth();
        const $day = $date.getDate();
        const $year = $date.getFullYear();
        const $li = document.createElement('li');
        $li.className = 'list-group-item';
        $li.textContent = `${$month}/${$day}/${$year} ${$item.username}: ${$item.comment}`;
        $comments.children[1].children[0].appendChild($li);
      });
    })
      .catch(() => {
        const $comments = document.getElementById('comment-list');
        $comments.children[0].children[0].innerText = 'Comments (0)';
        $comments.children[1].children[0].innerHTML = '<li class="list-group-item">No Comment</li>';
      });
  };

  saveComment = ($comments) => {
    const $url = `${this.baseUrl}${this.appId}/comments/`;
    const $response = this.#$request.post($url, $comments);
    $response.then(($res) => {
      toastr.success($res);
    })
      .catch(($error) => {
        throw new Error($error);
      });
  };
}

export default Involvement;