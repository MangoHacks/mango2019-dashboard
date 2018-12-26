import React from "react";
import { BeatLoader } from "react-spinners";

import { Facebook, Twitter, Instagram, Slack, LoginBlob } from "./Icons";
import Mango from "./Mango";

import token from "../services/token";

class Login extends React.Component {
  state = { loading: false };

  submit = async e => {
    e.preventDefault();

    const form = new FormData(e.target);

    const password = form.get("password");

    if (password.length > 50) alert("Invalid Password");

    try {
      this.setState({ loading: true });
      await token.create(password);
      this.props.history.push({ pathname: "/dashboard" });
    } catch (e) {
      this.setState({ loading: false, resume: "Upload resume" });

      alert(e);
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="login">
        <Mango className="login-mango" color="white" />
        <LoginBlob className="login-blob" />
        <div className="response">
          <div className="card">
            <h1>🥭 Oh it's sweet!</h1>
            <hr />
            {/* <h5>🥭 Login</h5> */}

            {loading && <BeatLoader color="#694eff" />}

            {loading || (
              <form onSubmit={this.submit}>
                <div className="form-group">
                  <label htmlFor="email">
                    Password&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    name="password"
                    type="password"
                    className="form-control"
                    aria-describedby="password"
                    placeholder="password"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <button type="submit">Submit!</button>
                </div>
              </form>
            )}

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
      </div>
    );
  }
}

export default Login;