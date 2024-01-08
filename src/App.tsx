import React from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import {
  Box,
  PaletteMode,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Header />
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            {/* <NavBar setMode={setMode} /> */}
            <Feed />
            {/* <RightBar /> */}
          </Stack>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
