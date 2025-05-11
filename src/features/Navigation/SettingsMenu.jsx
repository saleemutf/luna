import React from 'react';
import ToggleSwitch from '../../components/Form/ToggleSwitch';

const SettingsMenu = () => {
  // Initial preferences can be loaded from localStorage or defaults
  const [preferences, setPreferences] = React.useState(() => {
    const savedType = localStorage.getItem('preference_type');
    const savedSpeak = localStorage.getItem('preference_speak');
    const savedReadResponses = localStorage.getItem('preference_readResponses');
    return {
      type: savedType !== null ? JSON.parse(savedType) : true, 
      speak: savedSpeak !== null ? JSON.parse(savedSpeak) : false, 
      readResponses: savedReadResponses !== null ? JSON.parse(savedReadResponses) : false,
    };
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: value };
      localStorage.setItem(`preference_${key}`, JSON.stringify(value));
      return newPrefs;
    });
  };

  const preferenceItems = [
    {
      label: 'I like to Type',
      icon: 'fas fa-keyboard',
      preferenceKey: 'type',
    },
    {
      label: 'I like to Speak',
      icon: 'fas fa-microphone',
      preferenceKey: 'speak',
    },
    {
      label: 'Reads responses By default',
      icon: 'fas fa-volume-up',
      preferenceKey: 'readResponses',
    },
  ];

  return (
    <div className="settings-menu">
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
  );
};

export default SettingsMenu; 