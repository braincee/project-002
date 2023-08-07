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
    // to avoid layout shift, render a placeholder button
    return (
      <IconButton
        variant="plain"
        color="neutral"
        sx={{ borderRadius: '0px !important' }}
        aria-label="Toggle light and dark mode"
      />
    );
  }
  return (
    <IconButton
      variant="plain"
      color="neutral"
      aria-label="Toggle light and dark mode"
      sx={{ borderRadius: '0px !important' }}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
