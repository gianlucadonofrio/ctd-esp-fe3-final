import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

type ControlledTextInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  regex?: RegExp;
  type?: "text" | "password" | "number" | "tel" | string;
  onInputChange?: (e: any) => void;
  onFocus?: (e: any) => void;
};
const TextFieldInput = ({
  name,
  label,
  defaultValue,
  maxLength,
  regex,
  type = "text",
  onInputChange,
  onFocus,
}: ControlledTextInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>>({
    name: name,
    control,
    defaultValue,
  });

  const inputValue = (value: any) => {
    if (regex) {
      return value.replace(regex, "");
    }
    return value;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      mb={2}
      sx={{
        position: "relative",
        paddingY: "5px",
      }}
    >
      <TextField
        onChange={(e) => {
          onChange(e.target.value);
          onInputChange && onInputChange(e);
        }}
        value={inputValue(value)}
        label={label}
        name={name}
        inputRef={ref}
        data-testid={name + "-input"}
        type={showPassword ? "text" : type}
        inputProps={{ maxLength: maxLength }}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
        onFocus={onFocus}
      />
      {type === "password" && (
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          sx={{
            position: "absolute",
            right: "8px",
            top: "10px",
          }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      )}
    </Box>
  );
};

export default TextFieldInput;
