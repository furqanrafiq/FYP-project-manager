import React, { useState } from "react";

export default function JoinRoom() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    window.location.assign(`/student-dashboard/video/${room}`);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
