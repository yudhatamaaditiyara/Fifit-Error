/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const {isClientErrorStatus, isServerErrorStatus, isErrorStatus} = require('fifit-util-status');
const {RuntimeError} = require('ganiyem-error');

/**
 */
class Error extends RuntimeError
{
  /**
   * @param {(number|string)} [status]
   * @param {string} [message]
   * @param {Object} [headers]
   */
  constructor(status, message, headers){
    super(message);
    Object.defineProperty(this, 'status', {
      value: this._filterStatus(status | 0), configurable: true, enumerable: false, writable: true
    });
    Object.defineProperty(this, 'headers', {
      value: this._filterHeaders(headers), configurable: true, enumerable: false, writable: true
    });
  }

  /**
   * @returns {boolean}
   */
  get isClientError(){
    return isClientErrorStatus(this.status);
  }
  
  /**
   * @returns {boolean}
   */
  get isServerError(){
    return isServerErrorStatus(this.status);
  }

  /**
   * @param {number} status
   * @returns {number}
   */
  _filterStatus(status){
    if (isErrorStatus(status)) {
      return status;
    }
    return 500;
  }
  
  /**
   * @param {Object} [headers]
   * @returns {Object}
   */
  _filterHeaders(headers){
    if (Object.prototype.toString.call(headers) === '[object Object]') {
      return headers;
    }
    return Object.create(null);
  }
}

/**
 * @+
 */
module.exports = Error;