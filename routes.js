import express from "express";
import axios from "axios";
import request from "request";
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

router.patch("/wounds/:id", (req, res) => {
  const woundID = req.params.id;
  req.body.id = req.body.id.toString();
  let body = {
    data: {
      type: req.body.type,
      id: req.body.id.toString(),
      attributes: { resolved: req.body.attributes.resolved }
    }
  };
  body = `${JSON.stringify(body)}`;
  console.log(body);
  var options = {
    method: "PATCH",
    url: "http://0.0.0.0:3000/wounds/1",
    headers: {
      "Postman-Token": "122cff68-a047-4803-b6d2-442881da7368",
      "Cache-Control": "no-cache"
    },
    body
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    res.status(200).json(body);
  });
});

module.exports = router;
