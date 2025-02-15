import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const faqs = [
    {
        question: 'What are the delivery options for perfume orders?',
        answer: 'We offer standard and express delivery options. Standard delivery typically takes 5-7 business days, while express delivery takes 1-3 business days.',
      },
      {
        question: 'Can I return a perfume if I don’t like the fragrance?',
        answer: 'Yes, we accept returns for unopened perfumes within 30 days of purchase. However, if the perfume is opened, we only accept returns if there is a defect in the product.',
      },
      {
        question: 'Are there any discounts for bulk orders?',
        answer: 'Yes, we offer special discounts for bulk purchases! Please contact our support team for more information on pricing and eligibility.',
      },
      {
        question: 'Do you offer gift wrapping for perfumes?',
        answer: 'Absolutely! We offer gift wrapping for a small additional fee. You can select this option at checkout and even include a personalized message.',
      },
      {
        question: 'How can I ensure the perfumes are authentic?',
        answer: 'We source our products directly from authorized distributors and manufacturers to guarantee 100% authentic perfumes.',
      },
      {
        question: 'Is there a loyalty program for frequent buyers?',
        answer: 'Yes! We have a loyalty program where you can earn points for every purchase. Points can be redeemed for discounts on future orders. Sign up to start earning today!',
      },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          background: 'linear-gradient(90deg, #8A2BE2, #DA70D6, #FF69B4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          textAlign: 'center',  // Center-align the header
          width: '100%',        // Ensures the text is centered across the container
        }}
      >
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPage;
