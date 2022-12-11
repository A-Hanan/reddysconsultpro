import React, { useState, useEffect } from "react";
import styles from "../../styles/homeStyles/Home.module.css";
import Link from "next/link";
import Login from "../../pages/login";
import { useStateValue } from "../../StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../Actions/userActions";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [{ user, mobileViewShowDashboard, activeCategory }, dispatch] =
    useStateValue();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  useEffect(() => {
    console.log("router path", router);
    dispatch({
      type: "SET_MOBILE_VIEW_SHOW_DASH",
      mobileViewShowDashboard: false,
    });
    if (router.pathname == "/") {
      setShowNavigator(false);
    } else {
      setShowNavigator(true);
    }
  }, [router.pathname, activeCategory]);

  return (
    <>
      <div className={styles.nav__wrapper}>
        <div>
          {showNavigator && (
            <span
              className={styles.mobile__dashboard__navigator}
              onClick={() => {
                dispatch({
                  type: "SET_MOBILE_VIEW_SHOW_DASH",
                  mobileViewShowDashboard: mobileViewShowDashboard
                    ? false
                    : true,
                });
              }}
            >
              <FontAwesomeIcon
                icon={mobileViewShowDashboard ? faXmark : faBars}
              />
            </span>
          )}

          <Link
            href={user?.userType == "expert" ? "/upcoming-appointments" : "/"}
            style={{ textDecoration: "none" }}
          >
            <h1 className={styles.nav__logo__text}>
              <span className={styles.yellowText}>Consult</span>
              <span className={styles.blueText}>Pro</span>
            </h1>
          </Link>
        </div>
        <div className={styles.nav__buttons__wrapper}>
          {user?.id ? (
            <div className={styles.logout__box}>
              <h5>
                {user?.userType == "expert" ? (
                  user?.name
                ) : (
                  <>
                    {" "}
                    {user?.firstName} {user?.lastName}
                  </>
                )}
              </h5>
              <span onClick={() => logoutUser(dispatch, router)}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </div>
          ) : (
            <>
              {" "}
              <button
                className={styles.buttonOne}
                onClick={() => setShowAuthForm(true)}
              >
                Login/Signup
              </button>
              <button className={styles.buttonTwo}>Join as Expert</button>
            </>
          )}
        </div>
        {showAuthForm && (
          <Login setShowAuthForm={setShowAuthForm} fromNavbar={true} />
        )}
      </div>
    </>
  );
};

export default Navbar;
