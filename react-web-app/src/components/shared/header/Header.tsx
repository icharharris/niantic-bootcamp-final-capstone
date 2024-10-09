import { Link, NavLink } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/features/authentication-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Header() {

    const dispatch = useAppDispatch()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)

    function handleLogout()
    {
        localStorage.removeItem('user')
        dispatch(logout()) 
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">getTapped</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/breweries">Breweries</NavLink>
                        </li>
                        {isAuthenticated && user?.authorities?.some(auth => auth.name ==='ROLE_USER') && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>
                        )}
                        {isAuthenticated && user?.authorities?.some(auth => auth.name ==='ROLE_ADMIN') && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">Admin Dashboard</NavLink>
                            </li>
                        )}
                        {isAuthenticated && user?.authorities?.some(auth => auth.name ==='ROLE_BREWER') && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/brewers">Brewer Dashboard</NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                        )}

                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <p className="nav-link">Welcome, {user?.username}</p>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}