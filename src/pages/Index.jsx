// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Input, Button, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { scrapeCompanyWebsite } from "../utils/scraper";
import { generateAnalysis } from "../utils/openai";
import { generateReport } from "../utils/reporting";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleScrape = async () => {
    const data = await scrapeCompanyWebsite(url);
    setResult(data);
    const analysisText = `About Us: ${data.aboutUs}\nCareers: ${data.careers}\nNews: ${data.news}`;
    const analysisResult = await generateAnalysis(analysisText);
    setAnalysis(analysisResult);
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
        <Button onClick={() => generateReport({ name: "Example Company", industry: "Technology", stockPrice: "$100", aboutUs: result.aboutUs, careers: result.careers, news: result.news, analysis })} colorScheme="blue">Generate Report</Button>
      </VStack>
    </Container>
  );
};

export default Index;