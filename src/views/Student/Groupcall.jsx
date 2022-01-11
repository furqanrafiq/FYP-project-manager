import React from "react";
// import { useHistory } from "react-router";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        // history.push(`/student-dashboard/room/${1}`);
        window.location.href = `/student-dashboard/room/${id}`;
    }

    return (
        <button onClick={create}>Create room</button>
    );
};

export default CreateRoom;
