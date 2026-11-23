import { newSpecPage } from '@stencil/core/testing';
import { UiXStack } from '../ui-xstack';
import { describe, expect, it } from '@stencil/vitest';

describe('ui-xstack', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiXStack],
      html: `<ui-xstack></ui-xstack>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-xstack>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-xstack>
    `);
  });
});
