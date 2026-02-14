import React from "react";
import { LogOut, User } from "lucide-react";

const UserHeader = ({ user, onSignOut }) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="dashboard-title">🏫 Campus Reserve</h1>
        </div>

        <div className="user-section">
          <div className="user-info">
            <User size={20} />
            <span>{user?.username || "User"}</span>
          </div>
          <button className="sign-out-btn" onClick={onSignOut}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
