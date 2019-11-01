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

const status = require('fifit-util-status');
const Error = require('./lib/error');
const ClientError = require('./lib/clientError');
const ServerError = require('./lib/serverError');

/**
 * @var {Object}
 */
const error = module.exports = {};

/**
 * @var {function}
 */
error.Error = Error;

/**
 * @var {function}
 */
error.ClientError = ClientError;

/**
 * @var {function}
 */
error.ServerError = ServerError;

/**
 * @var {Object}
 */
error.codes = {};

/**
 * @var {Object}
 */
error.messages = {};

/**
 * @param {string} name
 * @param {number} statusCode
 * @param {string} statusMessage
 * @return {function}
 */
function createClientErrorClass(name, statusCode, statusMessage){
	return class extends ClientError{
		/**
		 * @param {string=} message 
		 * @param {Object=} headers 
		 */
		constructor(message, headers){
			super(statusCode, typeof message !== 'undefined' ? message : statusMessage, headers);
			Object.defineProperty(this, 'name', {
				value: name, configurable: true, enumerable: false, writable: true
			});
		}
	};
}

/**
 * @param {string} name
 * @param {number} statusCode
 * @param {string} statusMessage
 * @return {function}
 */
function createServerErrorClass(name, statusCode, statusMessage){
	return class extends ServerError{
		/**
		 * @param {string=} message 
		 * @param {Object=} headers 
		 */
		constructor(message, headers){
			super(statusCode, typeof message !== 'undefined' ? message : statusMessage, headers);
			Object.defineProperty(this, 'name', {
				value: name, configurable: true, enumerable: false, writable: true
			});
		}
	};
}

/**
 * @+
 */
status.clientErrorEntries.forEach(([code, message]) => {
	let name = status.errorClassNames[code];
	let constructor = createClientErrorClass(name, code, message);
	error[name] = constructor;
	error.codes[code] = constructor;
	error.messages[message] = constructor;
});

/**
 * @+
 */
status.serverErrorEntries.forEach(([code, message]) => {
	let name = status.errorClassNames[code];
	let constructor = createServerErrorClass(name, code, message);
	error[name] = constructor;
	error.codes[code] = constructor;
	error.messages[message] = constructor;
});