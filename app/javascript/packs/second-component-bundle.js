import ReactOnRails from 'react-on-rails';

import SecondComponent from '../bundles/SecondComponent/components/SecondComponent';

// This is how react-on-rails can see the SecondComponent in the browser.
ReactOnRails.register({
  SecondComponent,
});