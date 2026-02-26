import { QueryClientProvider } from "@tanstack/react-query";
import AntProvider from "./contexts/AntProvider";
import Rotas from "./routes/Rotas";
import { QUERYCLIENT } from "./services";
import AuthProvider from "./contexts/AuthProvider";

const App = () => {
  return (
    <>
      <QueryClientProvider client={QUERYCLIENT}>
        <AntProvider>
          <AuthProvider>
            <Rotas />
          </AuthProvider>
        </AntProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;