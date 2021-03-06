/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {browser, by, element} from 'protractor';

import {verifyNoBrowserErrors} from './util';

describe('Hello world E2E Tests', function() {
  it('should display: Hello world! with static counter', function() {
    // Load the page without waiting for Angular since it is not bootstrapped automatically.
    browser.driver.get(browser.baseUrl + 'helloworld');


    const style = browser.driver.findElement(by.css('style[ng-transition="hlw"]'));
    expect(style.getText()).not.toBeNull();

    // Test the contents from the server.
    const serverDiv = browser.driver.findElement(by.css('div#name'));
    expect(serverDiv.getText()).toMatch('Hello world!');

    // Test the contents from the server.
    const counterDiv = browser.driver.findElement(by.css('div#counter'));
    expect(counterDiv.getText()).toMatch('Counter: 1');

    // Bootstrap the client side app.
    browser.executeScript('doBootstrap()');

    // Retest the contents after the client bootstraps.
    expect(element(by.css('div#name')).getText()).toMatch('Hello world!');
    expect(element(by.css('div#counter')).getText()).toMatch('Counter: 1');

    // Make sure the server styles got replaced by client side ones.
    expect(element(by.css('style[ng-transition="hlw"]')).isPresent()).toBeFalsy();
    expect(element(by.css('style')).getText()).toMatch('');

    // Make sure there were no client side errors.
    verifyNoBrowserErrors();
  });
});
