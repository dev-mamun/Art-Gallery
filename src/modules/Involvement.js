/** ****************************************
 * Project: js-capstone
 * File: Involvement.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import HttpRequest from './HttpRequest';

class Involvement {
  #$request;

  constructor() {
    this.baseUrl = '';
    this.#$request = new HttpRequest();
  }

  getComments = ($id) => {
    const $url = `https://api.artic.edu/api/v1/artworks/${$id}`;
    const $response = this.#$request.get($url);
    $response.then(($res) => console.log($res))
      .catch(($error) => console.log($error));
  };
}

export default Involvement;