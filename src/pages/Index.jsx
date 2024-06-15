import { Container, Text, VStack, Input, Button, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { scrapeCompanyWebsite } from "../utils/scraper";
import { generateAnalysis } from "../utils/openai";
import { generateReport } from "../utils/reporting";
import { submitFeedback } from "../utils/feedback";
import { fetchStockData, fetchNewsData, fetchSocialMediaData } from "../utils/api"; // Import the necessary API functions

const Index = () => {
  const [url, setUrl] = useState("");
  const [companyName, setCompanyName] = useState(""); // State for company name or ticker
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [feedback, setFeedback] = useState(""); 

  const handleScrape = async () => {
    try {
      const data = await scrapeCompanyWebsite(url);
      setResult(data);
      const analysisText = `About Us: ${data.aboutUs}\nCareers: ${data.careers}\nNews: ${data.news}`;
      const analysisResult = await generateAnalysis(analysisText);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error("Error scraping website:", error);
    }
  };

  const handleCompanyResearch = async () => {
    try {
      const stockData = await fetchStockData(companyName);
      const newsData = await fetchNewsData(companyName);
      const socialMediaData = await fetchSocialMediaData(companyName);
      const combinedData = {
        stockData,
        newsData,
        socialMediaData,
      };
      setResult(combinedData);
      const analysisText = `Stock Data: ${JSON.stringify(stockData)}\nNews Data: ${JSON.stringify(newsData)}\nSocial Media Data: ${JSON.stringify(socialMediaData)}`;
      const analysisResult = await generateAnalysis(analysisText);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await submitFeedback(feedback);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    console.log("Result:", result);
    console.log("Analysis:", analysis);
  }, [result, analysis]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Web Scraping Module</Heading>
        <Text>Enter a company website URL to scrape information.</Text>
        <Input placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={handleScrape} colorScheme="teal">Scrape Website</Button>
        <Text>Or enter a company name or ticker to start research.</Text>
        <Input placeholder="Enter Company Name or Ticker" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <Button onClick={handleCompanyResearch} colorScheme="teal">Start Research</Button>
        {result && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md">Research Data</Heading>
            <Text><strong>Stock Data:</strong> {JSON.stringify(result.stockData)}</Text>
            <Text><strong>News Data:</strong> {JSON.stringify(result.newsData)}</Text>
            <Text><strong>Social Media Data:</strong> {JSON.stringify(result.socialMediaData)}</Text>
          </Box>
        )}
        {analysis && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md">AI Analysis</Heading>
            <Text>{analysis}</Text>
          </Box>
        )}
        <Button onClick={() => generateReport({ name: companyName, stockData: result?.stockData, newsData: result?.newsData, socialMediaData: result?.socialMediaData, analysis })} colorScheme="blue">Generate Report</Button>
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