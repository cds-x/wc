/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import 'lib/skiplink/register.js';
import { html } from 'lit';

export default {
  title: 'Stories/Skiplink',
  component: 'cdx-skiplink',
};

export const basic = () => {
  return html`
    <cdx-skiplink target="content">I am Skiplink</cdx-skiplink>
    <p>Hello</p>
    <p>Goodbye</p>
    <main id="content">
      I am the main content.
    </main>
  `;
}
