import { Link } from "react-router-dom";
import { StyledMenu } from "./styles";

const Menu = ({ open }) => {
    return (
      <StyledMenu open={open}>
          <Link className='link' to='/login' onClick={open}>👤 Login</Link>
          <Link className='link' to='/search' onClick={open}>🔍 Search</Link>
          <Link className="link" to='/result' onClick={open}>🏆 Leader Board</Link>
          <Link className="link" to='/game-display' onClick={open}>🃏 Play</Link>
      </StyledMenu>
    )
  }

  export default Menu;