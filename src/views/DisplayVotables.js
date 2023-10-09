import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function DisplayVotables() {
    const [votables, setVotables] = useState([]);

    const fetchVotables = async () => {
        try {
            const response = await axiosInstance.get('/api/v1/get_all_votables/');
            console.log(response);
            // Directly set the combined list of votables
            setVotables(response.data);
        } catch (error) {
            console.error("Failed to fetch votables:", error.message);
        }
    };

    useEffect(() => {
        fetchVotables();
    }, []);

    const handleVote = async (votableType, objectId, voteValue) => {
        try {
            const response = await axiosInstance.post(`/api/v1/vote/${votableType}/${objectId}/`, {
                vote: voteValue
            });
            console.log(response.data);
            // Refresh the votables list after voting
            fetchVotables();
        } catch (error) {
            console.error("Failed to cast vote:", error.message);
        }
    };

    return (
        <div>
            <h1>Votables List</h1>
            <ul>
                {votables.map(votable => (
                    <li key={votable.id}>
                        <h3>{votable.title}</h3>
                        <p>{votable.text}</p>
                        <p>
                            {votable.positive_label}: {votable.positive_votes} |
                            {votable.negative_label}: {votable.negative_votes}
                        </p>
                        <p><em>Type: {votable.votable_type}</em></p>
                        {/* Add voting buttons */}
                        <button onClick={() => handleVote(votable.votable_type, votable.id, 1)}>
                            {votable.positive_label}
                        </button>
                        <button onClick={() => handleVote(votable.votable_type, votable.id, -1)}>
                            {votable.negative_label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayVotables;
