import React from 'react';

const ToggleSwitch = ({ label, icon, checked, onChange, preferenceKey, disabled = false }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(preferenceKey, e.target.checked);
    }
  };

  return (
    <div className={`preference-item flex justify-between items-center py-1.5 px-1 hover:bg-gray-50 rounded-md transition-colors duration-150 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="preference-label flex items-center text-xs text-gray-700">
        {icon && <i className={`${icon} mr-2.5 text-gray-600 w-4 text-center`}></i>}
        <span>{label}</span>
      </div>
      <label className="toggle-switch relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked} 
          onChange={handleChange} 
          disabled={disabled}
          aria-label={label}
        />
        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
      </label>
    </div>
  );
};

export default ToggleSwitch; 