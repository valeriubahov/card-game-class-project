import { Link } from "react-router-dom";
import { StyledMenu } from "./styles";

const Menu = ({ open }) => {
    return (
      <StyledMenu open={open}>
          <Link className='link' to='/login'>👤 Login</Link>
          <Link className='link' to='/search'>🔍 Search</Link>
          <Link className="link" to='/result'>🏆 Leader Board</Link>
          <Link className="link" to='/game-display'>🃏 Play</Link>
      </StyledMenu>
    )
  }

  export default Menu;