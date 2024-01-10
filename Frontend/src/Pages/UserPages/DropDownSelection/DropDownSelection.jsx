import React, { useEffect, useState } from 'react';
import './DropDownSelection.css';
import newRequest from '../../../utils/userRequest';

const DropDownSelection = () => {
  const [megaMenu, setMegaMenu] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const getAllRegisteredMembers = async () => {
    try {
      const res = await newRequest.get("/mega_menu_categories_frontSide")
      console.log(res.data);
      setMegaMenu(res.data);
        
    }
    catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    getAllRegisteredMembers();
  }
    , []);

  return (
    <header className="header">
    <div className="container menu-container">
      <div className="row v-center">
        {/* Logo */}
        {/* <div className="header-item item-left">
          <div className="logo">
            <a href="#">My Store</a>
          </div>
        </div> */}

        {/* Menu Start */}
        <div className="header-item item-center">
          <div className="menu-overlay" onClick={toggleMobileMenu}></div>
          <nav className={`menu ${isMobileMenuOpen ? 'active' : ''}`} style={{ backgroundColor: 'white' }}>
            <div className="mobile-menu-head">
              <div className="go-back">
                <i className="fa fa-angle-left" onClick={toggleMobileMenu}></i>
              </div>
              <div className="current-menu-title"></div>
              <div className="mobile-menu-close" onClick={toggleMobileMenu}>&times;</div>
            </div>
            <ul className="menu-main 2xl:flex xl:flex lg:flex 3xl:flex 3xl:justify-center 3xl:items-center 2xl:justify-center xl:justify-center lg:justify-center 2xl:items-center xl:items-center lg:items-center sm:gap-7">
              {megaMenu?.map((section, index) => (
                <li key={index} className="menu-item-has-children">
                  <a href="javascript:void(0)" style={{ textDecoration: 'none'  }}>
                    {section.name_en}
                    &nbsp;
                     <i className="fa fa-angle-down"></i>
                  </a>
                  <div className="sub-menu mega-menu mega-menu-column-4 text-blue-600">
                    {section.mega_menu_categories.map((category, catIndex) => (
                      <div key={catIndex} className="list-item">
                        <a href={category.url} style={{ textDecoration: 'none' }}>
                          {category.category_name_en}
                        </a>
                        <ul>
                          {category.footer_menus.map((subcategory, subIndex) => (
                            <li key={subIndex}>
                              <a href={subcategory.url} style={{ textDecoration: 'none' }}>
                                {subcategory.category_name_en}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Menu End */}

        {/* Right items */}
        {/* <div className="header-item item-right">
          <a href="#">
            <i className="fa fa-search"></i>
          </a>
          <a href="#">
            <i className="fa fa-heart"></i>
          </a>
          <a href="#">
            <i className="fa fa-shopping-cart"></i>
          </a> */}
        {/* Mobile Menu Trigger */}
        <div className="mobile-menu-trigger" onClick={toggleMobileMenu}>
          <span></span>
        </div>
        {/* </div> */}
      </div>
    </div>
  </header>

  );
};

export default DropDownSelection;
