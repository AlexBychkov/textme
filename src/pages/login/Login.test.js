// import React from 'react';
// import { render, unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';

// import Login from'./Login'

// let container = null;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it('renders static page', () => {
  
//   act(() => {
//     render(<Login value="+48574585959" />, container);
//   });
//   expect(container.textContent).toBe('Hey');
// });