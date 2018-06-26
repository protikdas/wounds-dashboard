import axios from "axios";

// const api_root = "http://localhost:5000/";

let api_root;

if (process.env.NODE_ENV === "development") {
  api_root = "http://localhost:5000/api/";
}

export default {
  patient: {
    getAll: () => {
      return axios
        .get(api_root + "patients")
        .then(res => {
          const data = (res || {}).data;
          if (data) {
            return data;
          } else {
            return [];
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getWounds: patientID => {
      return axios
        .get(api_root + `patients/${patientID}/wounds`)
        .then(res => {
          const data = (res || {}).data;
          console.log(res);
          if (data) {
            return data;
          } else {
            return [];
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
