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

const http = require('http');
const status = require('fifit-util-status');
const Error = require('./lib/error');
const ClientError = require('./lib/clientError');
const ServerError = require('./lib/serverError');

/**
 * @returns {Object}
 */
function setup(){
	let name;
	let constructor;
	return status.entries.reduce((exports, entry) => {
		let code = entry[0];
		let message = entry[1];
		if (status.isClientErrorStatus(code)) {
			name = createClassName(status.identifiers[code]);
			constructor = createClientErrorClass(name, code, message);
			exports[name] = constructor;
			exports[code] = constructor;
		} else if (status.isServerErrorStatus(code)) {
			name = createClassName(status.identifiers[code]);
			constructor = createServerErrorClass(name, code, message);
			exports[name] = constructor;
			exports[code] = constructor;
		}
		return exports;
	},{});
}

/**
 * @param {string} name
 * @returns {string}
 */
function createClassName(name){
	if (!/Error$/.test(name)) {
		name += 'Error';
	}
	return name;
}

/**
 * @param {string} name
 * @param {number} statusCode
 * @param {string} statusMessage
 * @returns {function}
 */
function createClientErrorClass(name, statusCode, statusMessage){
	return class extends ClientError{
		constructor(message, headers){
			super(statusCode, message != null ? message : statusMessage, headers);
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
 * @returns {function}
 */
function createServerErrorClass(name, statusCode, statusMessage){
	return class extends ServerError{
		constructor(message, headers){
			super(statusCode, message != null ? message : statusMessage, headers);
			Object.defineProperty(this, 'name', {
				value: name, configurable: true, enumerable: false, writable: true
			});
		}
	};
}

/**
 * @+
 */
module.exports = setup();
module.exports.Error = Error;
module.exports.ClientError = ClientError;
module.exports.ServerError = ServerError;