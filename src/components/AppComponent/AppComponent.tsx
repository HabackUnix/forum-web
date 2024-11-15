import SideBarComponent from "./SideBarComponent/SideBarComponent";
import MainComponent from "./MainComponent/MainComponent";
import HeaderComponent from "./HeaderComponent/HeaderComponent";

const AppComponent = () => {
  return (
    <div className="flex h-full w-full m-5 rounded-md gap-2 bg-slate-800 justify-center p-3">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 bg-slate-800 text-white rounded-md mx-5">
        <SideBarComponent />
      </aside>

      {/* Main content area */}
      <div className="flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-center bg-slate-800 rounded-md">
          <HeaderComponent />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-slate-800 rounded-md mt-2">
          <div className="flex items-center justify-center">
            <MainComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppComponent;
