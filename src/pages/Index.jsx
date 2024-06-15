import { Container, Text, VStack, Input, Button, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { scrapeCompanyWebsite } from "../utils/scraper";
import { generateAnalysis } from "../utils/openai";
import { generateReport } from "../utils/reporting";
import { submitFeedback } from "../utils/feedback"; // Import the feedback utility

const Index = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [feedback, setFeedback] = useState(""); // State for feedback

  const handleScrape = async () => {
    const data = await scrapeCompanyWebsite(url);
    setResult(data);
    const analysisText = `About Us: ${data.aboutUs}\nCareers: ${data.careers}\nNews: ${data.news}`;
    const analysisResult = await generateAnalysis(analysisText);
    setAnalysis(analysisResult);
  };

  const handleFeedbackSubmit = async () => {
    await submitFeedback(feedback);
    setFeedback(""); // Clear feedback after submission
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Web Scraping Module</Heading>
        <Text>Enter a company website URL to scrape information.</Text>
        <Input placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={handleScrape} colorScheme="teal">Scrape Website</Button>
        {result && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md">Scraped Data</Heading>
            <Text><strong>About Us:</strong> {result.aboutUs}</Text>
            <Text><strong>Careers:</strong> {result.careers}</Text>
            <Text><strong>News:</strong> {result.news}</Text>
          </Box>
        )}
        {analysis && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md">AI Analysis</Heading>
            <Text>{analysis}</Text>
          </Box>
        )}
        <Button onClick={() => generateReport({ name: "Example Company", industry: "Technology", stockPrice: "$100", aboutUs: result?.aboutUs, careers: result?.careers, news: result?.news, analysis })} colorScheme="blue">Generate Report</Button>
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h2" size="md">Provide Feedback</Heading>
          <Textarea placeholder="Enter your feedback here" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          <Button onClick={handleFeedbackSubmit} colorScheme="green" mt={2}>Submit Feedback</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;