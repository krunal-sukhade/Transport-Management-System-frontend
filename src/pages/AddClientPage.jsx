import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddClientPage = () => {
  const [client, setClient] = useState({
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

  let navigate = useNavigate();

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });

    // Show or hide GST fields based on the GST applicable dropdown
    if (name === "gstApplicable") {
      setShowGstFields(value === "Yes");
    }
  };

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("pinCode", client.pinCode);
    formData.append("state", client.state);
    formData.append("contactNumber", client.contactNumber);
    formData.append("contactName", client.contactName);
    formData.append("gstApplicable", client.gstApplicable);
    if (showGstFields) {
      formData.append("gstNumber", client.gstNumber);
      formData.append("cgstRate", client.cgstRate);
      formData.append("sgstRate", client.sgstRate);
    }
    formData.append("comments", client.comments);
    if (selectedDocument) {
    formData.append("uploadDocuments", selectedDocument);
    }


    axios
      .post("https://transport-management-system-backend.onrender.com/api/transport/client/add", formData, {
        headers: {
          // Authorization: "Bearer " + guide_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.responseMessage
            : "It seems server is down",
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  return (
    <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
      <div className="card form-card shadow-lg">
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 text-center"
            style={{
              borderRadius: "1em",
              height: "45px",
            }}
          >
            <h5 className="card-title">Add Client</h5>
          </div>
          <div className="card-body text-color">
            <form
              className="row g-3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="col-md-3 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={client.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Conditionally render GST fields based on GST applicable selection */}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="uploadDocuments" className="form-label">
                  <b>Upload Documents</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="uploadDocuments"
                  onChange={handleFileChange}
                />
              </div>

              <div className="col-12 text-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Add Client
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

export default AddClientPage;
