import React from 'react';
import Logo from './Logo';
import QuickActions from './QuickActions';
import NavSection from './NavSection';
import NavSubMenuItem from './NavSubMenuItem';
import MoreLinkWithPopup from './MoreLinkWithPopup';
import HistorySidebarSection from './HistorySidebarSection';
import SettingsMenu from './SettingsMenu';
import LogoutButton from './LogoutButton';

const LeftPanel = ({ 
    collapsed, 
    onSearchClick, 
    onAddMyLeaveScenario, 
    onAddMyLeaveRequest, 
    onAddModelLeaveScenario 
}) => {

  // TODO: Move data to a more appropriate place (e.g., context, props, or state management solution, or fetch from API)
  // Sample data for My Leave Scenarios
  const myLeaveScenariosData = {
    items: [
      { id: 'mls1', title: 'Paternity leave', href: '/my-leave-scenarios/paternity', isLocked: false },
      { id: 'mls2', title: 'Sick leave on 2May', isLocked: false },
    ],
    morePopupSections: [
      { title: 'Today', items: [{ id:'th1', title: 'Annual Leave Discussion', icon: 'fas fa-comments', meta: '2:30 PM' }] },
      { title: 'Previous 7 Days', items: [{ id:'pd1', title: 'Parental Leave Scenario', icon: 'fas fa-baby', meta: 'Mon'}] },
      { title: 'Older', items: [{ id:'ol1', title: 'Study Leave Scenario', icon: 'fas fa-graduation-cap', meta: 'Last Month'}] }
    ]
  };
  const myLeaveScenariosDropdown = (item) => [
    { label: 'Share', icon: 'fas fa-share-alt', isShareTrigger: true, action: (itemData) => console.log('Share:', itemData.title) },
    { label: 'Rename', icon: 'fas fa-edit', action: (itemData) => console.log('Rename:', itemData.title) },
    { label: 'Make request', icon: 'fas fa-paper-plane', action: (itemData) => console.log('Make request for:', itemData.title) },
    { label: 'Assign to', icon: 'fas fa-user-plus', action: (itemData) => console.log('Assign to:', itemData.title) },
    { label: 'Delete', icon: 'fas fa-trash', action: (itemData) => console.log('Delete:', itemData.title) },
  ];

  // Sample data for My Leave Requests
  const myLeaveRequestsData = {
    items: [
      { id: 'mlr1', title: 'PL1 on Apr 25' },
      { id: 'mlr2', title: 'PL2 on Apr 25' },
      { id: 'mlr3', title: 'PL3 on Apr 25' },
    ],
    morePopupSections: [
        { title: 'Today', items: [{ id:'lr_th1', title: 'PL11 on Apr 25', icon: 'fas fa-calendar', meta: '2:30 PM' }] },
    ]
  };
  const myLeaveRequestsDropdown = (item) => [
    { label: 'View Details', icon: 'fas fa-eye', action: (itemData) => console.log('View details:', itemData.title) },
    { label: 'Rename', icon: 'fas fa-edit', action: (itemData) => console.log('Rename request:', itemData.title) },
    { label: 'Cancel', icon: 'fas fa-times-circle', action: (itemData) => console.log('Cancel request:', itemData.title) },
    { label: 'Delete', icon: 'fas fa-trash', action: (itemData) => console.log('Delete request:', itemData.title) },
  ];

  // Sample data for Model Leave Scenarios
  const modelLeaveScenariosData = {
    items: [
      { id: 'mdls1', title: 'Paternity Leave' },
      { id: 'mdls2', title: 'Maternity Leave' },
    ],
    morePopupSections: [ /* Add sections as per newChat.html lines 572-662 */]
  };
  const modelLeaveScenariosDropdown = (item) => [
    { label: 'Assign to', icon: 'fas fa-share', action: (itemData) => console.log('Assign model:', itemData.title) },
    { label: 'Rename', icon: 'fas fa-times-circle', action: (itemData) => console.log('Rename model:', itemData.title) }, 
    { label: 'Modify', icon: 'fas fa-edit', action: (itemData) => console.log('Modify model:', itemData.title) },
    { label: 'Delete', icon: 'fas fa-trash', action: (itemData) => console.log('Delete model:', itemData.title) },
  ];

  // Sample data for Awaiting Approval
  const awaitingApprovalData = {
    items: [
      { id: 'aa1', title: 'Zeeshan' },
      { id: 'aa2', title: 'Payal' },
    ],
    morePopupSections: [ /* Add sections as per newChat.html lines 713-803, includes status */]
  };
  const awaitingApprovalDropdown = (item) => [
    { label: 'Approve', icon: 'fas fa-check', action: (itemData) => console.log('Approve for:', itemData.title) },
    { label: 'Reject', icon: 'fas fa-times', action: (itemData) => console.log('Reject for:', itemData.title) },
  ];

  // Sample data for View Shared Leave Scenarios
  const sharedLeaveScenariosData = {
    items: [
      { id: 'vsls1', title: 'Leave Scenario 1' },
      { id: 'vsls2', title: 'Leave Scenario 2' },
    ],
  };
  const sharedLeaveScenariosDropdown = (item) => [
    { label: 'Delete', icon: 'fas fa-trash', action: (itemData) => console.log('Delete shared:', itemData.title) },
  ];
  
  // Placeholder data for static history sections in the sidebar
  const sidebarHistory = {
    today: [{ id:'sh_td1', title: 'Annual Leave Discussion' }, { id:'sh_td2', title: 'Summer Vacation Scenario' }],
    prev7Days: [{ id:'sh_p7d1', title: 'Annual Leave Approved' }, { id:'sh_p7d2', title: 'Parental Leave Scenario' }],
    older: [{ id:'sh_old1', title: 'Previous Leave Requests' }],
  };

  // Handlers for QuickActions (to be implemented, e.g., show modals)
  const handleNewChatClick = () => {
    window.location.href = '/';
  };

  // Handlers for MorePopup item click
  const handleMoreItemClick = (item) => console.log('More item clicked:', item.title);

  // Handler for static history item click
  const handleSidebarHistoryItemClick = (item) => console.log('Sidebar history item clicked:', item.title);

  // Logout handler
  const handleLogout = () => console.log('Logout requested');

  if (collapsed) {
    return (
      <div className="left-panel collapsed w-16 bg-white text-gray-800 p-3 flex flex-col h-full transition-all duration-300 shadow-lg border-r">
        <div className="logo-container mb-4">
          <a href="/" title="LUNA Home">
            <img src={"/images/davavo_logo.png"} alt="LUNA" style={{ maxWidth: '32px', height: 'auto' }} />
          </a>
        </div>
        <button onClick={onSearchClick} title="Search (⌘K)" className="p-2.5 hover:bg-gray-100 rounded-md cursor-pointer mb-2 focus:outline-none">
            <i className="fas fa-search text-gray-800"></i>
        </button>
        <button onClick={handleNewChatClick} title="New Chat" className="p-2.5 hover:bg-gray-100 rounded-md cursor-pointer mb-2 focus:outline-none">
            <i className="fa-brands fa-rocketchat text-gray-800"></i>
        </button>
        {/* Placeholder icons for other sections when collapsed */}
        <div className="mt-auto">
            <button onClick={handleLogout} title="Logout" className="p-2.5 hover:bg-gray-100 rounded-md cursor-pointer focus:outline-none">
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="left-panel w-72 bg-white text-gray-800 p-4 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 transition-all duration-300 shadow-md border-r">
      <Logo />
      <QuickActions onSearchClick={onSearchClick} onNewChatClick={handleNewChatClick} />

      <NavSection title="My Leave Scenarios" onAddItem={onAddMyLeaveScenario} initiallyOpen={true} allowCollapse={false}>
        {myLeaveScenariosData.items.map(item => (
          <NavSubMenuItem 
            key={item.id} 
            title={item.title} 
            href={item.href} 
            isLocked={item.isLocked}
            dropdownItems={myLeaveScenariosDropdown(item)}
            itemData={item}
          />
        ))}
        <MoreLinkWithPopup popupTitle="My Leave Scenarios History" sections={myLeaveScenariosData.morePopupSections} onItemClick={handleMoreItemClick} />
      </NavSection>

      <NavSection title="My Leave Requests" onAddItem={onAddMyLeaveRequest} initiallyOpen={true} allowCollapse={false}>
        {myLeaveRequestsData.items.map(item => (
          <NavSubMenuItem 
            key={item.id} 
            title={item.title} 
            dropdownItems={myLeaveRequestsDropdown(item)}
            itemData={item}
            onClick={(e) => {
              e.preventDefault();
              console.log('Clicked on leave request:', item.title);
            }}
          />
        ))}
        <MoreLinkWithPopup popupTitle="My Leave Requests History" sections={myLeaveRequestsData.morePopupSections} onItemClick={handleMoreItemClick} />
      </NavSection>
      
      <NavSection title="Model Leave Scenarios" onAddItem={onAddModelLeaveScenario} initiallyOpen={true} allowCollapse={false}>
        {modelLeaveScenariosData.items.map(item => (
          <NavSubMenuItem 
            key={item.id} 
            title={item.title} 
            dropdownItems={modelLeaveScenariosDropdown(item)}
            itemData={item}
          />
        ))}
        {modelLeaveScenariosData.morePopupSections && modelLeaveScenariosData.morePopupSections.length > 0 && (
            <MoreLinkWithPopup popupTitle="Model Scenarios History" sections={modelLeaveScenariosData.morePopupSections} onItemClick={handleMoreItemClick} />
        )}
      </NavSection>

      <NavSection title="Awaiting Approval" initiallyOpen={false}>
         {awaitingApprovalData.items.map(item => (
          <NavSubMenuItem 
            key={item.id} 
            title={item.title} 
            dropdownItems={awaitingApprovalDropdown(item)}
            itemData={item}
          />
        ))}
         {awaitingApprovalData.morePopupSections && awaitingApprovalData.morePopupSections.length > 0 && (
            <MoreLinkWithPopup popupTitle="Awaiting Approval History" sections={awaitingApprovalData.morePopupSections} onItemClick={handleMoreItemClick} />
        )}
      </NavSection>

      <NavSection title="View Shared Leave Scenarios" initiallyOpen={false}>
        {sharedLeaveScenariosData.items.map(item => (
          <NavSubMenuItem 
            key={item.id} 
            title={item.title} 
            dropdownItems={sharedLeaveScenariosDropdown(item)}
            itemData={item}
          />
        ))}
      </NavSection>

      {/* Static History Section in Sidebar */}
      <div className="element mt-4 pt-4 border-t border-gray-200">
        <div className="history-heading text-sm font-semibold text-gray-800 mb-3 px-2">History</div>
        <HistorySidebarSection title="Today" items={sidebarHistory.today} onItemClick={handleSidebarHistoryItemClick} />
        <HistorySidebarSection title="Previous 7 Days" items={sidebarHistory.prev7Days} onItemClick={handleSidebarHistoryItemClick} />
        <HistorySidebarSection title="Older" items={sidebarHistory.older} onItemClick={handleSidebarHistoryItemClick} />
      </div>

      <NavSection title="Settings" initiallyOpen={false}>
        <div className="pl-2">
          <SettingsMenu />
        </div>
      </NavSection>

      <div className="mt-auto bg-white pt-3 pb-2 px-1">
        <LogoutButton onLogout={handleLogout} />
      </div>
      
    </div>
  );
};

export default LeftPanel; 