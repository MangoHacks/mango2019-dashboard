import React from "react";
import { BeatLoader } from "react-spinners";

import Mango from "./Mango";
import { RegBlobTop, RegBlobBottom } from "./Icons";

import hackers from "../services/hackers"; 

import schools from "../data/schools.json";
import majors from "../data/majors.json";

class Hacker extends React.Component {
  state = { loading: false };

  submit = async e => {
    e.preventDefault();

    const form = new FormData(e.target);
    let values = [...form.values()];
    let fields = {};
    [...form.keys()].forEach((key, i) => {
      fields[key] = values[i];
    });

    try {
      this.setState({ loading: true });
      await hackers.register(fields);

      this.props.history.push({ pathname: "/hackerresponse" });
    } catch (e) {
      this.setState({ loading: false });
      alert(e);
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        <RegBlobTop className="reg-blob" />
        <RegBlobBottom className="reg-blob-bottom" />
        <Mango className="register-mango" color="white" />
        <div className="registration-card">
          {loading && (
            <div className="loading">
              <h2>Prepping something sweet..</h2>
              <p className="text-muted">One sec 😬..</p>
              <BeatLoader color="#FF4E4E" />
            </div>
          )}

          {loading || (
            <React.Fragment>
              <h1>Walkin Registration</h1>
              <form onSubmit={this.submit}>
                {/* FirstName */}
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    name="firstName"
                    type="text"
                    className="form-control"
                    aria-describedby="firstName"
                    placeholder="Harry"
                    autoComplete="off"
                  />
                </div>

                {/* LastName */}
                <div className="form-group">
                  <label htmlFor="firstName">
                    Last Name&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    name="lastName"
                    type="text"
                    className="form-control"
                    aria-describedby="lastName"
                    placeholder="Potter"
                    autoComplete="off"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">
                    Email&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="form-control"
                    aria-describedby="email"
                    placeholder="foo@bar.com"
                    autoComplete="off"
                  />
                </div>

                {/* School */}
                <div className="form-group">
                  <label htmlFor="school">
                    School&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    list="schools"
                    name="school"
                    placeholder="Hogwarts School of Witchcraft and Wizardry"
                    autoComplete="off"
                  />
                  <datalist id="schools">
                    {schools.map(({ institution }, i) => (
                      <option key={i} value={institution} />
                    ))}
                  </datalist>
                </div>

                {/* Major */}
                <div className="form-group">
                  <label htmlFor="major">
                    Major&nbsp;
                    <span className="text-muted">
                      <small>required</small>
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    list="majors"
                    name="major"
                    placeholder="Underwater basket weaving"
                    autoComplete="off"
                  />
                  <datalist id="majors">
                    {majors.map(({ major }, i) => (
                      <option key={i} value={major} />
                    ))}
                  </datalist>
                </div>
                <br />
                {/* Button */}
                <div className="form-group">
                  <button type="submit">Sign me up!</button>
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Hacker;
