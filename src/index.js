require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { getPost, createPost, findById, updateLikeById, deleteById } = require("./utils/consult");
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (_, res) => {
    res.status(200).send("API Likeme");
});

app.get("/posts", async (_, res) => {
    try {
        const posts = await getPost();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json({ message: "Post creado con éxito", post: newPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await updateLikeById(id);
        res.status(200).json({ message: "Diste like" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteById(id);
        res.status(200).json({ message: "Post eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.all("*", (_, res) => {
    res.status(404).send("La página no existe");
});

// Iniciar servidor
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
