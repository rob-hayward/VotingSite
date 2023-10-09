import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function CreateVotable() {
    const [votableType, setVotableType] = useState('question');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Submitting votable with type:", votableType); // Logging for insight

            const response = await axiosInstance.post(`/api/v1/create_votable/${votableType}/`, {
                title: title,
                text: text
            });

            if (response.status === 201) {
                console.log("Successfully created votable. Navigating to DisplayVotables."); // Logging for insight
                navigate('/dashboard/display_votables');
            } else {
                console.error("Unexpected response status:", response.status); // Logging unexpected response status
                setErrorMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error("Error during votable submission:", error); // Detailed logging
            setErrorMessage('Error: ' + error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={votableType} onChange={(e) => setVotableType(e.target.value)}>
                    <option value="question">Question</option>
                    <option value="statement">Statement</option>
                    <option value="proposal">Proposal</option>
                </select>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text"></textarea>
                <button type="submit">Create</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default CreateVotable;
