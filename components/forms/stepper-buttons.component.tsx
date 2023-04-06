import { Box, Button } from "@mui/material";
import { FC } from "react";

interface Props {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

const StepperButtons: FC<Props> = ({ activeStep, handleNext, handleBack }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mt: 3, ml: 1 }}
        >
          Anterior
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {activeStep < 2 ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              handleNext();
            }}
            sx={{ mt: 3, mr: 1 }}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3, mr: 1 }}
          >
            Finalizar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepperButtons;
