import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/patients", (req, res) => {
  axios
    .get("http://0.0.0.0:3000/patients")
    .then(response => {
      let data = ((response || {}).data || {}).data;
      if (data) {
        res.status(200).json(response.data.data);
      } else {
        res
          .status(500)
          .json({ error: "Server Error. Patient records not found" });
      }
    })
    .catch(error => console.log(error));
});

router.get("/patients/:id/wounds", (req, res) => {
  const patientID = req.params.id;
  axios
    .get(`http://0.0.0.0:3000/patients/${patientID}/wounds`)
    .then(response => {
      let data = ((response || {}).data || {}).data;
      if (data) {
        res.status(200).json(response.data.data);
      } else {
        res
          .status(500)
          .json({ error: "Server Error. Patient records not found" });
      }
    })
    .catch(error => console.log(error));
});

module.exports = router;
