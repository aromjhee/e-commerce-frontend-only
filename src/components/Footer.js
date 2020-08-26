import React from 'react';

const Footer = () => {
  return (
    <div className='col-start-1 col-span-1 row-start-3 row-span-1 navbar-bg-color h-12 w-full flex justify-center items-center'>
      <span className='link-hover-color'>
        <a href='https://github.com/aromjhee'>
          <i className="fa fa-github fa-2x" aria-hidden="true"></i>
        </a>
      </span>
      <span className='link-hover-color px-10'>
        <a href='https://www.linkedin.com/in/arom-jhee/'>
          <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
        </a>
      </span>
      <span className='link-hover-color'>
        <a href='https://angel.co/u/arom-jhee'>
          <i className="fa fa-angellist fa-2x" aria-hidden="true"></i>
        </a>
      </span>
    </div>
  )
}

export default Footer;