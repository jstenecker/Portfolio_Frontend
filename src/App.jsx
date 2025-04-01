import AppRouter from "./router";
import ThemeBackground from "./components/ThemeBackground";

const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated background behind everything */}
      <ThemeBackground />

      {/* Page content sits above the background */}
      <div className="relative z-10 md:flex">
        
        {/* Main content with left margin for sidebar */}
        <div className="w-full md:ml-64">
          <AppRouter />
        </div>
      </div>
    </div>
  );
};

export default App;
