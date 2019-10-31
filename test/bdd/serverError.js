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
const assert = require('assert');
const {RuntimeError} = require('ganiyem-error');
const Error = require('../../lib/error');
const ServerError = require('../../lib/serverError');

/**
 */
describe('serverError', () => {
	/**
	 */
	it('instance of RuntimeError', () => {
		let error = new ServerError();
		assert.ok(error instanceof RuntimeError);
	});

	/**
	 */
	it('instance of Error', () => {
		let error = new ServerError();
		assert.ok(error instanceof Error);
	});

	/**
	 */
	it('new ServerError().name === "ServerError"', () => {
		let error = new ServerError();
		assert.strictEqual(error.name, 'ServerError');
	});

	/**
	 */
	it('new ServerError().status === 500', () => {
		let error = new ServerError();
		assert.strictEqual(error.status, 500);
	});

	/**
	 */
	it('new ServerError().message === ""', () => {
		let error = new ServerError();
		assert.strictEqual(error.message, '');
	});

	/**
	 */
	it('new ServerError().headers === {Null}', () => {
		let error = new ServerError();
		assert.ok(!!error.headers);
		assert.strictEqual(Object.keys(error.headers).length, 0);
	});

	/**
	 */
	it('new ServerError(#status).status === #status', () => {
		assert.strictEqual(new ServerError(500).status, 500);
		assert.strictEqual(new ServerError('599').status, 599);
		assert.strictEqual(new ServerError(400).status, 500);
		assert.strictEqual(new ServerError('400').status, 500);
		assert.strictEqual(new ServerError(399).status, 500);
		assert.strictEqual(new ServerError('600').status, 500);
	});

	/**
	 */
	it('new ServerError(#headers).status === #headers', () => {
		let headers = {};
		let error = new ServerError(void 0, 'ServerError', headers);
		assert.strictEqual(error.status, 500);
		assert.strictEqual(error.message, 'ServerError');
		assert.strictEqual(error.headers, headers);
	});

	/**
	 */
	it('new ServerError(500...599).isServerError === true', () => {
		assert.ok(new ServerError(500).isServerError);
		assert.ok(new ServerError(599).isServerError);
		assert.ok(new ServerError(400).isClientError === false);
		assert.ok(new ServerError(499).isClientError === false);
	});
});