import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { FC, useState } from "react";
import { IComic } from "types/IComic.type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  comic: IComic;
}
export const ComicDetailsInfo: FC<Props> = ({ comic }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  console.log(comic);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        padding: "30px 0px",
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="body1" sx={{ width: "33%", flexShrink: 0 }}>
            Descripción
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {comic.description ? comic.description : "No hay descripción"}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personajes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comic.characters.items.length > 0 ? (
            comic.characters.items.map((character) => (
              <NextLink
                href={`/personajes/${character.resourceURI.split("/").pop()}`}
                key={character.name}
              >
                <Button
                  fullWidth
                  size="small"
                  color="primary"
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {character.name}
                </Button>
              </NextLink>
            ))
          ) : (
            <Typography>No hay personajes</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Creadores
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comic.creators.items.length > 0 ? (
            comic.creators.items.map((creator) => (
              <Typography key={creator.name}>
                {creator.name} - {creator.role}
              </Typography>
            ))
          ) : (
            <Typography>No hay creadores</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ComicDetailsInfo;
