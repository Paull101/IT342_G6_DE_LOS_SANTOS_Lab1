import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({ icon, title, subtitle, onClick }) => {
  return (
    <motion.div
      className="action-card"
      whileHover={{ y: -8 }}
      whileTap={{ y: -4 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ fontSize: "36px", marginBottom: "20px" }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </motion.div>
  );
};

export default DashboardCard;
