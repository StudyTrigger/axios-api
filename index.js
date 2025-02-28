// Import required modules
const express = require("express");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Allow all origins for testing

// Sample data
let items = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" }
];

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST a new item
app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Update an item completely
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);
  if (index !== -1) {
    items[index] = { id: Number(id), ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// PATCH - Update specific fields
app.patch("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE - Remove an item
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id != id);
  res.json({ message: "Item deleted" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
