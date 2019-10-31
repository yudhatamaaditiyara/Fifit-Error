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
const ClientError = require('../../lib/clientError');

/**
 */
describe('clientError', () => {
	/**
	 */
	it('instance of RuntimeError', () => {
		let error = new ClientError();
		assert.ok(error instanceof RuntimeError);
	});

	/**
	 */
	it('instance of Error', () => {
		let error = new ClientError();
		assert.ok(error instanceof Error);
	});

	/**
	 */
	it('new ClientError().name === "ClientError"', () => {
		let error = new ClientError();
		assert.strictEqual(error.name, 'ClientError');
	});

	/**
	 */
	it('new ClientError().status === 400', () => {
		let error = new ClientError();
		assert.strictEqual(error.status, 400);
	});

	/**
	 */
	it('new ClientError().message === ""', () => {
		let error = new ClientError();
		assert.strictEqual(error.message, '');
	});

	/**
	 */
	it('new ClientError().headers === {Null}', () => {
		let error = new ClientError();
		assert.ok(!!error.headers);
		assert.strictEqual(Object.keys(error.headers).length, 0);
	});

	/**
	 */
	it('new ClientError(#status).status === #status', () => {
		assert.strictEqual(new ClientError(400).status, 400);
		assert.strictEqual(new ClientError('499').status, 499);
		assert.strictEqual(new ClientError(599).status, 400);
		assert.strictEqual(new ClientError('599').status, 400);
		assert.strictEqual(new ClientError(399).status, 400);
		assert.strictEqual(new ClientError('600').status, 400);
	});

	/**
	 */
	it('new ClientError(#headers).status === #headers', () => {
		let headers = {};
		let error = new ClientError(void 0, 'ClientError', headers);
		assert.strictEqual(error.status, 400);
		assert.strictEqual(error.message, 'ClientError');
		assert.strictEqual(error.headers, headers);
	});

	/**
	 */
	it('new ClientError(400...499).isClientError === true', () => {
		assert.ok(new ClientError(400).isClientError);
		assert.ok(new ClientError(499).isClientError);
		assert.ok(new ClientError(400).isServerError === false);
		assert.ok(new ClientError(499).isServerError === false);
	});
});