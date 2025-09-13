import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from 'react-icons/fa6';
import AdminNav from './AdminNav';
import { Card } from 'antd';

const EditUser = () => {
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        status: '0' // Default status set to 'Active'
    });

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    // Fetch single user data
    const getSingleUserData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-user/${id}`);
            if (data?.success) {
                const { name, email, status } = data.user; // Adjust based on your API response
                setFormData({
                    name: name || '',
                    email: email || '',
                    password: '', // Keep password empty
                    status: status !== undefined ? status.toString() : '0' // Ensure status is a string
                });
            } else {
                toast.error(data.message || 'Failed to fetch user data.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);

        } finally {
            setLoading(false);
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        getSingleUserData();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, status } = formData;

        // Basic Validation
        if (!email) {
            toast.error("Email is required!");
            return;
        }

        if (!email.includes('@')) {
            toast.error("Invalid Email! Please include '@' in your email.");
            return;
        }

        if (!name.trim()) {
            toast.error("Name is required!");
            return;
        }

        if (!['0', '1'].includes(status)) {
            toast.error("Invalid status selected.");
            return;
        }

        setLoading(true); // Show loader while request is being processed

        // Prepare payload
        const payload = { name, email, status: parseInt(status, 10) };
        if (password.trim()) {
            payload.password = password;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/update-user/${id}`, payload);

            if (response.data.success) {
                toast.success('User updated successfully!');
                getSingleUserData(); // Refresh data
            } else {
                toast.error(response.data.message || 'Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false); // Hide loader after request is completed
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            {loading && <Loader />}
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                {/* Page Content */}
                <div id="content" className="px-2">
                    <button
                        type="button"
                        id="openSidebar"
                        onClick={toggleSidebar}
                        className="bars-btn"
                        aria-label="Toggle Sidebar"
                    >
                        <FaBarsStaggered />
                    </button>
                    <AdminNav />
                    <div className="p-3">
                        <Card style={{ maxWidth: 800, margin: '0 auto', marginTop: 50 }}>
                            <h3 className="text-center mb-4">Update User</h3>
                            <form onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                {/* New Password Input */}
                                <div className="form-group mb-3">
                                    <label htmlFor="password">New Password (optional)</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter new password"
                                        className="form-control"
                                    />
                                </div>

                                {/* Status Select */}
                                <div className="form-group mb-3">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="0">Active</option>
                                        <option value="1">Locked</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div className="form-group text-center">
                                    <button className="btn btn-primary" type="submit">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser;
