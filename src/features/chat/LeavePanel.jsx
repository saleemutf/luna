import { useState, useEffect } from 'react';

const LeavePanel = ({ messages }) => {
  const [leaveInfo, setLeaveInfo] = useState({
    requestId: '-',
    status: '-',
    type: '-',
    startDate: '-',
    endDate: '-',
    duration: '-',
    returnDate: '-',
    requiredDocs: '-'
  });

  useEffect(() => {
    if (!messages.length) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type === 'assistant') {
      updateLeaveInfo(lastMessage.content);
    }
  }, [messages]);

  const extractDates = (text) => {
    const dates = {
      start: null,
      end: null
    };

    // Pattern for ISO dates (YYYY-MM-DD)
    const isoPattern = /\d{4}-\d{2}-\d{2}/g;
    const matches = text.match(isoPattern);

    if (matches && matches.length >= 1) {
      dates.start = matches[0];
      if (matches.length >= 2) {
        dates.end = matches[1];
      }
    }

    return dates;
  };

  const extractLeaveType = (text) => {
    const leaveTypes = {
      'vacation': ['vacation', 'holiday', 'time off', 'day off', 'annual leave'],
      'sick': ['sick', 'medical', 'health', 'doctor', 'hospital', 'illness'],
      'personal': ['personal', 'family', 'emergency'],
      'parental': ['parental', 'maternity', 'paternity', 'baby', 'child'],
      'bereavement': ['bereavement', 'funeral', 'death'],
      'unpaid': ['unpaid', 'leave without pay', 'lwop']
    };

    text = text.toLowerCase();
    for (const [type, keywords] of Object.entries(leaveTypes)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }
    return null;
  };

  const updateLeaveInfo = (text) => {
    const newInfo = { ...leaveInfo };
    const dates = extractDates(text);
    const leaveType = extractLeaveType(text);

    if (dates.start) newInfo.startDate = dates.start;
    if (dates.end) newInfo.endDate = dates.end;
    if (leaveType) newInfo.type = leaveType;

    // Generate request ID if not set
    if (newInfo.requestId === '-') {
      newInfo.requestId = '#LR' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }

    // Calculate duration and return date if we have both dates
    if (dates.start && dates.end) {
      const start = new Date(dates.start);
      const end = new Date(dates.end);
      
      // Calculate duration
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      newInfo.duration = `${days} day${days > 1 ? 's' : ''}`;
      
      // Calculate return date (next business day after end date)
      const returnDate = new Date(end);
      returnDate.setDate(returnDate.getDate() + 1);
      while (returnDate.getDay() === 0 || returnDate.getDay() === 6) {
        returnDate.setDate(returnDate.getDate() + 1);
      }
      newInfo.returnDate = returnDate.toISOString().split('T')[0];
    }

    setLeaveInfo(newInfo);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hidden">
      <div className="text-xl font-semibold mb-6">Leave Overview</div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <InfoItem label="Request ID" value={leaveInfo.requestId} />
        <InfoItem label="Status" value={leaveInfo.status} />
        <InfoItem label="Type" value={leaveInfo.type} />
        <InfoItem label="Start Date" value={leaveInfo.startDate} />
        <InfoItem label="End Date" value={leaveInfo.endDate} />
        <InfoItem label="Duration" value={leaveInfo.duration} />
        <InfoItem label="Return Date" value={leaveInfo.returnDate} />
        <InfoItem label="Required Documents" value={leaveInfo.requiredDocs} />
      </div>

      <div className="mb-8">
        <div className="text-lg font-medium mb-4">Leave Policy Details</div>
        <p className="text-gray-600 text-sm mb-4">
          Allows employees to take paid leave for vacation, personal time, or rest.
        </p>
        <div className="space-y-2">
          <PolicyItem text="Minimum 6 months of continuous employment" />
          <PolicyItem text="No active disciplinary actions" />
          <PolicyItem text="Adequate leave balance available" />
        </div>
      </div>

      <div>
        <div className="text-lg font-medium mb-4">Required Documents</div>
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="font-medium">Leave Application Form</div>
            <div className="text-sm text-gray-500">Due by May 15, 2025</div>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

const PolicyItem = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="text-green-600">✓</span>
    <span>{text}</span>
  </div>
);

export default LeavePanel; 