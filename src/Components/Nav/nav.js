import React, { useRef, useState } from 'react';
import Burger from './burgerMenu';
import Menu from './menu';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const node = useRef();

  // const useOnClickOutside = (ref, handler) => {
  //   React.useEffect(() => {
  //     const listener = event => {
  //       if (!ref.current || ref.current.contains(event.target)) {
  //         return;
  //       }
  //       handler(event);
  //     };
  //     document.addEventListener('mousedown', listener);
  
  //     return () => {
  //       document.removeEventListener('mousedown', listener);
  //     };
  //   },
  //   [ref, handler],
  //   );
  // };

  return (
    <>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </>
  )
}

