// App.jsx
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [infoData, setInfoData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/info/post`,
        formData
      );
      alert("Submitted successfully!");
      getAllData();
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.response?.data?.message || "Failed to submit"}`);
    }
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/info/get`);
      setInfoData(response.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_PORT}/api/info/delete/${id}`);
      alert(`${response.data.message}`);
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px", // Increased width to accommodate cards better
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#333",
          textAlign: "center",
        }}
      >
        Create Post
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "30px", // Added margin to separate form from posts
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label
            htmlFor="title"
            style={{
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label
            htmlFor="content"
            style={{
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "0.3s background-color",
          }}
        >
          Submit
        </button>
      </form>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Posts</h2>
      
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "column",
        }}
      >
        {infoData.length > 0 ? (
          infoData.map((data) => (
            <div
              key={data._id}
              style={{
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                border: "2px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "24px", color: "#3d3d3d", margin: "0 0 15px 0" }}>
                {data.title}
              </h3>
              <div
                style={{
                  padding: "15px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p style={{ color: "#3d3d3d", fontSize: "16px", margin: 0 }}>
                  {data.content}
                </p>
              </div>
              <button
                onClick={() => handleDelete(data?._id)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "#d32f2f",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "4px",
                  alignSelf: "flex-end",
                  transition: "background-color 0.3s",
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>No posts yet. Create one!</p>
        )}
      </div>
    </div>
  );
}

export default App;