import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header className="w-full bg-gray-700">
      <nav>
        <ul className="flex gap-x-4 px-4 py-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/deposit-usdc"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Deposit USDC
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/deposit-ethiq"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Deposit Ethiq
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/check-balance"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Check Balance
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pay-ethiq"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Pay ETHIQ
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pay-usdc"
              className={({ isActive }) =>
                isActive ? 'border-b-2 pb-1 border-indigo-600' : undefined
              }
            >
              Pay USDC
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
