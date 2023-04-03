import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import { NextPage } from "next";
import Head from "next/head";

const Faqs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Preguntas Frecuentes</title>
        <meta name="description" content="Preguntas Frecuentes de DH Marvel" />
      </Head>
      <Box px={2} sx={{ maxWidth: 1500, margin: "0 auto" }}>
        <Typography
          variant={"h2"}
          sx={{ textAlign: "center" }}
          style={{ marginTop: "20px" }}
        >
          Preguntas frecuentes
        </Typography>
        {faqsData.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default Faqs;
