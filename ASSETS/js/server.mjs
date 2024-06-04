import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../../')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Ruta para hacer una solicitud a la API de Comic Vine y pasar la respuesta al cliente
// Ruta para hacer una solicitud a la API de Comic Vine y pasar la respuesta al cliente
// Ruta para hacer una solicitud a la API de Comic Vine y pasar la respuesta al cliente
app.get('/api/issues', async (req, res) => {
    try {
        const apiKey = 'ecd27a132e4bb8ee7240ef4adb0f65e18467c07e'; // Reemplaza con tu propia clave de API de Comic Vine
        
        // Realizar dos solicitudes, una para Marvel y otra para DC
        const apiUrlMarvel = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&format=json&limit=10&filter=publisher:marvel`;
        const apiUrlDC = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&format=json&limit=5&filter=publisher:dc`;

        // Esperar a que ambas solicitudes se completen
        const responseMarvel = await fetch(apiUrlMarvel);
        const responseDC = await fetch(apiUrlDC);

        // Convertir las respuestas en JSON
        const dataMarvel = await responseMarvel.json();
        const dataDC = await responseDC.json();

        // Combinar los resultados de Marvel y DC
        const combinedResults = {
            results: [...dataMarvel.results, ...dataDC.results]
        };

        res.json(combinedResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Ruta para hacer una solicitud a la API de MyAnimeList y pasar la respuesta al cliente
app.get('/api/mangas', async (req, res) => {
    try {
        const axios = require('axios');

        const response = await axios.get('https://api.myanimelist.net/v2', {
            params: {
                q: 'Naruto', // Puedes ajustar la consulta de búsqueda según tus necesidades
                limit: 15 // Limita la cantidad de resultados a 15, por ejemplo
            }
        });

        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error('Error fetching manga data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
