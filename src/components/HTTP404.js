import React from "react";

import { Facebook, Twitter, Instagram, Slack } from "./Icons";

const HTTP404 = props => {
  return (
    <div className="response">
      <div className="card">
        <h1>⚠️ A glitch!</h1>
        <hr />
        <h5>🥭 woah</h5>
        <p>
          We’re not quite sure what went wrong 🤷🏻‍♂. <br />
          You can go back, or try contacting us if you need some help.
        </p>

        <a href="https://mangohacks.com">
          <b>mangohacks.com</b>
        </a>
        <hr />

        <div className="social-media">
          <a target="_blank" href="https://www.facebook.com/MangoHacks">
            <Facebook fill="#000" />
          </a>
          <a target="_blank" href="https://twitter.com/fiumangohacks">
            <Twitter fill="#000" />
          </a>
          <a target="_blank" href="https://instagram.com/fiumangohacks">
            <Instagram fill="#000" />
          </a>
          <a target="_blank" href="https://mangohacks.slack.com/">
            <Slack fill="#000" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HTTP404;
