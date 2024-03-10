const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://admin:admin@cluster0.u6ynclu.mongodb.net/?retryWrites=true&w=majority');

const dbName = 'users';
const collectionName1 = 'user';
const collectionName2 = 'forms';

app.post('/submit-form', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName2);

    // Insert the form data into the database
    await col.insertOne(req.body);

    console.log('Form data saved to database:', req.body);
    res.send('Form submitted successfully');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving form data');
  } finally {
    await client.close();
  }
});

app.get('/home', (req, res) => {
  res.send('Welcome to Home Page');
});

app.post('/insert', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName1);

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Increased salt rounds
    req.body.password = hashedPassword;

    await col.insertOne(req.body);
    res.send('Data Received');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data');
  } finally {
    await client.close(); // Close connection after each operation
  }
});

app.post('/checkUsername', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName1);

    const existingUser = await col.findOne({ username: req.body.username });

    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error checking username' });
  } finally {
    await client.close();
  }
});

app.post('/check', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName1);

    const user = await col.findOne({ username: req.body.username });

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        res.send('Login successful');
      } else {
        res.send('Invalid password');
      }
    } else {
      res.send('Invalid username');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error checking credentials');
  } finally {
    await client.close();
  }
});


app.post('/api/users', async (req, res) => {
  const { body } = req;
  const createUser = async (db) => {
    const col = db.collection(collectionName);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const result = await col.insertOne(body);
    res.status(201).json(result.ops[0]);
  };
  await withDB(createUser, res);
});

// Get all users
app.get('/api/users', async (req, res) => {
  const getUsers = async (db) => {
    const col = db.collection(collectionName);
    const users = await col.find({}).toArray();
    res.json(users);
  };
  await withDB(getUsers, res);
});

// Get a single user by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const getUserById = async (db) => {
    const col = db.collection(collectionName);
    const user = await col.findOne({ _id: ObjectId(id) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  };
  await withDB(getUserById, res);
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updateUser = async (db) => {
    const col = db.collection(collectionName);
    const result = await col.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: body },
      { returnOriginal: false }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).send('User not found');
    }
  };
  await withDB(updateUser, res);
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const deleteUser = async (db) => {
    const col = db.collection(collectionName);
    const result = await col.findOneAndDelete({ _id: ObjectId(id) });
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).send('User not found');
    }
  };
  await withDB(deleteUser, res);
});
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.listen(8081, () => {
  console.log('Server running on port 8081');
});
