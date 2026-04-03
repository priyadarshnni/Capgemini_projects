import React from "react";
import LoginForm from "../components/LoginForm";

function Home() {
    return (
        <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
            <h1 style={{ marginBottom: "24px" }}>Welcome to the Home Page</h1>
            <LoginForm />
        </div>
    );
}

export default Home;