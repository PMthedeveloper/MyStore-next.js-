import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';

const Navbar = () => {
  const router = useRouter();
  const cookieUser = parseCookies();
  const user = cookieUser.user ? JSON.parse(cookieUser.user) : ""

  function isActive(route) {
    if (route == router.pathname) {
      return 'active'
    }
    else ""
  }

  return (
    <nav>
      <div className="nav-wrapper #ba68c8 purple lighten-2">
        <Link href="/">
          <a className="brand-logo left">My Store</a></Link>
        <ul id="nav-mobile" className="right">
          <li className={isActive("/cart")}> <Link href="/cart">Cart</Link>  </li>

          {
            (user.role == 'admin' || user.role == 'root') &&
            <li className={isActive("/create")}> <Link href="/create">Create</Link>  </li>
          }

          {user
            ?
            <>
              <li className={isActive("/account")}> <Link href="/account">Account</Link>  </li>
              <li> <button className="btn red" onClick={() => {
                cookie.remove("token");
                cookie.remove("user");
                router.push('/login');
              }} >Logout</button>  </li>
            </>
            :
            <>
              <li className={isActive("/login")}> <Link href="/login">Login</Link>  </li>
              <li className={isActive("/signup")}> <Link href="/signup">Signup</Link>  </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;