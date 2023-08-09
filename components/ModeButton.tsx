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
        aria-label="Toggle light and dark mode"
      />
    );
  }
  return (
    <IconButton
      variant="plain"
      color="neutral"
      aria-label="Toggle light and dark mode"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
