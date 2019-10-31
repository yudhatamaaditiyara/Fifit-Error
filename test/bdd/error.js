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

/**
 */
describe('error', () => {
	/**
	 */
	it('instance of RuntimeError', () => {
		let error = new Error();
		assert.ok(error instanceof RuntimeError);
	});

	/**
	 */
	it('new Error().name === "Error"', () => {
		let error = new Error();
		assert.strictEqual(error.name, 'Error');
	});

	/**
	 */
	it('new Error().status === 500', () => {
		let error = new Error();
		assert.strictEqual(error.status, 500);
	});

	/**
	 */
	it('new Error().message === ""', () => {
		let error = new Error();
		assert.strictEqual(error.message, '');
	});

	/**
	 */
	it('new Error().headers === {Null}', () => {
		let error = new Error();
		assert.ok(!!error.headers);
		assert.strictEqual(Object.keys(error.headers).length, 0);
	});

	/**
	 */
	it('new Error(#status).status === #status', () => {
		assert.strictEqual(new Error(400).status, 400);
		assert.strictEqual(new Error('400').status, 400);
		assert.strictEqual(new Error(599).status, 599);
		assert.strictEqual(new Error('599').status, 599);
		assert.strictEqual(new Error(399).status, 500);
		assert.strictEqual(new Error('600').status, 500);
	});

	/**
	 */
	it('new Error(#headers).status === #headers', () => {
		let headers = {};
		let error = new Error(void 0, 'Error', headers);
		assert.strictEqual(error.status, 500);
		assert.strictEqual(error.message, 'Error');
		assert.strictEqual(error.headers, headers);
	});

	/**
	 */
	it('new Error(400...499).isClientError === true', () => {
		assert.ok(new Error(400).isClientError);
		assert.ok(new Error(499).isClientError);
		assert.ok(new Error(400).isServerError === false);
		assert.ok(new Error(499).isServerError === false);
	});

	/**
	 */
	it('new Error(500...599).isClientError === true', () => {
		assert.ok(new Error(500).isServerError);
		assert.ok(new Error(599).isServerError);
		assert.ok(new Error(500).isClientError === false);
		assert.ok(new Error(599).isClientError === false);
	});
});