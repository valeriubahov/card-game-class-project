import React, { useState, useRef } from 'react';
import Burger from './burgerMenu';
import Menu from './menu';
import { useOnClickOutside } from './menuHook';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  const closeMenuOnClick = (node) => {
      setOpen(!open)
    };

    return (
      <>
        <div ref={node}>
          <Burger open={open} setOpen={closeMenuOnClick} />
          <Menu open={open} setOpen={closeMenuOnClick} />
        </div>
      </>
    )
  }