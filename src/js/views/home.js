import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Navbar from "../component/navbar";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    const cardData = store.formulario[index].cardData;
    setEditData({ ...cardData });
  };

  const handleSave = () => {
    actions.editCard(editIndex, editData);
    setEditIndex(null);
    setEditData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {store.formulario.length > 0 ? (
          store.formulario.map((item, index) => (
            <div
              key={index}
              className="card mb-3"
              style={{ maxWidth: "100%", background: item.background }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://picsum.photos/200"
                    className="img-fluid rounded-start"
                    alt="User"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Full Name"
                          value={editData.fullName}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              fullName: e.target.value,
                            })
                          }
                        />
                        <input
                          type="email"
                          className="form-control mb-2"
                          placeholder="Email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Phone"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Address"
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              address: e.target.value,
                            })
                          }
                        />
                        <button
                          className="btn btn-primary"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <h5 className="card-title">{item.cardData.fullName}</h5>
                        <p className="card-text">
                          Email: {item.cardData.email}
                        </p>
                        <p className="card-text">
                          Phone: {item.cardData.phone}
                        </p>
                        <p className="card-text">
                          Address: {item.cardData.address}
                        </p>
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleOpenModal(index)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Card</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this card?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    actions.deleteCard(deleteIndex);
                    handleCloseModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Home };
