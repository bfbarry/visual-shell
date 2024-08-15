import { FC } from "react"
import { Backdrop } from "../common/Backdrop";
import '../../css/ls.css';

interface LsWindowMenuProps {
  position: {x: number;
             y: number;
            };
  hideSelf: () => void;
}
export const LsWindowMenu:FC<LsWindowMenuProps> = ({ position, hideSelf }) => {
  const menuCss: React.CSSProperties = { position: 'absolute',
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    backgroundColor: '#292828',
                    opacity: 0.9, 
                    border: '1px #c4c4c4',
                    padding: '5px',
                    borderRadius: '6px',
                  }

  const attachHandler = () => {
    // TODO
  }

  const menuActions = {
    'attach handler': attachHandler
  }
  return (
    <Backdrop hideSelf={hideSelf} menuType="CONTEXT_MENU">
      <div style={menuCss}>
        <ol>
          {Object.entries(menuActions).map(([k, v], ix) => (
              <li className='menu-item' key={ix}>
                <button onClick={v}>
                  {k}
                </button>
              </li>
              )
            )
          }
        </ol>
      </div>
    </Backdrop>

  )
}