import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';

import { UIMenuItem } from './ui-menu.types';

@Component({
  tag: 'ui-menu',
  styleUrl: 'ui-menu.scss',
  shadow: true,
})
export class UIMenu {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() data: UIMenuItem[] = [];
  @Prop() position: { x: number; y: number } | null = null;

  @Event() close?: EventEmitter<void>;

  private menuRef?: HTMLUListElement;
  private cleanup?: () => void;

  componentDidLoad() {
    this.updateMenu();
  }

  disconnectedCallback() {
    this.cleanup?.();
  }

  @Watch('open')
  @Watch('data')
  updateMenu() {
    if (!this.menuRef) return;

    if (this.open && this.data?.length) {
      this.show();
    } else {
      this.hide();
    }
  }

  private async positionMenu() {
    if (!this.menuRef) return;

    if (this.position) {
      Object.assign(this.menuRef.style, {
        position: 'fixed',
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
      });
      return;
    }

    const { x, y } = await computePosition(this.host, this.menuRef, {
      placement: 'bottom-start',
      strategy: 'fixed',
      middleware: [offset(6), flip(), shift({ padding: 5 })],
    });

    Object.assign(this.menuRef.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  private show() {
    if (!this.menuRef) return;

    this.menuRef.style.display = 'block';

    if (!this.menuRef.matches(':popover-open')) {
      this.menuRef.showPopover();
    }

    this.cleanup?.();

    this.cleanup = autoUpdate(this.host, this.menuRef, () => void this.positionMenu());
  }

  private hide() {
    if (!this.menuRef) return;
    const wasOpen = this.menuRef.matches(':popover-open');

    if (wasOpen) {
      this.menuRef.hidePopover();
      this.close?.emit();
    }

    this.menuRef.style.display = 'none';

    this.cleanup?.();
    this.cleanup = undefined;
  }

  private onItemClick(event: MouseEvent, item: UIMenuItem) {
    item.onClick?.(event);
    this.open = false;
  }

  private renderItem(item: UIMenuItem) {
    return (
      <li role="none" id={item.id}>
        <button type="button" role="menuitem" onClick={(event: MouseEvent) => this.onItemClick(event, item)}>
          {item.icon && <span>{item.icon}</span>}
          {item.label}
        </button>
      </li>
    );
  }

  render() {
    return (
      <Host>
        <slot />

        <ul ref={el => (this.menuRef = el)} popover="auto" role="menu">
          {this.data?.map(item => this.renderItem(item))}
        </ul>

        {this.open && <div class="backdrop" onClick={() => (this.open = false)} />}
      </Host>
    );
  }
}
