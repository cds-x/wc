import {
  testBundleSize,
  testRenderTime,
  html,
} from 'web-test-runner-performance/browser.js';
import '@cdx/skiplink/register.js';
import { expect } from '@open-wc/testing';

describe('cdx-skiplink performance', () => {
  const skiplink = html`<cdx-skiplink></cdx-skiplink>`;

  it(`should bundle and treeshake skiplink`, async () => {
    expect(
      (await testBundleSize('@cds/skiplink/register.js', { optimize: true })).kb
    ).lessThan(13);
  });

  // it(`should render 1 skiplink under 20ms`, async () => {
  //   expect((await testRenderTime(skiplink)).duration).lessThan(33);
  // });
  //
  // it(`should render 100 badges under 50ms`, async () => {
  //   expect((await testRenderTime(skiplink)).duration).lessThan(50);
  // });
});
