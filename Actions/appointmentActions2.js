import api from "../utils/api";
import Swal from "sweetalert2";
export const cancelAppointment = async (id, router) => {
  try {
    const body = {
      appointmentId: id,
      status: "Cancelled",
    };
    console.log("body:", body);

    const appointment = await api
      .put("/appointment/update", body)
      .then((res) => {
        let app = res.data;
      });
    Swal.fire("Cancelled! ", "success");
    router.push("/experts");
  } catch (error) {
    console.log(error.message);
  }
};
