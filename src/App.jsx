import React, { useState, useEffect } from 'react';
import './App.css'; // Keep for now, might prune later

import LeftPanel from './features/Navigation/LeftPanel';
import MainContentArea from './features/Chat/MainContentArea';
import SearchModal from './features/Search/SearchModal';
import CreateItemModal from './components/Modal/CreateItemModal'; // Import CreateItemModal
// import ListeningUI from './features/Chat/ListeningUI';
// import VoiceWaveOverlay from './features/Chat/VoiceWaveOverlay';
// import SearchModal from './features/Search/SearchModal';
// import VoicePromptModal from './features/Chat/VoicePromptModal';

// Placeholder components to avoid import errors for now
// const LeftPanel = () => <div className="left-panel-placeholder bg-gray-800 w-1/4 h-screen p-4 text-white">Left Panel Placeholder</div>;
// const MainContentArea = () => {
//   return (
//     <div className="main-content-placeholder flex-grow bg-white p-4 flex flex-col relative">
//       {/* Button to toggle left panel (from original HTML) */}
//       {/* <button 
//         onClick={onTogglePanel} 
//         className="toggle-panel absolute top-4 left-0 -ml-3 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600 transition-colors"
//         >
//         <i className="fas fa-chevron-left"></i> // Icon direction needs to change based on panel state
//       </button> */}
//       Main Content Area Placeholder
//       {/* ChatPanel and DetailsPanel will go here */}
//     </div>
//   );
// };
const ListeningUI = () => null; 
const VoiceWaveOverlay = () => null; 
const VoicePromptModal = () => null; 

// States for Create Modals
const CreateScenarioModal = () => null;
const CreateRequestModal = () => null;
const CreateModelScenarioModal = () => null; 
const ShareModal = () => null;

function App() {
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [showListeningUI, setShowListeningUI] = useState(false);
  const [showVoiceWave, setShowVoiceWave] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showVoicePromptModal, setShowVoicePromptModal] = useState(false);

  // States for Create Modals
  const [showCreateScenarioModal, setShowCreateScenarioModal] = useState(false);
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [showCreateModelScenarioModal, setShowCreateModelScenarioModal] = useState(false);
  // TODO: Add state for the main ShareModal (from original HTML, separate from NavSubMenuItem share)

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);

    // Keyboard shortcut for Search Modal (Cmd+K or Ctrl+K)
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.head.removeChild(link);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTogglePanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  // Handler to open search modal (will be passed to LeftPanel)
  const handleOpenSearchModal = () => {
    setShowSearchModal(true);
  };

  // Handlers for creating items
  const handleCreateScenario = (name) => {
    console.log('Creating My Leave Scenario:', name);
    // TODO: Add logic to update scenarios list (e.g., in LeftPanel's data or via context/API)
    setShowCreateScenarioModal(false); // Close modal on successful creation
  };
  const handleCreateRequest = (name) => {
    console.log('Creating My Leave Request:', name);
    setShowCreateRequestModal(false);
  };
  const handleCreateModelScenario = (name) => {
    console.log('Creating Model Leave Scenario:', name);
    setShowCreateModelScenarioModal(false);
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100 overflow-hidden"> 
      {showListeningUI && <ListeningUI />}
      {showVoiceWave && <VoiceWaveOverlay />}
      
      <LeftPanel 
        collapsed={isLeftPanelCollapsed} 
        onSearchClick={handleOpenSearchModal}
        onAddMyLeaveScenario={() => setShowCreateScenarioModal(true)}
        onAddMyLeaveRequest={() => setShowCreateRequestModal(true)}
        onAddModelLeaveScenario={() => setShowCreateModelScenarioModal(true)}
      />
      <MainContentArea 
        onTogglePanel={handleTogglePanel} 
        leftPanelCollapsed={isLeftPanelCollapsed} 
      /> 

      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
      {showVoicePromptModal && <VoicePromptModal onClose={() => setShowVoicePromptModal(false)} />}

      {/* Create Modals using the reusable CreateItemModal */}
      <CreateItemModal 
        isOpen={showCreateScenarioModal}
        onClose={() => setShowCreateScenarioModal(false)}
        modalTitle="Create My Leave Scenario"
        inputPlaceholder="Enter scenario name..."
        onCreate={handleCreateScenario}
      />
      <CreateItemModal 
        isOpen={showCreateRequestModal}
        onClose={() => setShowCreateRequestModal(false)}
        modalTitle="Create My Leave Request"
        inputPlaceholder="Enter request name..."
        onCreate={handleCreateRequest}
      />
      <CreateItemModal 
        isOpen={showCreateModelScenarioModal}
        onClose={() => setShowCreateModelScenarioModal(false)}
        modalTitle="Create Model Leave Scenario" // Corrected title from original HTML
        inputPlaceholder="Enter model leave scenario name..."
        onCreate={handleCreateModelScenario}
      />
      
      {/* TODO: Implement other modals: ListeningUI, VoiceWaveOverlay, VoicePromptModal, ShareModal */}
    </div>
  );
}

export default App;
