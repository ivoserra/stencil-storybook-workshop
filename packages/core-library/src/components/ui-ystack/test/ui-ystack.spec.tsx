import { newSpecPage } from '@stencil/core/testing';
import { UiYStack } from '../ui-ystack';
import { describe, expect, it } from '@stencil/vitest';

describe('ui-ystack', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiYStack],
      html: `<ui-ystack></ui-ystack>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-ystack>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-ystack>
    `);
  });
});
