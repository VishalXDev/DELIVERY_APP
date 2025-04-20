import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main
          role="main"
          className="flex-1 overflow-y-auto bg-gray-100 p-4 scroll-smooth"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
