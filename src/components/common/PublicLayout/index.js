import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
// import "../../assets/scss/main.sass";

// Common public layout for public routes
const PublicLayout = props => {
  // Get the current location using react-router-dom
  const location = useLocation();

  // Determine the main wrapper class based on the pathname
  const getMainWrapperClassName = () => {
    // If the pathname includes "teacher", use the "background-teacher" class
    // Otherwise, use the "background-student" class
    return location.pathname.includes("teacher")
      ? "main-wrapper login-main-wrapper background-teacher"
      : "main-wrapper login-main-wrapper background-student";
  };

  // Render the public layout with the determined class
  return (
    <>
      <div className="home">
        {/* Main Wrapper */}
        <main className={getMainWrapperClassName()}>
          {/* Login Wrapper */}
          <section className="login-wrapper">
            {/* Header component for the layout */}
            <Header />
            {/* Render the child components passed to PublicLayout */}
            {props.children}
          </section>
        </main>
      </div>
    </>
  );
};

export default PublicLayout;
