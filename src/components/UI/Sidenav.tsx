//This component is the list of items that display on left side of dashboard
// Importing the useTranslation hook from the react-i18next library
import { useTranslation } from 'react-i18next';
import { getContainerData } from '../../api/containerService';
import iasLogo from '../../images/svg/lgo_ias.svg'
import { useEffect, useState } from 'react';
import icnHosts from '../../images/svg/icn_hosts.svg';
import icnUsers from '../../images/svg/icn_users.svg';
import icnOrders from '../../images/svg/icn_orders.svg';
import icnContainers from '../../images/svg/icn_containers.svg';
import icnactivities from '../../images/svg/icn_activities.svg';
import icnMaterials from '../../images/svg/icn_materials.svg';
import icnRegistries from '../../images/svg/icn_registries.svg';
import icnLocations from '../../images/svg/icn_locations.svg';
import icnDevices from '../../images/svg/icn_devices.svg';
import icnViews from '../../images/svg/icn_views.svg';
import icnSettings from '../../images/svg/icn_settings.svg';
import icnStars from '../../images/svg/icons_finished_small 1.svg';
import icnBHosts from '../../images/svg/icn_b_hosts.svg';
import icnBUsers from '../../images/svg/icn_b_users.svg';
import icnBOrders from '../../images/svg/icn_b_orders.svg';
import icnBContainers from '../../images/svg/icn_b_containers.svg';
import icnBactivities from '../../images/svg/icn_b_activities.svg';
import icnBMaterials from '../../images/svg/icn_b_materials.svg';
import icnBRegistries from '../../images/svg/icn_b_registries.svg';
import icnBLocations from '../../images/svg/icn_b_locations.svg';
import icnBDevices from '../../images/svg/icn_b_devices.svg';
import icnBViews from '../../images/svg/icn_b_views.svg';
import icnBSettings from '../../images/svg/icn_b_settings.svg';
import icnBStars from '../../images/svg/icons_b_finished_small.svg';


// Defining the Sidenav component

const Sidenav = ({ setSideNav, setSubTitle, setContainerData, setLoader }: any) => {
  // Getting the t function from the useTranslation hook
  const { t } = useTranslation();

  const [selectedNavItem, setSelectedNavItem] = useState('containers');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState('containers');
  const [selectedSubMenu, setSelectedSubMenu] = useState('Containers overview');

  const getData = async () => {
    setLoader(true);
    const response = await getContainerData();
    setContainerData(response);
    setLoader(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleNavItemClick = (navItem: any) => {
    setSideNav(navItem.id)
    setSubTitle(navItem.submenus[0].text)
    if (openSubMenu === navItem.id) {
      // If the submenu is already open, close it
      setOpenSubMenu('');
    } else {
      // Otherwise, open the clicked submenu
      setOpenSubMenu(navItem.id);
    }
    if (selectedNavItem === navItem.id) {
      setSelectedNavItem('');

    } else {
      setSelectedNavItem(navItem.id);
    }
    if (navItem.id === 'hosts') {
      setSideNav(navItem.id)
      // getData()
    }
    setSelectedSubMenu('');
    // Handle the click event for the nav item
    // You can update the state, perform any necessary actions, etc.
  };

  const handleSubMenuClick = (submenu: any) => {
    setSelectedSubMenu(submenu);
    if (submenu === 'Containers overview') {
      // setSideNav('containers')
      // getData()
    }
    else if (submenu === 'Rack View') {
      setSideNav('locations')
    }
  };

  const handleNavItemHover = (navItem: any) => {
    setHoveredNavItem(navItem);
  };

  const handleNavItemLeave = () => {
    setHoveredNavItem(null);
  };

  const navItems = [
    // { id: 'hosts', icon: <img src={selectedNavItem === 'hosts' ? icnBHosts : icnHosts} className='w-4 h-4 mr-2' />, text: 'Hosts', color: '#CC0000' },
    // { id: 'users', icon: <img src={selectedNavItem === 'users' ? icnBUsers : icnUsers} className='w-4 h-4 mr-2' />, text: 'Users', color: '#00A000' },
    // { id: 'orders', icon: <img src={selectedNavItem === 'orders' ? icnBOrders : icnOrders} className='w-4 h-4 mr-2' />, text: 'Orders', color: '#3333FF' },
    {
      id: 'containers', icon: <img src={selectedNavItem === 'containers' ? icnBContainers : icnContainers} className='w-4 h-4 mr-2' />, text: 'Containers', color: '#FFC000',
      submenus: [
        { id: 'Containers overview', text: 'Containers overview' },
      ],
    },
    // { id: 'activities', icon: <img src={selectedNavItem === 'activities' ? icnBactivities : icnactivities} className='w-4 h-4 mr-2' />, text: 'Activities', color: '#FF5400' },
    // { id: 'materials', icon: <img src={selectedNavItem === 'materials' ? icnBMaterials : icnMaterials} className='w-4 h-4 mr-2' />, text: 'Materials', color: '#00A0A0' },
    // { id: 'rigisters', icon: <img src={selectedNavItem === 'rigisters' ? icnBRegistries : icnRegistries} className='w-4 h-4 mr-2' />, text: 'Rigisters', color: '#FF99CC' },
    {
      id: 'locations', icon: <img src={selectedNavItem === 'locations' ? icnBLocations : icnLocations} className='w-4 h-4 mr-2' />, text: 'Locations', color: '#9933FF',
      submenus: [
        { id: 'Rack View', text: 'Rack View' },
      ],
    },
    // { id: 'devices', icon: <img src={selectedNavItem === 'devices' ? icnBDevices : icnDevices} className='w-4 h-4 mr-2' />, text: 'Devices', color: '#000000' },
    {
      id: 'views', icon: <img src={selectedNavItem === 'views' ? icnBViews : icnViews} className='w-4 h-4 mr-2' />, text: 'Views', color: '#FFFFFF',
      submenus: [
        { id: 'SCADA', text: 'SCADA' },
      ]
    },
    {
      id: 'keycloak', icon: <img src={selectedNavItem === 'keycloak' ? icnBViews : icnViews} className='w-4 h-4 mr-2' />, text: 'Keycloak', color: '#FFFFFF',
      submenus: [
        { id: 'View', text: 'View' },
      ]
    },
    // { id: 'settings', icon: <img src={selectedNavItem === 'settings' ? icnBSettings : icnSettings} className='w-4 h-4 mr-2' />, text: 'Settings', color: '#20ECF6' },
    // { id: 'favorites', icon: <img src={selectedNavItem === 'favorites' ? icnBStars : icnStars} className='w-4 h-4 mr-2' />, text: 'Favorites', color: '#20ECF6' },
  ];

  // Returning the JSX for the Sidenav component
  return (
    <aside className="flex flex-col w-full">
      <div className='pl-3'>
        <img className='w-[36px] h-[22.5px] mb-[144px]' src={iasLogo} alt="ias logo" />
      </div>
      <div className="h-full overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <div
                className={'cursor-pointer flex items-center mb-5 h-6'}
                onClick={() => handleNavItemClick(navItem)}
                onMouseEnter={() => handleNavItemHover(navItem.id)}
                onMouseLeave={handleNavItemLeave}
              >
                <div className={'w-[3px] h-[24px] rounded mr-2'}
                  style={hoveredNavItem === navItem.id || selectedNavItem === navItem.id ? { background: navItem.color } : { background: 'none' }}></div>
                {navItem.icon}
                <p className={`text-[12px] leading-[14px] mt-[2px] font-light
                ${hoveredNavItem === navItem.id && 'font-semibold'}
                ${selectedNavItem === navItem.id ? 'font-semibold text-[#20ECF6]' : 'text-[#ffffff]'}
                `}>
                  {navItem.text}
                </p>
              </div>
              {navItem.submenus && openSubMenu === navItem.id && (
                <ul>
                  {navItem.submenus.map((submenu) => (
                    <li key={submenu.id}>
                      <div
                        className="cursor-pointer flex items-center mb-3 h-6 pl-6"
                        onClick={() => handleSubMenuClick(submenu.id)}
                      >
                        <p className={`ml-[10px] text-[12px] leading-[14px] text-white hover:font-semibold ${selectedSubMenu === submenu.id ? 'font-bold' : 'font-light'}`}
                          style={{
                            fontFamily: 'AcuminProRegular'
                          }}
                        >
                          {submenu.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidenav;