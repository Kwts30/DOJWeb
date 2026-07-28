const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/penal-codes', (req, res) => {
  res.render('penal-codes');
});

app.get('/rules', (req, res) => {
  res.render('rules');
});

app.get('/staff', (req, res) => {
  res.render('staff');
});

app.get('/documents', (req, res) => {
  res.render('documents');
});

app.get('/memorandums', (req, res) => {
  res.render('memorandums');
});

app.get('/memorandums/:id', (req, res) => {
  res.render('memorandums', { selectedId: req.params.id });
});

// Catch-all 404 redirect to home
app.use((req, res) => {
  res.status(404).redirect('/');
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`[DOJ SYSTEM] Los Santos Department of Justice Server Started`);
  console.log(`[URL] Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
