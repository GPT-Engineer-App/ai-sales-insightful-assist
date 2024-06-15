import { Container, Text, VStack, Textarea, Button, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { submitFeedback } from "../utils/feedback";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);

  const handleFeedbackSubmit = async () => {
    try {
      await submitFeedback(feedback);
      setFeedback(""); // Clear feedback after submission
    } catch (error) {
      console.error(`Error submitting feedback: ${error}`);
      setError('Error submitting feedback');
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Provide Feedback</Heading>
        <Textarea placeholder="Enter your feedback here" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <Button onClick={handleFeedbackSubmit} colorScheme="green" mt={2}>Submit Feedback</Button>
        {error && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" bg="red.100">
            <Text color="red.800">{error}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Feedback;