import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ClientDetail = () => {
  const statesCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner"],
    WestBengal: ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Rohtak", "Karnal"],
    MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
    AndhraPradesh: [
      "Vijayawada",
      "Visakhapatnam",
      "Guntur",
      "Tirupati",
      "Kakinada",
    ],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    Delhi: ["New Delhi", "Dwarka", "Saket", "Rohini", "Janakpuri"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tinsukia"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital"],
    HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
    JammuAndKashmir: ["Srinagar", "Jammu", "Leh", "Anantnag", "Baramulla"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Kakching", "Churachandpur"],
    ArunachalPradesh: ["Itanagar", "Tawang", "Pasighat", "Ziro", "Roing"],
    Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon"],
    Sikkim: ["Gangtok", "Namchi", "Pelling", "Ravangla", "Gyalshing"],
  };

  const states = Object.keys(statesCities);

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const { clientId } = useParams();
  const [client, setClient] = useState({
    branches: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [branchForm, setBranchForm] = useState({
    city: "",
    fullAddress: "",
    state: "",
    clientId: clientId,
  });

  const handleInput = (e) => {
    setBranchForm({ ...branchForm, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleBranchModalClose = () => setShowBranchModal(false);
  const handleBranchModalShow = () => setShowBranchModal(true);

  let navigate = useNavigate();

  // Fetch client data on component mount
  useEffect(() => {
    const getClient = async () => {
      const fetchClient = await retrieveClient();
      if (fetchClient) {
        setClient(fetchClient.clients[0]); // Adjusted to access the client object
      }
    };
    getClient();
  }, [clientId]);

  // Function to retrieve client data from the API
  const retrieveClient = async () => {
    const response = await axios.get(
      `https://transport-management-system-backend.onrender.com/api/transport/client/fetch?clientId=${clientId}`
    );
    return response.data;
  };

  // If client data is not loaded yet, show a loading message
  if (!client) return <p>Loading...</p>;

  // Function to navigate to the update client document page
  const updateClientDocument = () => {
    navigate("/admin/client/document/update", { state: client });
  };

  // Function to navigate to the update client details page
  const updateClientDetails = () => {
    navigate(`/admin/client/${clientId}/update/detail`, { state: client });
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const handleBranchFormSubmit = (e) => {
    e.preventDefault();

    fetch("https://transport-management-system-backend.onrender.com/api/transport/client/branch/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(branchForm),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "auto" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>Client Details</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Basic Information</h5>
              <p>
                <strong>Name:</strong> {client.name}
              </p>
              <p>
                <strong>Added Date:</strong>{" "}
                {formatDateFromEpoch(client.addedDateTime)}
              </p>
              <p>
                <strong>Contact Number:</strong> {client.contactNumber}
              </p>
              <p>
                <strong>Contact Name:</strong> {client.contactName}
              </p>
              <p>
                <strong>Pin Code:</strong> {client.pinCode}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">GST Information</h5>
              <p>
                <strong>GST Applicable:</strong> {client.gstApplicable}
              </p>
              <p>
                <strong>GST Number:</strong> {client.gstNumber || "N/A"}
              </p>
              <p>
                <strong>CGST Rate:</strong> {client.cgstRate}%
              </p>
              <p>
                <strong>SGST Rate:</strong> {client.sgstRate}%
              </p>
              <p>
                <strong>State:</strong> {client.state}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Additional Details</h5>
              <p>
                <strong>Status:</strong> {client.status}
              </p>
              <p>
                <strong>Comments:</strong> {client.comments || "No Comments"}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Documents</h5>
              <div>
                <strong>Uploaded Documents:</strong>
                <button
                  className="btn btn-sm bg-color custom-bg ms-2"
                  onClick={handleShow}
                >
                  View Document
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Branches</h5>
              {client.branches.length > 0 ? (
                <ul className="list-group">
                  {client.branches.map((branch, index) => (
                    <li key={index} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col text-center">
                          <strong>Branch {index + 1}</strong>
                        </div>
                        <div className="col text-center">
                          <strong>City:</strong> {branch.city}
                        </div>
                        <div className="col text-center">
                          <strong>State:</strong> {branch.state}
                        </div>
                        <div className="col text-center">
                          <strong>Address:</strong> {branch.fullAddress}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No branches available for this client.</p>
              )}
            </div>
          </div>
        </div>

        {/* Update client detail and document update section */}
        <div className="card-footer">
          <div className="d-flex justify-content-center mt-3">
            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Add Branch"
              onClick={handleBranchModalShow}
            />
            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Update Client Detail"
              onClick={updateClientDetails}
            />
            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-4"
              value="Update Client Document"
              onClick={updateClientDocument}
            />
          </div>
        </div>
      </div>

      {/* Modal to show client documents */}
      <Modal show={showModal} onHide={handleClose} fullscreen>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title style={{ borderRadius: "1em" }}>Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`https://transport-management-system-backend.onrender.com/api/user/document/${client.uploadDocuments}/view`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Document Preview"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBranchModal} onHide={handleBranchModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Add Client Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBranchFormSubmit}>
            <Form.Group controlId="state" className="mb-3">
              <Form.Label>
                <b>State</b>
              </Form.Label>
              <Form.Select
                name="state"
                onChange={(e) => {
                  handleInput(e);
                  setCities(statesCities[e.target.value]); // Update cities based on selected state
                }}
                value={branchForm.state}
              >
                <option value="">Select State</option>
                {Object.keys(statesCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
              <Form.Label>
                <b>City</b>
              </Form.Label>
              <Form.Select
                name="city"
                onChange={handleInput}
                value={branchForm.city}
                disabled={!branchForm.state} // Disable if no state is selected
              >
                <option value="">Select City</option>
                {branchForm.state &&
                  statesCities[branchForm.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="fullAddress" className="mb-3">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                as="textarea" // Change this line
                rows={3} // You can set the number of visible rows
                required
                name="fullAddress"
                value={branchForm.fullAddress}
                onChange={handleInput}
              />
            </Form.Group>

            <Button className="btn bg-color custom-bg" type="submit">
              Add Branch
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientDetail;
