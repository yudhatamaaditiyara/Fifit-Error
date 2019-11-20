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

describe('ServerError', () => {
  it('must be instanceof RuntimeError', () => {
    let error = new ServerError();
    assert.ok(error instanceof RuntimeError);
  });

  it('must be instanceof Error', () => {
    let error = new ServerError();
    assert.ok(error instanceof Error);
  });

  it('must be new ServerError().name === "ServerError"', () => {
    let error = new ServerError();
    assert.strictEqual(error.name, 'ServerError');
  });

  it('must be new ServerError().status === 500', () => {
    let error = new ServerError();
    assert.strictEqual(error.status, 500);
  });

  it('must be new ServerError().message === ""', () => {
    let error = new ServerError();
    assert.strictEqual(error.message, '');
  });

  it('must be new ServerError().headers === Object.create(null)', () => {
    let error = new ServerError();
    assert.ok(!!error.headers);
    assert.strictEqual(Object.keys(error.headers).length, 0);
  });

  it('must be new ServerError(#status).status === #status', () => {
    assert.strictEqual(new ServerError(500).status, 500);
    assert.strictEqual(new ServerError('599').status, 599);
    assert.strictEqual(new ServerError(400).status, 500);
    assert.strictEqual(new ServerError('400').status, 500);
    assert.strictEqual(new ServerError(399).status, 500);
    assert.strictEqual(new ServerError('600').status, 500);
  });

  it('must be new ServerError(#headers).headers === #headers', () => {
    let headers = {};
    let error = new ServerError(void 0, 'ServerError', headers);
    assert.strictEqual(error.status, 500);
    assert.strictEqual(error.message, 'ServerError');
    assert.strictEqual(error.headers, headers);
  });

  it('must be new ServerError(400...499).isClientError === false', () => {
    for (let i = 400; i < 500; ++i) {
      assert.ok(new ServerError(i).isServerError);
      assert.strictEqual(new ServerError(i).status, 500);
      assert.ok(new ServerError(i).isClientError === false);
    }
  });

  it('must be new ServerError(500...599).isServerError === true', () => {
    for (let i = 500; i < 600; ++i) {
      assert.ok(new ServerError(i).isServerError);
      assert.strictEqual(new ServerError(i).status, i);
      assert.ok(new ServerError(i).isClientError === false);
    }
  });
});