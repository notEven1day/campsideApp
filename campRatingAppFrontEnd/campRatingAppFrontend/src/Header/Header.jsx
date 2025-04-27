import {useDispatch, useSelector} from 'react-redux'; // Use useSelector to access the Redux store
import {Link, useNavigate} from 'react-router-dom'; // For navigation between pages
import './Header.css';
import {clearUser} from "../userSlice.js"; // Assume you have styles for your header

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;


    function handleLogOut()
    {
        if(window.confirm("Are you sure you want ot log out?"))
        {
            dispatch(clearUser());
            navigate(`/`);
        }

    }
    return (
        <div className="header">
            <div className="logo">
                <Link to="/home"><h1>Camp Rating App</h1></Link>
            </div>

            <div>

                <Link to="/MyReviews">
                    <div>My reviews</div>
                </Link>
            </div>


            <nav className="nav">
                {user ? (
                    <>
                        <div className="profile">
                            <div style={{ cursor: 'pointer' }} onClick={handleLogOut}>Log out</div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </nav>

        </div>
    );
};

export default Header;
