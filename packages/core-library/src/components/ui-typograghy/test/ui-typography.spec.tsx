import { newSpecPage } from '@stencil/core/testing';
import { UITypography } from '../ui-typography';
import { describe, expect, it } from '@stencil/vitest';

describe('ui-typograghy', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UITypography],
      html: `<ui-typograghy></ui-typograghy>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-typography>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-typography>
    `);
  });
});
