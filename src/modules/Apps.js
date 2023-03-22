/** ****************************************
 * Project: js-capstone
 * File: Apps.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Involvement from './Involvement';

// const toastr = require('toastr');

class Apps {
  #$activity;

  constructor() {
    this.baseUrl = '';
    this.#$activity = new Involvement();
  }

  events = () => {

  };
}

export default Apps;