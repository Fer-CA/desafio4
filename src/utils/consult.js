const { pool } = require("../db/config");

const getPost = async () => {
    try {
        const query = "SELECT * FROM post;";
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener los posts:", error.message);
        throw new Error("Error al obtener los posts");
    }
};

const createPost = async ({ titulo, url, descripcion, likes = 0 }) => {
    try {
        const query = "INSERT INTO post (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *;";
        const values = [titulo, url, descripcion, likes];
        const { rows } = await pool.query(query, values);
        return rows[0]; 
    } catch (error) {
        console.error("Error al crear el post:", error.message);
        throw new Error("Error al crear el post");
    }
};

const findById = async (id) => {
    try {
        const query = "SELECT * FROM post WHERE id = $1;";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error al buscar el post:", error.message);
        throw new Error("Error al buscar el post");
    }
};

const updateLikeById = async (id) => {
    try {
        const query = "UPDATE post SET likes = likes + 1 WHERE id = $1 RETURNING *;";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0]; 
    } catch (error) {
        console.error("Error al dar like al post:", error.message);
        throw new Error("Error al dar like al post");
    }
};

const deleteById = async (id) => {
    try {
        const query = "DELETE FROM post WHERE id = $1;";
        const values = [id];
        await pool.query(query, values);
        return { message: "Post eliminado con éxito" };
    } catch (error) {
        console.error("Error al borrar el post:", error.message);
        throw new Error("Error al borrar el post");
    }
};

module.exports = { getPost, createPost, findById, updateLikeById, deleteById };

