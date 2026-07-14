import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const productsFile = './products.json';
const reviewsFile = './reviews.json'; 

const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const saveData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

app.get('/products', (req, res) => {
    const products = readData(productsFile);
    res.json(products);
});

app.post('/review', (req, res) => {
    const { productId, email, userName, rating, text } = req.body;
    
    let products = readData(productsFile);
    let reviews = readData(reviewsFile);

    const reviewIndex = reviews.findIndex(r => r.productId === productId && r.email === email);
    const newReview = { productId, email, userName, rating, text, createdAt: new Date().toISOString() };

    if (reviewIndex !== -1) reviews[reviewIndex] = newReview;
    else reviews.push(newReview);
    
    saveData(reviewsFile, reviews);

    const product = products.find(p => p.id === productId);
    if (product) {
        if (!product.ratings) product.ratings = {};
        
        product.ratings[email] = {
            userName: userName || 'Anonymous',
            rating: Number(rating),
            text: text || '',
            createdAt: new Date().toISOString()
        }

        const values = Object.values(product.ratings);
        const sum = values.reduce((acc, curr) => acc + curr.rating, 0);
        product.rating = Number((sum / values.length).toFixed(1));
        
        saveData(productsFile, products);
    }

    res.json({ success: true, newRating: product ? product.rating : 0 });
});

app.listen(5000, () => console.log('Server running on port 5000'));