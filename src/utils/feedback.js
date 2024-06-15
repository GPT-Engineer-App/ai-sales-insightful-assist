import axios from 'axios';

export const submitFeedback = async (feedback) => {
  try {
    const response = await axios.post('/api/feedback', { feedback });
    return response.data;
  } catch (error) {
    console.error(`Error submitting feedback: ${error}`);
    return 'Error submitting feedback';
  }
};