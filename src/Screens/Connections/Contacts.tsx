import React from "react";
import AddContact from "../../components/Modals/AddContact";
import "./style.css";

class Contacts extends React.Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  render() {
    return (
      <div className="contactWrapper">
        <div className="titleContacts">
          <div className="caption">
            <span className="heading">My Contacts</span>
            <span className="headingText">
              Import your contacts for contact-level activity reporting
            </span>
          </div>
          <div className="action">
            <div className="actionBtnWrapper">
              <AddContact
                toggle={this.toggleModal}
                open={this.state.openModal}
              />
              <button className="actionBtn" onClick={this.toggleModal}>
                Add New Contact
              </button>
              <button className="actionBtn">
                <i className="fas fa-angle-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="tableContacts">
          <table className="table">
            <thead>
              <tr>
                {/* <th></th>
                <th></th> */}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Phone</th>
                <th>Title</th>
                <th>Company</th>
                <th>Owner</th>
                <th>Stage</th>
                <th>Tags</th>
                <th>Source</th>
                <th>Date Added</th>
                <th>Date Edited</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {/* <td></td>
                <td></td> */}
                <td>Basit</td>
                <td>Sattar</td>
                <td>basitdev850@gmail.com</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Dan Niera</td>
                <td></td>
                <td></td>
                <td>Manually</td>
                <td>11 days ago</td>
                <td>11 days ago</td>
                <td>Actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Contacts;
