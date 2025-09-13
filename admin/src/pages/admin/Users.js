import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaArrowLeftLong, FaBarsStaggered } from "react-icons/fa6";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import AdminNav from "./AdminNav";
import { Modal, Input, Button, Form, Space } from "antd";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [form] = Form.useForm();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeAdminSidebar = () => setIsAdminSidebarOpen(false);
  const token = localStorage.getItem("admintoken");

  const fetchAdminsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/get-all-sub-admins`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.success) {
        setUsers(data?.admins);
        setFilteredUsers(data?.admins);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdminsData();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      searchTerm.trim()
        ? users.filter(
            (user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : users
    );
  }, [searchTerm, users]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/reg-sub-admin`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Show success message
        toast.success(response.data.message);

        // Refresh the admin list
        fetchAdminsData();

        // Close the modal and reset the form
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.log(error);

      // Handle specific error status codes
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            toast.error(
              data.message || "Invalid input. Please check your data."
            );
            break;
          case 401:
            toast.error(data.message || "Unauthorized. Please log in again.");
            break;
          case 404:
            toast.error(data.message || "Resource not found.");
            break;
          case 409:
            toast.error(
              data.message || "Conflict. The username or email already exists."
            );
            break;
          case 500:
            toast.error(
              data.message || "Server error. Please try again later."
            );
            break;
          default:
            toast.error(data.message || "An unexpected error occurred.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response from the server. Please check your connection."
        );
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(formData);

      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/admin/edit-admin/${selectedAdmin._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Show success message
        toast.success(response.data.message);
        setIsAdminSidebarOpen(false);
        // Refresh the admin list
        fetchAdminsData();
      }
    } catch (error) {
      console.error("Error updating admin:", error);

      // Handle specific error status codes
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            toast.error(
              data.message || "Invalid input. Please check your data."
            );
            break;
          case 401:
            toast.error(data.message || "Unauthorized. Please log in again.");
            break;
          case 404:
            toast.error(data.message || "Admin not found.");
            break;
          case 409:
            toast.error(data.message || "Username or email already exists.");
            break;
          case 500:
            toast.error(
              data.message || "Server error. Please try again later."
            );
            break;
          default:
            toast.error(data.message || "An unexpected error occurred.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response from the server. Please check your connection."
        );
      } else {
        // Something went wrong in setting up the request
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    form.setFieldsValue({ username: value });
  };

  const handleDelete = async (user) => {
    // Confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    // If user confirms, proceed with deletion
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/admin/delete-sub-admin/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          fetchAdminsData();
          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: `${user.name} has been deleted.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the admin.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEdit = async (user) => {
    setSelectedAdmin(user);
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "", // Always empty for new password
      access: {
        users: user?.access?.users || [],
        kyc: user?.access?.kyc || [],
        transactions: user?.access?.transactions || [],
        deposit: user?.access?.deposit || [],
        withdrawals: user?.access?.withdrawals || [],
        adminWallets: user?.access?.adminWallets || [],
        bank: user?.access?.bank || [],
        wallets: user?.access?.wallets || [],
        baseCurrency: user?.access?.baseCurrency || [],
      },
    });
    setIsAdminSidebarOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "password") {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/;
      setPasswordError(
        strongPasswordRegex.test(value)
          ? ""
          : "Password must be at least 15 characters long and include uppercase, lowercase, number, and special character."
      );
    }
  };

  const [formData, setFormData] = useState({
    name: selectedAdmin?.name || "",
    username: selectedAdmin?.username || "",
    email: selectedAdmin?.email || "",
    password: "",
    access: {
      users: selectedAdmin?.access?.users || [],
      kyc: selectedAdmin?.access?.kyc || [],
      transactions: selectedAdmin?.access?.transactions || [],
      deposit: selectedAdmin?.access?.deposit || [],
      withdrawals: selectedAdmin?.access?.withdrawals || [],
      adminWallets: selectedAdmin?.access?.adminWallets || [],
      bank: selectedAdmin?.access?.bank || [],
      wallets: selectedAdmin?.access?.wallets || [],
      baseCurrency: selectedAdmin?.access?.baseCurrency || [],
    },
  });

  const hasPermission = (category, permission) => {
    return formData.access[category]?.includes(permission);
  };

  const handleAccessChange = (category, permission) => {
    setFormData((prev) => ({
      ...prev,
      access: {
        ...prev.access,
        [category]: prev.access[category].includes(permission)
          ? prev.access[category].filter((p) => p !== permission) // Remove permission
          : [...prev.access[category], permission], // Add permission
      },
    }));
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      {loading && <Loader />}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div id="content" className="px-2">
        <button
          type="button"
          id="openSidebar"
          onClick={toggleSidebar}
          className="bars-btn"
        >
          <FaBarsStaggered />
        </button>
        <AdminNav />
        <h3 className="b-clr">Total Users</h3>

        <div className="search-add-main">
          <div className="search-main mt-0">
            <input
              type="text"
              className="search-inp"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">
              <IoSearchOutline />
            </div>
          </div>
          <button className="btn btn-primary me-3" onClick={showModal}>
            Add New
          </button>
        </div>

        <div className="tbl-main">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>

                    <td>
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-sm btn-primary"
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user)}
                        className="btn btn-sm btn-danger"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Admins found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`subadmin-sidebar ${
          isAdminSidebarOpen ? "active-deposit-menu" : ""
        }`}
      >
        <div className="">
          <button
            className="close-btn-deposit-sidebar"
            onClick={closeAdminSidebar}
          >
            <FaArrowLeftLong />
          </button>
        </div>
        <h3 className="text-white pt-1">Edit Admin</h3>
        <form onSubmit={handleSubmitEdit}>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
            />
            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}
          </div>

          <div className="d-flex flex-wrap">
            <div className="row w-100">
              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">KYC</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("kyc", "view")}
                        onChange={() => handleAccessChange("kyc", "view")}
                      />
                      View
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={hasPermission("kyc", "approve")}
                        onChange={() => handleAccessChange("kyc", "approve")}
                      />
                      Approve/Reject
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">Wallet</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("wallets", "view")}
                        onChange={() => handleAccessChange("wallets", "view")}
                      />
                      View
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={hasPermission("wallets", "add")}
                        onChange={() => handleAccessChange("wallets", "add")}
                      />
                      Add
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">Deposit</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("deposit", "add")}
                        onChange={() => handleAccessChange("deposit", "add")}
                      />
                      Add Deposit
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">Withdraw</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("withdrawals", "view")}
                        onChange={() =>
                          handleAccessChange("withdrawals", "view")
                        }
                      />
                      View
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={hasPermission("withdrawals", "approve")}
                        onChange={() =>
                          handleAccessChange("withdrawals", "approve")
                        }
                      />
                      Approve / Reject
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">Base Currency</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("baseCurrency", "view")}
                        onChange={() =>
                          handleAccessChange("baseCurrency", "view")
                        }
                      />
                      View
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={hasPermission("baseCurrency", "change")}
                        onChange={() =>
                          handleAccessChange("baseCurrency", "change")
                        }
                      />
                      Add / Change
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-2">
                <div className="d-flex flex-column">
                  <h4 className="mt-2 mb-0">Users</h4>
                  <div className="d-flex gap-3">
                    <label>
                      <input
                        className="me-1"
                        type="checkbox"
                        checked={hasPermission("users", "view")}
                        onChange={() => handleAccessChange("users", "view")}
                      />
                      View
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Update
          </button>
        </form>
      </div>

      <Modal
        title="Add New Sub-Admin"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Name Field */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          {/* Username Field */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter the username" },
              {
                min: 15,
                message: "Username must be at least 15 characters long",
              },
              {
                pattern: /^\S*$/,
                message: "Username cannot contain spaces",
              },
              {
                pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                message:
                  "Username can only contain letters, numbers, and special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter username"
              onChange={handleUsernameChange}
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter the password" },
              {
                min: 15,
                message: "Password must be at least 15 characters long",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{15,}$/,
                message:
                  "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <BsEyeFill /> : <AiFillEyeInvisible />
              }
            />
          </Form.Item>

          {/* Form Buttons */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
