import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DocumentManagement } from './pages/DocumentManagement';
import { QueryInterfacePage } from './pages/QueryInterface';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/navigation-menu';
import { cn } from './lib/utils';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">RAG Document Manager</h1>
                </div>
                <NavigationMenu className="ml-6">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/" className={cn(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        "hover:text-gray-700 hover:border-gray-300"
                      )}>
                        Documents
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/query" className={cn(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        "hover:text-gray-700 hover:border-gray-300"
                      )}>
                        Query
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<DocumentManagement />} />
              <Route path="/query" element={<QueryInterfacePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
