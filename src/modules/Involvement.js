/** ****************************************
 * Project: js-capstone
 * File: Involvement.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import HttpRequest from './HttpRequest';

class Involvement {
  #$request;

  #baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

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
    const $url = `${this.baseUrl}apps/`;
    const $response = this.#$request.post($url);
    $response.then(($res) => {
      this.appId = $res;
    })
      .catch(($error) => {
        throw new Error($error);
      });
  };

  getComments = ($id) => {
    const $url = `${this.baseUrl}${this.appId}`;
    const $response = this.#$request.get($url);
    $response.then(($res) => console.log($res))
      .catch(($error) => {
        throw new Error($error);
      });
  };
}

export default Involvement;