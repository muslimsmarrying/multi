import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaArrowLeftLong, FaBarsStaggered } from "react-icons/fa6";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import AdminNav from "./AdminNav";
import { Modal, Input, Button, Form, Space } from "antd";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";

const Chips = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChip, setSelectedChip] = useState(null);
  const [filteredChips, setFilteredChips] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("admintoken");

  const fetchChipsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/chips/get-all-chips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.success) {
        setChips(data?.chips);
        setFilteredChips(data?.chips);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch chips data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChipsData();
  }, []);

  useEffect(() => {
    setFilteredChips(
      searchTerm.trim()
        ? chips.filter((chip) =>
            chip.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : chips
    );
  }, [searchTerm, chips]);

  const showModal = () => {
    setIsModalVisible(true);
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        e.target.value = null;
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        e.target.value = null;
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("status", values.status);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/chips/add-chip`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchChipsData();
        setIsModalVisible(false);
        form.resetFields();
        setImagePreview(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.log(error);
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
            toast.error(data.message || "Chip already exists.");
            break;
          case 500:
            toast.error(
              data.message || "Server error. Please try again later."
            );
            break;
          default:
            toast.error(data.message || "An unexpected error occurred.");
        }
      } else {
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
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("status", formData.status);
      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/chips/edit-chip/${selectedChip._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditSidebarOpen(false);
        fetchChipsData();
        setEditImagePreview(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error updating chip:", error);
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
            toast.error(data.message || "Chip not found.");
            break;
          case 409:
            toast.error(data.message || "Chip already exists.");
            break;
          case 500:
            toast.error(
              data.message || "Server error. Please try again later."
            );
            break;
          default:
            toast.error(data.message || "An unexpected error occurred.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chip) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${chip.title}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/chips/delete-chip/${chip._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          fetchChipsData();
          Swal.fire({
            title: "Deleted!",
            text: `${chip.title} has been deleted.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the chip.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEdit = (chip) => {
    setSelectedChip(chip);
    setFormData({
      title: chip.title || "",
      description: chip.description || "",
      image: chip.image || "",
      price: chip.price || 0,
      status: chip.status || 0,
    });
    setEditImagePreview(chip.image);
    setSelectedFile(null);
    setIsEditSidebarOpen(true);
  };

  const [formData, setFormData] = useState({
    title: selectedChip?.title || "",
    description: selectedChip?.description || "",
    image: selectedChip?.image || "",
    price: selectedChip?.price || 0,
    status: selectedChip?.status || 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "price" || name === "status" ? Number(value) : value,
    }));
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      {loading && <Loader />}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div id="content" className="px-2">
        <button
          type="button"
          id="openSidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bars-btn"
        >
          <FaBarsStaggered />
        </button>
        <AdminNav title={"Chips Management"} />

        <div className="search-add-main">
          <div className="search-main mt-0">
            <input
              type="text"
              className="search-inp"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">
              <IoSearchOutline />
            </div>
          </div>
          <button className="btn btn-primary me-3" onClick={showModal}>
            Add New Chip
          </button>
        </div>

        <div className="tbl-main">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredChips.length > 0 ? (
                filteredChips.map((chip) => (
                  <tr key={chip._id}>
                    <td>{chip.title}</td>
                    <td>{chip.description}</td>
                    <td>
                      <img
                        src={chip.image}
                        alt={chip.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>${chip.price}</td>
                    <td>{chip.status === 0 ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(chip)}
                        className="btn btn-sm btn-primary"
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(chip)}
                        className="btn btn-sm btn-danger"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Chips found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`subadmin-sidebar ${
          isEditSidebarOpen ? "active-deposit-menu" : ""
        }`}
      >
        <div>
          <button
            className="close-btn-deposit-sidebar"
            onClick={() => setIsEditSidebarOpen(false)}
          >
            <FaArrowLeftLong />
          </button>
        </div>
        <h3 className="text-white pt-1">Edit Chip</h3>
        <form onSubmit={handleSubmitEdit}>
          <div className="mb-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Current Image</label>
            {editImagePreview && (
              <img
                src={editImagePreview}
                alt="Current preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
          <div className="mb-2">
            <label>New Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleEditFileChange}
            />
            {editImagePreview && selectedFile && (
              <img
                src={editImagePreview}
                alt="New preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          <div className="mb-2">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value={0}>Active</option>
              <option value={1}>Inactive</option>
            </select>
          </div>
          <button className="btn btn-light mt-3" type="submit">
            Update
          </button>
        </form>
      </div>

      <Modal
        title="Add New Chip"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter chip title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea placeholder="Enter chip description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" min="0" placeholder="Enter price" />
          </Form.Item>
          <Form.Item label="Status" name="status" initialValue={0}>
            <select className="form-control">
              <option value={0}>Active</option>
              <option value={1}>Inactive</option>
            </select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" disabled={!selectedFile}>
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

export default Chips;
