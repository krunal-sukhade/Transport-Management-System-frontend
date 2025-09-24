import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ClientUpdateDetail = () => {
  const { clientId } = useParams();
  let navigate = useNavigate();

  const [client, setClient] = useState({
    id: clientId,
    name: "",
    pinCode: "",
    state: "",
    contactNumber: "",
    contactName: "",
    gstApplicable: "",
    gstNumber: "",
    cgstRate: "",
    sgstRate: "",
    comments: "",
  });

  const [showGstFields, setShowGstFields] = useState(false);

  // Fetch client data on load
  useEffect(() => {
    const getClient = async () => {
      const fetchClient = await retrieveClient();
      if (fetchClient) {
        const clientData = fetchClient.clients[0];
        setClient(clientData);
        // Set showGstFields based on the fetched GST Applicable value
        setShowGstFields(clientData.gstApplicable === "Yes");
      }
    };
    getClient();
  }, [clientId]);

  // Fetch client data by ID
  const retrieveClient = async () => {
    const response = await axios.get(
      `https://transport-management-system-backend.onrender.com/api/transport/client/fetch?clientId=${clientId}`
    );
    return response.data;
  };

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });

    // Automatically show/hide GST fields based on GST Applicable value
    if (name === "gstApplicable") {
      setShowGstFields(value === "Yes");
    }
  };

  // Update client information
  const updateClient = (e) => {
    e.preventDefault();

    if (
      !client.name ||
      !client.pinCode ||
      !client.state ||
      !client.contactNumber
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      return;
    }

    // API call to update client details
    fetch("https://transport-management-system-backend.onrender.com/api/transport/client/detail/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate(`/admin/client/${client.id}/detail`);
          }, 2000); // Redirect after success
        } else {
          toast.error(res.responseMessage || "Update failed.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Server error, please try again later.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
      <div className="card form-card shadow-lg">
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 text-center"
            style={{ borderRadius: "1em", height: "45px" }}
          >
            <h5 className="card-title">Update Client</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3" onSubmit={updateClient}>
              <div className="col-md-3 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={client.name}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="pinCode" className="form-label">
                  <b>Pin Code</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pinCode"
                  value={client.pinCode}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">
                  <b>State</b>
                </label>
                <select
                  className="form-control"
                  name="state"
                  value={client.state}
                  onChange={handleInput}
                >
                  <option value="">-- Select State --</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  <b>Contact Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  value={client.contactNumber}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="contactName" className="form-label">
                  <b>Contact Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactName"
                  value={client.contactName}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="gstApplicable" className="form-label">
                  <b>GST Applicable</b>
                </label>
                <select
                  className="form-control"
                  name="gstApplicable"
                  value={client.gstApplicable}
                  onChange={handleInput}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Conditionally render GST fields based on GST Applicable selection */}
              {showGstFields && (
                <>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="gstNumber" className="form-label">
                      <b>GST Number</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="gstNumber"
                      value={client.gstNumber}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="cgstRate" className="form-label">
                      <b>CGST Rate</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="cgstRate"
                      value={client.cgstRate}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="sgstRate" className="form-label">
                      <b>SGST Rate</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sgstRate"
                      value={client.sgstRate}
                      onChange={handleInput}
                    />
                  </div>
                </>
              )}

              <div className="col-md-3 mb-3">
                <label htmlFor="comments" className="form-label">
                  <b>Comments</b>
                </label>
                <textarea
                  className="form-control"
                  name="comments"
                  rows="2"
                  value={client.comments}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div className="col-12 text-center mb-2">
                <button type="submit" className="btn btn-primary">
                  Update Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientUpdateDetail;
