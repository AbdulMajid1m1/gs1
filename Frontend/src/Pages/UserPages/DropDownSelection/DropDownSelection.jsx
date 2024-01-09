import React, { useEffect, useState } from 'react';
import './DropDownSelection.css';
import newRequest from '../../../utils/userRequest';

const DummyData = {
  megaMenu: [
    {
      name_ar: 'قسم 1',
      name_en: 'Overview',
      categories: [
        {
          url: '/category1',
          category_name_ar: 'فئة 1',
          category_name_en: 'Category 1',
          subcategories: [
            { url: '/subcategory1', category_name_ar: 'فئة فرعية 1', category_name_en: 'Subcategory 1' },
            { url: '/subcategory2', category_name_ar: 'فئة فرعية 2', category_name_en: 'Subcategory 2' },
          ],
        },
        // Add more categories as needed
      ],
    },
    {
      name_ar: 'قسم 2',
      name_en: 'Industries',
      categories: [
        {
          url: '/category3',
          category_name_ar: 'فئة 3',
          category_name_en: 'Category 3',
          subcategories: [
            { url: '/subcategory3', category_name_ar: 'فئة فرعية 3', category_name_en: 'Subcategory 3' },
            { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
            { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
            { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
          ],
        },
        {
            url: '/category3',
            category_name_ar: 'فئة 3',
            category_name_en: 'Category 3',
            subcategories: [
              { url: '/subcategory3', category_name_ar: 'فئة فرعية 3', category_name_en: 'Subcategory 3' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
            ],
          },
          {
            url: '/category3',
            category_name_ar: 'فئة 3',
            category_name_en: 'Category 3',
            subcategories: [
              { url: '/subcategory3', category_name_ar: 'فئة فرعية 3', category_name_en: 'Subcategory 3' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
              { url: '/subcategory4', category_name_ar: 'فئة فرعية 4', category_name_en: 'Subcategory 4' },
            ],
          },
        // Add more categories as needed
      ],
    },
    {
      name_ar: 'قسم 3',
      name_en: 'Solutions',
      categories: [
        {
          url: '/category5',
          category_name_ar: 'فئة 5',
          category_name_en: 'Category 5',
          subcategories: [
            { url: '/subcategory5', category_name_ar: 'فئة فرعية 5', category_name_en: 'Subcategory 5' },
            { url: '/subcategory6', category_name_ar: 'فئة فرعية 6', category_name_en: 'Subcategory 6' },
          ],
        },
        // Add more categories as needed
      ],
    },
    {
      name_ar: 'قسم 4',
      name_en: 'Services',
      categories: [
        {
          url: '/category8',
          category_name_ar: 'فئة 8',
          category_name_en: 'Category 8',
          subcategories: [
            { url: '/subcategory7', category_name_ar: 'فئة فرعية 7', category_name_en: 'Subcategory 8' },
            { url: '/subcategory8', category_name_ar: 'فئة فرعية 8', category_name_en: 'Subcategory 8' },
          ],
        },
      
      ],
    },
    {
        name_ar: 'قسم 4',
        name_en: 'Resources',
        categories: [
          {
            url: '/category9',
            category_name_ar: 'فئة 9',
            category_name_en: 'Category 9',
            subcategories: [
              { url: '/subcategory9', category_name_ar: 'فئة فرعية 7', category_name_en: 'Subcategory 9' },
              { url: '/subcategory9', category_name_ar: 'فئة فرعية 8', category_name_en: 'Subcategory 9' },
            ],
          },
        
        ],
      },
      {
        name_ar: 'قسم 4',
        name_en: 'Products Tools',
        categories: [
          {
            url: '/category10',
            category_name_ar: 'فئة 7',
            category_name_en: 'Category 10',
            subcategories: [
              { url: '/subcategory10', category_name_ar: 'فئة فرعية 7', category_name_en: 'Subcategory 10' },
              { url: '/subcategory10', category_name_ar: 'فئة فرعية 8', category_name_en: 'Subcategory 10' },
            ],
          },
        
        ],
      },
      {
        name_ar: 'قسم 4',
        name_en: 'Support',
        categories: [
          {
            url: '/category11',
            category_name_ar: 'فئة 7',
            category_name_en: 'Category 11',
            subcategories: [
              { url: '/subcategory11', category_name_ar: 'فئة فرعية 7', category_name_en: 'Subcategory 11' },
              { url: '/subcategory11', category_name_ar: 'فئة فرعية 8', category_name_en: 'Subcategory 11' },
            ],
          },
        
        ],
      },
      {
        name_ar: 'قسم 4',
        name_en: 'MEMA Forum',
        categories: [
          {
            url: '/category12',
            category_name_ar: 'فئة 7',
            category_name_en: 'Category 12',
            subcategories: [
              { url: '/subcategory12', category_name_ar: 'فئة فرعية 7', category_name_en: 'Subcategory 12' },
              { url: '/subcategory12', category_name_ar: 'فئة فرعية 8', category_name_en: 'Subcategory 12' },
            ],
          },
        
        ],
      },
    // Add more sections as needed
  ],
  lang: 'en', // 'en' or 'ar'
};

const DropDownSelection = () => {
  const lang = DummyData.lang;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const [megaMenu, setMegaMenu] = useState([]);

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
        <div className="header-item item-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="menu-overlay" onClick={toggleMobileMenu}></div>
          <nav className={`menu ${isMobileMenuOpen ? 'active' : ''}`} style={{ backgroundColor: 'white' }}>
            <div className="mobile-menu-head">
              <div className="go-back">
                <i className="fa fa-angle-left" onClick={toggleMobileMenu}></i>
              </div>
              <div className="current-menu-title"></div>
              <div className="mobile-menu-close" onClick={toggleMobileMenu}>&times;</div>
            </div>
            <ul className="menu-main 2xl:flex xl:flex lg:flex 2xl:justify-center xl:justify-center lg:justify-center 2xl:items-center xl:items-center lg:items-center sm:gap-7">
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
