import { useState } from "react";
import React from "react";

interface Tab {
  name: string;
  href: string;
}

interface TabsMenuProps {
  currentPage: string;
  tabs: Tab[];
  handleTabChange?: Function;
}

const TabsMenu: React.FC<TabsMenuProps> = ({
  currentPage,
  tabs,
  handleTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState(currentPage);

  const handleTabClick = (tabName: string) => {
    if (handleTabChange) handleTabChange(tabName);
    setSelectedTab(tabName);
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-0.5 flex">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={`shrink-0 border p-3 text-sm font-medium ${
                selectedTab === tab.name
                  ? "bg-white rounded-t-md border-gray-300 border-b-white text-sky-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabsMenu;
