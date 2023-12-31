import { FC } from "react"
import { BlankBackdrop } from "../common/BlankBackdrop";
import '../../css/ls.css';

interface BookmarkMenuProps {
  position: {x: number;
             y: number;
            };
  deleteBookmark: () => void;
  hideSelf: () => void;
}
export const BookmarkMenu:FC<BookmarkMenuProps> = ({ position, deleteBookmark, hideSelf }) => {
  const menuCss: React.CSSProperties = { position: 'absolute',
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    backgroundColor: '#292828',
                    opacity: 0.9, 
                    border: '1px #c4c4c4',
                    padding: '5px',
                    borderRadius: '6px',
                  }

  return (
    <BlankBackdrop hideSelf={hideSelf}>
      <div style={menuCss}>
        <ol>
          <li className='bookmark-menu-item'>
            <button onClick={deleteBookmark}>
              delete
            </button>
          </li>
        </ol>
      </div>
    </BlankBackdrop>

  )
}