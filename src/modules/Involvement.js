/** ****************************************
 * Project: js-capstone
 * File: Involvement.js
 * Created: 3/21/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import { COMMENTS_URL } from './apiConfig';

const toastr = require('toastr');

class Involvement {
  countComment = ($item) => `Comments (${$item.length})`;

  getComments = async ($id) => {
    const response = await fetch(COMMENTS_URL);

    if (!response.ok) {
      throw new Error(`Failed to get comments: ${response.status} ${response.statusText}`);
    }

    const comments = await response.json();

    return comments.filter((comment) => String(comment.item_id) === String($id));
  };

  getComment = async ($id) => {
    try {
      const $res = await this.getComments($id);
      const $comments = document.getElementById('comment-list');
      $comments.children[1].children[0].innerHTML = '';
      $comments.children[0].children[0].innerText = this.countComment($res);

      if ($res.length === 0) {
        $comments.children[1].children[0].innerHTML = '<li class="list-group-item">No Comment</li>';
        return;
      }

      $res.forEach(($item) => {
        const $date = new Date($item.creation_date || $item.createdAt || Date.now());
        const $month = $date.getMonth() + 1;
        const $day = $date.getDate();
        const $year = $date.getFullYear();
        const $li = document.createElement('li');
        $li.className = 'list-group-item';
        $li.textContent = `${$month}/${$day}/${$year} ${$item.username}: ${$item.comment}`;
        $comments.children[1].children[0].appendChild($li);
      });
    } catch (error) {
      console.error('Get comment error:', error);
      const $comments = document.getElementById('comment-list');
      $comments.children[0].children[0].innerText = 'Comments (0)';
      $comments.children[1].children[0].innerHTML = '<li class="list-group-item">No Comment</li>';
    }
  };

  saveComment = async ($comments) => {
    const response = await fetch(COMMENTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...$comments,
        creation_date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save comment: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    toastr.success('Comment saved successfully');

    return result;
  };
}

export default Involvement;
