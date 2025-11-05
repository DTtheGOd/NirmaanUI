import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Detailed Mock Components with realistic UI elements ---

const MockNavbar = (props) => (
  <motion.div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "50px",
      background:
        "linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
      borderBottom: "2px solid rgba(0, 255, 198, 0.3)",
      backdropFilter: "blur(15px)",
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
    }}
    {...props}
  >
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "8px",
          background: "#00D4AA",
        }}
      />
      <div
        style={{
          width: "60px",
          height: "8px",
          borderRadius: "4px",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      />
    </div>

    {/* Nav Items */}
    <div style={{ display: "flex", gap: "12px" }}>
      {[30, 40, 35].map((width, i) => (
        <div
          key={i}
          style={{
            width: `${width}px`,
            height: "6px",
            borderRadius: "3px",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}
    </div>
  </motion.div>
);

const MockFooter = (props) => (
  <motion.div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "60px",
      background:
        "linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
      borderTop: "2px solid rgba(0, 255, 198, 0.3)",
      backdropFilter: "blur(15px)",
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "0 20px",
    }}
    {...props}
  >
    {/* Footer Columns */}
    {[3, 3, 2].map((lines, col) => (
      <div
        key={col}
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? "40px" : "30px",
              height: "4px",
              borderRadius: "2px",
              background:
                i === 0
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(255, 255, 255, 0.4)",
            }}
          />
        ))}
      </div>
    ))}

    {/* Social Icons */}
    <div style={{ display: "flex", gap: "8px" }}>
      {["#00D4AA", "#0099CC", "#8866DD"].map((color, i) => (
        <div
          key={i}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: color,
          }}
        />
      ))}
    </div>
  </motion.div>
);

const MockSidebar = (props) => (
  <motion.div
    style={{
      position: "absolute",
      top: "50px",
      left: 0,
      width: "180px",
      height: "calc(100% - 110px)",
      background:
        "linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
      borderRight: "2px solid rgba(0, 255, 198, 0.3)",
      backdropFilter: "blur(15px)",
      zIndex: 30,
      padding: "20px 12px",
    }}
    {...props}
  >
    {/* Menu Items */}
    {[
      { icon: "#00D4AA", width: 80 },
      { icon: "#0099CC", width: 70 },
      { icon: "#8866DD", width: 90 },
      { icon: "#00D4AA", width: 75 },
      { icon: "#0099CC", width: 85 },
    ].map((item, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: item.icon,
            flexShrink: 0,
          }}
        />
        {/* Text Line */}
        <div
          style={{
            width: `${item.width}px`,
            height: "6px",
            borderRadius: "3px",
            background: "rgba(255, 255, 255, 0.6)",
          }}
        />
      </div>
    ))}
  </motion.div>
);

const MockMainContent = (props) => (
  <motion.div
    style={{
      position: "absolute",
      top: "50px",
      left: "180px",
      width: "calc(100% - 180px)",
      height: "calc(100% - 110px)",
      background:
        "linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%)",
      backdropFilter: "blur(15px)",
      zIndex: 20,
      padding: "20px",
    }}
    {...props}
  >
    {/* Header */}
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          width: "120px",
          height: "12px",
          borderRadius: "6px",
          background: "#00D4AA",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          width: "80px",
          height: "6px",
          borderRadius: "3px",
          background: "rgba(255, 255, 255, 0.4)",
        }}
      />
    </div>

    {/* Cards Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}
    >
      {[
        { color: "#00D4AA", height: 60 },
        { color: "#0099CC", height: 60 },
        { color: "#8866DD", height: 80 },
        { color: "#00D4AA", height: 80 },
      ].map((card, i) => (
        <div
          key={i}
          style={{
            height: `${card.height}px`,
            borderRadius: "12px",
            background: "rgba(20, 20, 20, 0.8)",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Card Icon */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: card.color,
              marginBottom: "8px",
            }}
          />
          {/* Card Text Lines */}
          <div
            style={{
              width: "70%",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255, 255, 255, 0.5)",
              marginBottom: "4px",
            }}
          />
          <div
            style={{
              width: "50%",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>
      ))}
    </div>
  </motion.div>
);

// --- Main component ---

export const PageAssembly = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loop = () => {
      setTimeout(() => setIsVisible(false), 4000);
      setTimeout(() => setIsVisible(true), 5500);
    };

    loop();
    const interval = setInterval(loop, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    // Container with VISIBLE overflow - NO BORDER for clean look during travel!
    <div
      style={{
        width: "100%",
        maxWidth: "550px",
        height: "420px",
        position: "relative",
        overflow: "visible", // Components visible while traveling!
        background: "transparent", // No background
        border: "none", // No border - clean!
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Navbar drops from FAR ABOVE - VISIBLE while falling! */}
            <MockNavbar
              initial={{ y: -600, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -600, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            />

            {/* Footer slides from FAR BOTTOM-LEFT - VISIBLE while traveling! */}
            <MockFooter
              initial={{ x: -800, y: 700, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: -800, y: 700, opacity: 0 }}
              transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
            />

            {/* Sidebar slides from FAR LEFT - VISIBLE while traveling! */}
            <MockSidebar
              initial={{ x: -700, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -700, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />

            {/* Main Content slides from FAR RIGHT - VISIBLE while traveling! */}
            <MockMainContent
              initial={{ x: 800, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 800, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageAssembly;
