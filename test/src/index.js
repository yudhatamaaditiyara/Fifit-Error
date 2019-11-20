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
const error = require('../../');

describe('index', () => {
  it('must be typeof codes === "object"', () => {
    assert.ok(error.codes !== null && typeof error.codes == 'object');
  });

  it('must be typeof messages === "object"', () => {
    assert.ok(error.messages !== null && typeof error.messages == 'object');
  });

  it('must be valid codes', () => {
    assert.ok(Object.keys(error.codes).length > 0);
    for (let code in error.codes) {
      let constructor = error.codes[code];
      assert.ok(typeof constructor === 'function');

      let object = new constructor();
      let message = status.codes[code];

      assert.ok(object instanceof error.Error);
      assert.strictEqual(object.status, status.messages[message]);
      assert.strictEqual(object.message, message);

      if (status.isClientErrorStatus(code)) {
        assert.ok(object.isClientError);
        assert.ok(!object.isServerError);
        assert.ok(object instanceof error.ClientError);
      } else if (status.isServerErrorStatus(code)) {
        assert.ok(object.isServerError);
        assert.ok(!object.isClientError);
        assert.ok(object instanceof error.ServerError);
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

  it('must be valid messages', () => {
    assert.ok(Object.keys(error.messages).length > 0);
    for (let message in error.messages) {
      let constructor = error.messages[message];
      assert.ok(typeof constructor === 'function');

      let object = new constructor();
      let code = status.messages[message];

      assert.ok(object instanceof error.Error);
      assert.strictEqual(object.status, status.errorMessages[message]);
      assert.strictEqual(object.message, message);

      if (status.isClientErrorStatus(code)) {
        assert.ok(object.isClientError);
        assert.ok(!object.isServerError);
        assert.ok(object instanceof error.ClientError);
      } else if (status.isServerErrorStatus(code)) {
        assert.ok(object.isServerError);
        assert.ok(!object.isClientError);
        assert.ok(object instanceof error.ServerError);
      } else {
        assert.ok(false);
      }

      let headers = {};
      let instance = new constructor(code, headers);
      assert.strictEqual(instance.status, code);
      assert.strictEqual(instance.message, String(code));
      assert.strictEqual(instance.headers, headers);
    }
  });

  it('must be valid identifiers', () => {
    for (let code in status.errorClassNames) {
      let name = status.errorClassNames[code];
      assert.ok(typeof error[name] === 'function');

      let object = new error[name]();
      let message = status.errorCodes[code];

      assert.ok(object instanceof error.Error);
      assert.strictEqual(object.status, status.errorMessages[message]);
      assert.strictEqual(object.message, message);

      if (status.isClientErrorStatus(code)) {
        assert.ok(object.isClientError);
        assert.ok(!object.isServerError);
        assert.ok(object instanceof error.ClientError);
      } else if (status.isServerErrorStatus(code)) {
        assert.ok(object.isServerError);
        assert.ok(!object.isClientError);
        assert.ok(object instanceof error.ServerError);
      } else {
        assert.ok(false);
      }

      let headers = {};
      let instance = new error[name](code, headers);
      assert.strictEqual(instance.status, parseInt(code));
      assert.strictEqual(instance.message, code);
      assert.strictEqual(instance.headers, headers);
    }
  });
});