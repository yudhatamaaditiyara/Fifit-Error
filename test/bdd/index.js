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
const status = require('fifit-util-status');
const errors = require('../../');

/**
 */
describe('index', () => {
	/**
	 */
	it('typeof(errors.codes) === "object"', () => {
		assert.ok(errors.codes !== null && typeof errors.codes == 'object');
	});

	/**
	 */
	it('typeof(errors.messages) === "object"', () => {
		assert.ok(errors.messages !== null && typeof errors.messages == 'object');
	});

	/**
	 */
	it('errors.codes', () => {
		for (let code in errors.codes) {
			let constructor = errors.codes[code];
			assert.ok(typeof constructor === 'function');

			let error = new constructor();
			let message = status.codes[code];

			assert.ok(error instanceof errors.Error);
			assert.strictEqual(error.status, parseInt(code));
			assert.strictEqual(error.message, message);
			
			if (status.isClientErrorStatus(code)) {
				assert.ok(error.isClientError);
				assert.ok(!error.isServerError);
				assert.ok(error instanceof errors.ClientError);
			} else if (status.isServerErrorStatus(code)) {
				assert.ok(error.isServerError);
				assert.ok(!error.isClientError);
				assert.ok(error instanceof errors.ServerError);
			} else {
				assert.ok(false);
			}

			let headers = {};
			let instance = new constructor(code, headers);
			assert.strictEqual(instance.status, parseInt(code));
			assert.strictEqual(instance.message, code);
			assert.strictEqual(instance.headers, headers);
		}
	});

	/**
	 */
	it('errors.messages', () => {
		for (let message in errors.messages) {
			let constructor = errors.messages[message];
			assert.ok(typeof constructor === 'function');

			let error = new constructor();
			let code = status.messages[message];

			assert.ok(error instanceof errors.Error);
			assert.strictEqual(error.status, parseInt(code));
			assert.strictEqual(error.message, message);
			
			if (status.isClientErrorStatus(code)) {
				assert.ok(error.isClientError);
				assert.ok(!error.isServerError);
				assert.ok(error instanceof errors.ClientError);
			} else if (status.isServerErrorStatus(code)) {
				assert.ok(error.isServerError);
				assert.ok(!error.isClientError);
				assert.ok(error instanceof errors.ServerError);
			} else {
				assert.ok(false);
			}

			let headers = {};
			let instance = new constructor(code, headers);
			assert.strictEqual(instance.status, parseInt(code));
			assert.strictEqual(instance.message, code);
			assert.strictEqual(instance.headers, headers);
		}
	});

	/**
	 */
	it('errors.#identifiers', () => {
		for (let code in status.identifiers) {
			let identifier = status.identifiers[code];
			if (!status.isErrorStatus(code)) {
				continue;
			}

			let name = !/Error$/.test(identifier) ? (identifier + 'Error') : identifier;
			let constructor = errors[name];
			
			assert.ok(typeof constructor === 'function');

			let error = new constructor();
			let message = status.codes[code];

			assert.ok(error instanceof errors.Error);
			assert.strictEqual(error.status, parseInt(code));
			assert.strictEqual(error.message, message);
			
			if (status.isClientErrorStatus(code)) {
				assert.ok(error.isClientError);
				assert.ok(!error.isServerError);
				assert.ok(error instanceof errors.ClientError);
			} else if (status.isServerErrorStatus(code)) {
				assert.ok(error.isServerError);
				assert.ok(!error.isClientError);
				assert.ok(error instanceof errors.ServerError);
			} else {
				assert.ok(false);
			}

			let headers = {};
			let instance = new constructor(code, headers);
			assert.strictEqual(instance.status, parseInt(code));
			assert.strictEqual(instance.message, code);
			assert.strictEqual(instance.headers, headers);
		}
	});
});