import express from "express";
import Pusher from "pusher";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use port from environment or default to 5000

// Configure Pusher (Replace with your credentials)
const pusher = new Pusher({
  appId: process.env.APP_ID || '',
  key: process.env.KEY || '',
  secret: process.env.SECRET || '',
  cluster: process.env.CLUSTER || '',
  useTLS: false, // Use HTTPS 
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Simple API Endpoint to Trigger an Event
app.get("/trigger", (req, res) => {
  const { invoice_id } = req.query;

  if (invoice_id) {
    pusher.trigger(`invoice-${invoice_id}`, 'update-status', {
      id: invoice_id
    }).finally(() => {
      console.log('Pusher Trigger');
    });
  }

  res.send("Event triggered successfully");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});