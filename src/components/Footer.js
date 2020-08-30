import React from 'react';

const Footer = () => {
  return (
    <div className='col-start-1 col-span-1 row-start-3 row-span-1 navbar-bg-color h-12 w-full flex justify-center items-center'>
      <div className='link-hover-color'>
        <a href='https://github.com/aromjhee'>
          <span className='text-xs text-white hidden'>Github</span>
          <i className="fa fa-github fa-2x" aria-hidden="true"></i>
        </a>
      </div>
      <div className='link-hover-color px-10'>
        <a href='https://www.linkedin.com/in/arom-jhee/'>
          <span className='text-xs text-white hidden'>LinkedIn</span>
          <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
        </a>
      </div>
      <div className='link-hover-color'>
        <a href='https://angel.co/u/arom-jhee'>
          <span className='text-xs text-white hidden'>AngelList</span>
          <i className="fa fa-angellist fa-2x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  )
}

export default Footer;