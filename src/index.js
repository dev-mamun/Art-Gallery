/** ****************************************
 * Project: js-capstone
 * File: index.js
 * Created: 3/20/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>,Anita Sharma
 ****************************************** */
import './css/apps.css';
import 'bootstrap';
import Apps from './modules/Apps';

window.addEventListener('load', () => {
  const gallery = new Apps();
  gallery.fakeFn();
});