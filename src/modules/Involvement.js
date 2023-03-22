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
    $response.then(($res) => console.log($res))
      .catch(($error) => {
        throw new Error($error);
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