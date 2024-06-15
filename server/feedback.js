const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const feedbackFilePath = path.join(__dirname, 'feedback.json');

router.post('/feedback', (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ error: 'Feedback is required' });
  }

  fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading feedback file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const feedbackList = data ? JSON.parse(data) : [];
    feedbackList.push({ feedback, timestamp: new Date().toISOString() });

    fs.writeFile(feedbackFilePath, JSON.stringify(feedbackList, null, 2), (err) => {
      if (err) {
        console.error('Error writing to feedback file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ message: 'Feedback submitted successfully' });
    });
  });
});

module.exports = router;