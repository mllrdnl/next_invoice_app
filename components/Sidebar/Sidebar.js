import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="sidebar_header">
          <div className="sidebar_logo">
            <h2>MD</h2>
          </div>
        </div>

        <div className="sidebar_bottom">
          <Image
            src="/neonrose.jpeg"
            alt="neon sign style image of a rose"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
