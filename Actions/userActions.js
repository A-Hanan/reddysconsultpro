import api from "../utils/api";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
const sendVerificationEmail = (currentUser, router) => {
  console.log("running");

  const body = {
    _id: currentUser.id,
    email: currentUser.email,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
  };
  console.log(body);
  api
    .post("/auth/send-verify-email", body)
    .then((res) => {
      console.log("res from sending verif email>>", res);
      router.push("/verify-your-account/" + currentUser?.id);
    })
    .catch((err) => console.log(err));
};

export const registerUser = async (user, router) => {
  //   dispatch({ type: "USER_REGISTER_REQUEST" });
  console.log("user at userActions >>> ", user);

  try {
    const response = await api.post("/auth/createUser", user);
    if (response?.data == "Sorry a user with email already exits") {
      swalWithBootstrapButtons.fire(
        "Registeration Unsuccessful!",
        "Sorry a user with email already exits",
        "error"
      );
      return;
    }
    setTimeout(() => {
      console.log("response at register>>>", response);
    }, 1000);

    let currentUser = {
      id: response.data.data.user.id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
    sendVerificationEmail(currentUser, router);
    Swal.fire("Registered Successfully!", "Click to Login", "success");
    router.push("/verify-your-account/" + currentUser?.id);
    // window.location.reload();
  } catch (error) {
    console.log("error at register>>>", error);
    swalWithBootstrapButtons.fire(
      "Registeration Unsuccessful!",
      "Something goes wrong",
      "error"
    );
  }
};

export const loginUser = async (
  user,
  router,
  dispatch,
  fromNavbar,
  setShowAuthForm
) => {
  console.log("user request at loginUserAction>>> ", user);
  try {
    const response = await api.post("/auth/login", user);
    let userData = response.data.userData;
    userData = Object.assign(userData, { userType: "user" });
    console.log("userdata at login>>>", userData);

    // localStorage.setItem("token", response.data.authtoken);
    // dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    // localStorage.setItem("currentUser", JSON.stringify(userData));
    // return;
    if (userData?.verified) {
      dispatch({
        type: "SET_USER",
        user: userData,
      });
      localStorage.setItem("consult_pro_user", JSON.stringify(userData));
      Swal.fire("Logged in! ", "success");
      if (fromNavbar) {
        setShowAuthForm(false);
      }
      router.push("/");
    } else {
      sendVerificationEmail(userData, router);
      // router.push("/verify-your-account/" + userData?.id);
    }
  } catch (error) {
    console.log("error", error);
    swalWithBootstrapButtons.fire(
      "login Unsuccessful!",
      "incorrect information",
      "error"
    );
  }
};

export const logoutUser = (dispatch, router) => {
  dispatch({
    type: "SET_USER",
    user: {},
  });
  router.push("/");
  localStorage.setItem("consult_pro_user", "");
  Swal.fire("Logged Out! ", "success");
};
export const loginExpert = async (
  user,
  router,
  dispatch,
  fromNavbar,
  setShowAuthForm
) => {
  console.log("user request at loginUserAction>>> ", user);
  try {
    const response = await api.post("/experts/login", user);
    let userData = response.data.userData;
    userData = Object.assign(userData, {
      userType: "expert",
      id: userData?._id,
    });
    console.log("userdata at login>>>", userData);

    // localStorage.setItem("token", response.data.authtoken);
    // dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    // localStorage.setItem("currentUser", JSON.stringify(userData));
    // return;
    // if (userData?.verified) {
    dispatch({
      type: "SET_USER",
      user: userData,
    });
    localStorage.setItem("consult_pro_user", JSON.stringify(userData));
    Swal.fire("Logged in! ", "success");
    if (fromNavbar) {
      setShowAuthForm(false);
    }
    router.push("/upcoming-appointments");
    // } else {
    //   sendVerificationEmail(userData, router);
    //   // router.push("/verify-your-account/" + userData?.id);
    // }
  } catch (error) {
    console.log("error", error);
    swalWithBootstrapButtons.fire(
      "login Unsuccessful!",
      "incorrect information",
      "error"
    );
  }
};

/*
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    alert("User deleted successfully!!!");
    window.location.reload();
  } catch (error) {
    alert("Something went wrong!!!");
    console.log(error);
  }
};
*/
