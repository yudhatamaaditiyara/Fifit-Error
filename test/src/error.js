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

describe('Error', () => {
  it('must be instanceof RuntimeError', () => {
    let error = new Error();
    assert.ok(error instanceof RuntimeError);
  });

  it('must be new Error().name === "Error"', () => {
    let error = new Error();
    assert.strictEqual(error.name, 'Error');
  });

  it('must be new Error().status === 500', () => {
    let error = new Error();
    assert.strictEqual(error.status, 500);
  });

  it('must be new Error().message === ""', () => {
    let error = new Error();
    assert.strictEqual(error.message, '');
  });

  it('must be new Error().headers === Object.create(null)', () => {
    let error = new Error();
    assert.ok(!!error.headers);
    assert.strictEqual(Object.keys(error.headers).length, 0);
  });

  it('must be new Error(#status).status === #status', () => {
    assert.strictEqual(new Error(400).status, 400);
    assert.strictEqual(new Error('400').status, 400);
    assert.strictEqual(new Error(599).status, 599);
    assert.strictEqual(new Error('599').status, 599);
    assert.strictEqual(new Error(399).status, 500);
    assert.strictEqual(new Error('600').status, 500);
  });

  it('must be new Error(#headers).headers === #headers', () => {
    let headers = {};
    let error = new Error(void 0, 'Error', headers);
    assert.strictEqual(error.status, 500);
    assert.strictEqual(error.message, 'Error');
    assert.strictEqual(error.headers, headers);
  });

  it('must be new Error(400...499).isClientError === true', () => {
    for (let i = 400; i < 500; ++i) {
      assert.ok(new Error(i).isClientError);
      assert.strictEqual(new Error(i).status, i);
      assert.ok(new Error(i).isServerError === false);
    }
  });

  it('must be new Error(500...599).isServerError === true', () => {
    for (let i = 500; i < 600; ++i) {
      assert.ok(new Error(i).isServerError);
      assert.strictEqual(new Error(i).status, i);
      assert.ok(new Error(i).isClientError === false);
    }
  });
});