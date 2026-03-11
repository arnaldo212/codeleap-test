import { useState } from "react";
import "./SignupModal.css"

function SignupModal({onEnter}) {
    const [username, setUsername] = useState("");

    function handleEnter() {
        if (username.trim()) {
            onEnter(username);
        }
    }

    return (
        <div className="signup-backdrop">
            <div className="signup-modal">
                <h2>Welcome to CodeLeap network!</h2>
                <p>Please enter your username</p>

                <input type="text" placeholder="John doe" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <div className="signup-footer">
                    <button className="btn-enter" onClick={handleEnter} disabled={!username.trim()}>ENTER</button>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;