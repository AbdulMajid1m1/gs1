import React from 'react';

const DropDownSelection = () => {
  return (
    <div>
      <header className="header">
        <div className="container menu-container">
          <div className="row v-center">
            {/* <!-- <div className="header-item item-left">
                <div className="logo">
                    <a href="#">My Store</a>
                </div>
            </div> --> */}
            {/* <!----Menu Start --------> */}
            {/* <div className="header-item item-center" { /* Your PHP echo $dir here */ }
            <div className="header-item item-center">
              <div className="menu-overlay"></div>
              <nav className="menu" style={{ backgroundColor: 'white' }}>
                <div className="mobile-menu-head">
                  <div className="go-back">
                    <i className="fa fa-angle-left"></i>
                  </div>
                  <div className="current-menu-title"></div>
                  <div className="mobile-menu-close">&times;</div>
                </div>
                <ul className="menu-main">
                  {/* Your PHP loop here */}
                  {/* Assuming $megaMenu is an array */}
                  {/* {megaMenu.map((section, index) => ( */}
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0)" style={{ textDecoration: 'none' }}>
                        {/* {(@lang === 'ar' ? section.name_ar : section.name_en)} */}
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <div className="sub-menu mega-menu mega-menu-column-4">
                        {/* {section.categories.map((category, catIndex) => ( */}
                          <div className="list-item">
                            <a style={{ textDecoration: 'none' }}>
                              {/* {(@lang === 'ar' ? category.category_name_ar : category.category_name_en)} */}
                            </a>
                            <ul>
                              {/* {category.subcategories.map((subcategory, subcatIndex) => ( */}
                                <li>
                                  <a style={{ textDecoration: 'none' }}>
                                    {/* {(@lang === 'ar' ? subcategory.category_name_ar : subcategory.category_name_en)} */}
                                  </a>
                                </li>
                            {/* //   ))} */}
                            </ul>
                          </div>
                        {/* // ))} */}
                      </div>
                    </li>
                  {/* ))} */}
                </ul>
              </nav>
            </div>
            {/* <!----Menu End --------> */}
            {/* <!-- <div className="header-item item-right">
                <a href="#"><i className="fa fa-search"></i></a>
                <a href="#"><i className="fa fa-heart"></i></a>
                <a href="#"><i className="fa fa-shopping-cart"></i></a> --> */}
            {/* <!---- Mobile Menu Trigger ------> */}
            <div className="mobile-menu-trigger">
              <span></span>
            </div>
            {/* <!-- </div> --> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default DropDownSelection;
