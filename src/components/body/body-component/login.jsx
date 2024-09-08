// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(""); // Initialize errorMessage state
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandle = async (event) => {
        event.preventDefault();
        console.log(formData); // Check the form data before sending the request

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Handle success message
                navigate('/program-page');  // Redirect to the program page on success
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An unknown error occurred.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form method="POST" onSubmit={submitHandle}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">User name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="mb-4 text-red-500">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
