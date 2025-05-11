import React, { useState, useRef, useEffect } from 'react';
import ToggleSwitch from '../../components/Form/ToggleSwitch'; // Updated import path

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Initial preferences can be loaded from localStorage or defaults
  const [preferences, setPreferences] = useState(() => {
    const savedType = localStorage.getItem('preference_type');
    const savedSpeak = localStorage.getItem('preference_speak');
    const savedReadResponses = localStorage.getItem('preference_readResponses');
    return {
      type: savedType !== null ? JSON.parse(savedType) : true, 
      speak: savedSpeak !== null ? JSON.parse(savedSpeak) : false, 
      readResponses: savedReadResponses !== null ? JSON.parse(savedReadResponses) : false,
    };
  });
  const settingsRef = useRef(null);

  const handleToggleOpen = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: value };
      localStorage.setItem(`preference_${key}`, JSON.stringify(value));
      // console.log(`Preference ${key} is now ${value ? 'enabled' : 'disabled'}. Saved to localStorage.`);
      // Add any side effects of preference changes here (e.g., if 'speak' changes, update speech synthesis settings)
      return newPrefs;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target) && !event.target.closest('.settings-trigger')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, settingsRef]);

  const preferenceItems = [
    {
      label: 'I like to Type',
      icon: 'fas fa-keyboard', // Corrected based on typical association
      preferenceKey: 'type',
    },
    {
      label: 'I like to Speak',
      icon: 'fas fa-microphone', // Corrected based on typical association
      preferenceKey: 'speak',
    },
    {
      label: 'Reads responses By default',
      icon: 'fas fa-volume-up',
      preferenceKey: 'readResponses',
    },
  ];

  return (
    <div ref={settingsRef} className="settings-menu relative mt-3 pt-3 border-t border-gray-700">
      <button 
        className="settings-trigger w-full flex justify-between items-center py-2 px-2.5 rounded-md hover:bg-gray-700 cursor-pointer text-sm text-gray-200 transition-colors duration-150 focus:outline-none focus:bg-gray-700"
        onClick={handleToggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="settings-content"
      >
        <span className="section-title font-medium">Settings</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      {isOpen && (
        <div 
            id="settings-content"
            className="settings-content absolute bottom-full left-0 w-full bg-gray-750 rounded-md shadow-lg mb-2 p-2 border border-gray-700 z-10"
        >
          {preferenceItems.map(item => (
            <ToggleSwitch 
              key={item.preferenceKey}
              label={item.label}
              icon={item.icon}
              checked={preferences[item.preferenceKey]}
              onChange={handlePreferenceChange}
              preferenceKey={item.preferenceKey}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsMenu; 