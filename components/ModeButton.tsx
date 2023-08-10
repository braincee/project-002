import { useColorScheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import React, { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ModeButton() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        variant="plain"
        color="neutral"
        sx={{
          border:
            mode == "dark"
              ? "1px solid #32383e !important"
              : "1px solid #CDD7E1 !important",
        }}
        aria-label="Toggle light and dark mode"
      />
    );
  }
  return (
    <IconButton
      variant="plain"
      color="neutral"
      aria-label="Toggle light and dark mode"
      sx={{
        border:
          mode === "dark"
            ? "1px solid #32383e !important"
            : "1px solid #CDD7E1 !important",
      }}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
