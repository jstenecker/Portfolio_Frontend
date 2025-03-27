import AppRouter from "./router";
import ThemeBackground from "./components/ThemeBackground";

const App = () => {
  return (
    <div className="relative">
      <ThemeBackground />
      <AppRouter />
    </div>
  );
};

export default App;
