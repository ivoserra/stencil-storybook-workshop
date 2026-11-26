import { Component, Host, h, Prop } from '@stencil/core';
import { UIMenuItem } from './ui-menu.types';

@Component({
  tag: 'ui-menu',
  styleUrl: 'ui-menu.scss',
  shadow: true,
})
export class UIMenu {
  @Prop() data?: UIMenuItem[] = [];

  private renderItem(item: UIMenuItem) {
    return (
      <li role="menuitem" id={item?.id} >
        <button onClick={item.onClick} type="button">
          {item.icon && <span>{item.icon}</span>}
           <span>{item.label}</span>
        </button>

      </li>
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <ul popover="true" role="menu">
          {this.data?.map((item, index) => this.renderItem(item, index))}
        </ul>
      </Host>
    );
  }
}
