/** ****************************************
 * Project: js-capstone
 * File: HttpRequest.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */

class HttpRequest {
  get = async ($url) => {
    const response = await fetch(
      $url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    let $promise;
    if (response.ok) {
      const result = await response.json();
      $promise = Promise.resolve(result);
    } else {
      $promise = Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
    }
    return $promise;
  };

  post = async ($url, $inputs = '') => {
    const $obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if ($inputs !== '') {
      $obj.body = JSON.stringify($inputs);
    }
    const response = await fetch($url, $obj);
    let $promise;
    if (response.ok) {
      const result = await response.text();
      $promise = Promise.resolve(result);
    } else {
      $promise = Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
    }
    return $promise;
  };

  #httpRequest = async ($url, $method, $inputs) => {
    const response = await fetch(
      $url,
      {
        method: $method,
        body: JSON.stringify($inputs), // string or object
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    let $promise;
    if (response.ok) {
      const result = await response.json();
      $promise = Promise.resolve(result);
    } else {
      $promise = Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
    }
    return $promise;
  };
}

export default HttpRequest;