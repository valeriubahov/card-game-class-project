import { Link } from "react-router-dom";
import { StyledMenu } from "./styles";

const Menu = ({ open, setOpen }) => {
    return (
      <StyledMenu open={open}>
          <Link className='link' to='/login' onClick={setOpen}>👤 Login</Link>
          <Link className='link' to='/search' onClick={setOpen}>🔍 Search</Link>
          <Link className="link" to='/result' onClick={setOpen}>🏆 Leader Board</Link>
          <Link className="link" to='/game-display' onClick={setOpen}>🃏 Play</Link>
      </StyledMenu>
    )
  }

  export default Menu;