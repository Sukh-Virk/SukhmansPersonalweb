import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function GithubStatsChart({ theme }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Sukh-Virk");
        const result = await response.json();

        setData([
          { name: "Followers", value: result.followers },
          { name: "Public Repos", value: result.public_repos },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const darkMode = theme === "dark";

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        padding: "20px",
        borderRadius: "10px",
        background: darkMode ? "#0d1117" : "#ffffff",
        boxShadow: darkMode
          ? "0 0 15px rgba(0, 255, 255, 0.5)"
          : "0 0 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: darkMode ? "#00ffcc" : "#2c3e50",
          fontFamily: "'Courier New', monospace",
        }}
      >
        📊 GitHub Stats
      </h2>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            color: darkMode ? "#00ffcc" : "#37474f",
          }}
        >
          Loading stats...
        </p>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#333" : "#ddd"}
            />
            <XAxis dataKey="name" stroke={darkMode ? "#00ffcc" : "#2c3e50"} />
            <YAxis stroke={darkMode ? "#00ffcc" : "#2c3e50"} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#222" : "#f5f5f5",
                borderRadius: "8px",
                border: "none",
                color: darkMode ? "#fff" : "#2c3e50",
              }}
              labelStyle={{ color: darkMode ? "#00ffcc" : "#2c3e50" }}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill="url(#gradient)"
              barSize={100} // Thinner bars
              animationDuration={1500}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={darkMode ? "#00ffcc" : "#80deea"}
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor={darkMode ? "#0077ff" : "#4dd0e1"}
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GithubStatsChart;
