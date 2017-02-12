/**
 * @file
 * @author 何文林
 * @date 17/2/7
 */

import 'whatwg-fetch';
const ajax = function (url, method, params) {
  let option = {};
  if (method == 'get' || method == 'GET') {
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    option = {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } else {
    option = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  }
  return fetch(url, option).then(function(response) {
    return response.json();
  }, function(error) {
    throw new Error(error);
  })
};
module.exports = ajax;



