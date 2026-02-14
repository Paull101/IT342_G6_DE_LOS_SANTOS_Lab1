import React from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import UserHeader from "../components/common/UserHeader";
import DashboardCard from "../components/common/DashboardCard";

import "../styles/GeneralDashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const user = {
    username: localStorage.getItem("username") || "User",
    role: "student"
  };

  if (!userId) {
    return (
      <div style={{ padding: 30, fontSize: 22, textAlign: "center" }}>
        No user session found. Please login first.
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <UserHeader user={user} onSignOut={handleLogout} />

        <div className="dashboard-main">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome to Your Dashboard</h2>
            <p className="welcome-subtitle">
              Manage your campus facility reservations and bookings.
            </p>
          </div>

          <div className="quick-actions">
            <DashboardCard
              icon={<Calendar size={36} />}
              title="Reserve Campus"
              subtitle="Book a facility fast"
              onClick={() => navigate("/dashboard/reserve")}
            />

            <DashboardCard
              icon={<BookOpen size={36} />}
              title="My Reservations"
              subtitle="View your bookings"
              onClick={() => navigate("/dashboard/reservations")}
            />

            <DashboardCard
              icon={<Settings size={36} />}
              title="Settings"
              subtitle="Manage your account"
              onClick={() => navigate("/dashboard/settings")}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
