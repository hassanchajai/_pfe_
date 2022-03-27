
const Client = require("../models/Client.model");


// get all Clients
exports.get_all = function (req, res) {
  Client.find({})
    .then((Clients) => {
      // Check if Clients exists

      if (!Clients || Clients.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Client found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Clients: Clients,
        });
      }
    }) 
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for Clients",
      })
    );
};

// // get one Client
exports.get_one = function (req, res) {


  // Find account with matching id
  Client.findById(req.params.id)
    .then((Client) => {
      if (!Client) {
        res.status(400).send({
          status: false,
          message: "Client doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Client: Client,
        });
      }
    })
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for Client",
      })
    );
};

// add a Client

exports.add = async function (req, res) {
  let newClient = new Client({...req.body});
  newClient
    .save()
    .then((Client) => {
      return res.status(200).send({
        status: true,
        message: "Client added successfully",
        Client,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: false,
        message: err,
      });
    });
};

// update a Client
exports.update =async function (req, res) {

//   get the old proudct with id 
  const oldClient = await Client.findById(req.params.id);
  if (!oldClient) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Client with id " + req.params.id,
    });
  }
    oldClient.update( req.body, async (err, docs) => {
    if (err) {
      return res.status(200).send({
        status: false,
        message: err,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Client updated succefully!",
    });
  });
};

// // delete a Client: change status to deleted
exports.delete = function (req, res) {

  // Find Client by id
  Client.findById(req.params.id)
    .then((Client) => {
      if (!Client) {
        res.status(400).send({
          status: false,
          message: "Client doesn't exist",
        });
      } else {
    
        Client
          .delete()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Client successfuly deleted",
            })
          )
          .catch(() =>
            res.status(500).send({
              status: false,
              message: "error while saving changes to db",
            })
          );
      }
    })
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searshing for Client",
      })
    );
};


  