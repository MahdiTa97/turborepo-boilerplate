'use client';

import type { ReactNode } from 'react';
import { Button, Menu, Navbar as NavbarDaisyui } from 'react-daisyui';

export function Navbar({ title }: { title: string }): ReactNode {
  return (
    <NavbarDaisyui className="bg-base-100 rounded-box shadow-xl">
      <NavbarDaisyui.Start>
        <div className="flex-1">
          <Button className="text-xl normal-case" color="ghost" tag="a">
            {title}
          </Button>
        </div>
      </NavbarDaisyui.Start>
      <NavbarDaisyui.End>
        <div className="flex-none">
          <Menu className="px-1" horizontal>
            <Menu.Item>
              <a href="/">Link</a>
            </Menu.Item>
            <Menu.Item>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 p-2">
                  <li>
                    <a href="/">Link 1</a>
                  </li>
                  <li>
                    <a href="/">Link 2</a>
                  </li>
                </ul>
              </details>
            </Menu.Item>
          </Menu>
        </div>
      </NavbarDaisyui.End>
    </NavbarDaisyui>
  );
}
