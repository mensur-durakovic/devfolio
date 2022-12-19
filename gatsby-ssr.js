const React = require('react');

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      data-name="BMC-Widget"
      src="https://cdn.buymeacoffee.com/widget/1.0.0/prod/widget.prod.min.js"
      data-id="mdurakovic"
      data-description="Support me on Buy me a coffee!"
      data-message=""
      data-color="#5F7FFF"
      data-position="right"
      data-x_margin="28"
      data-y_margin="18"
    ></script>,
  ]);
};
