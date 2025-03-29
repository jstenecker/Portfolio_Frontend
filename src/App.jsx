import AppRouter from "./router";
import ThemeBackground from "./components/ThemeBackground";

const App = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Static Sidebar on the left */}
      <div className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 flex-col justify-center px-6 z-40 bg-background">
        <h1 className="text-2xl font-bold text-text">Joseph Stenecker</h1>
        <h2 className="text-md font-medium text-text">Full Stack Software Engineer</h2>
      </div>

      {/* Main content with left margin for sidebar */}
      <div className="w-full md:ml-64">
        <ThemeBackground />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
