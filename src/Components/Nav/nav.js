import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
      <Link className='link' to='/login'>Login</Link>
      <Link className='link' to='/search'>Search</Link>
    </>
  )
}