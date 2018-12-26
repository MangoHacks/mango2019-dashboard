import React from "react";

import { DashBlobTop, DashBlobCircle } from "./Icons";

import hackers from "../services/hackers";
import { BeatLoader } from "react-spinners";

class Dasboard extends React.Component {
  state = {
    hackers: [],
    search: [],
    count: 0,
    currentPage: 0,
    currentQuery: 0,
    overallPages: 0
  };

  async componentDidMount() {
    const { data } = await hackers.read();
    this.setState({
      hackers: data.applicants,
      count: data.count,
      currentPage: data.currentPage,
      currentQuery: data.currentQuery,
      overallPages: data.overallPages
    });
  }

  search = e => {
    const { hackers } = this.state;
    const hacker = e.target.value.toLowerCase();
    let matches = hackers.filter(h =>
      h.firstName.toLowerCase().includes(hacker)
    );

    this.setState({ search: matches });
  };

  fields = hackers =>
    hackers.map(hacker => (
      <tbody key={hacker.email}>
        <tr>
          <td className="text-muted">{hacker.firstName}</td>
          <td className="text-muted">{hacker.lastName}</td>
          <td className="text-muted">{hacker.email}</td>
          <td className="text-muted">{hacker.school}</td>
          <td className="text-muted">{hacker.levelOfStudy}</td>
          <td className="text-muted">{hacker.major}</td>
          <td className="text-muted">
            <a href={hacker.resume} target="_blank">
              Open
            </a>
          </td>
        </tr>
      </tbody>
    ));

  render() {
    const {
      hackers,
      search,
      count,
      currentPage,
      currentQuery,
      overallPages
    } = this.state;

    return (
      <div className="dashboard">
        <DashBlobTop className="dash-blob-top" />
        <DashBlobCircle className="dash-blob-circle" />
        <div className="card">
          <h1>Mango Cabinet 🗃</h1>
          <hr />

          <div className="search">
            <div className="form-group">
              <label htmlFor="hacker">
                <b>👨🏻‍💻 Search a Hacker</b>
              </label>
              <input
                onChange={this.search}
                name="hackerName"
                type="text"
                className="form-control"
                aria-describedby="hackerName"
                placeholder="Mike Swift"
                autoComplete="off"
              />
            </div>
          </div>

          {search.length > 0 ? (
            <table className="hackers">
              <tbody>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>School</th>
                  <th>Level Of Study</th>
                  <th>Major</th>
                  <th>Resume</th>
                </tr>
              </tbody>
              {this.fields(search)}
            </table>
          ) : hackers.length > 0 ? (
            <table className="hackers">
              <tbody>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>School</th>
                  <th>Level Of Study</th>
                  <th>Major</th>
                  <th>Resume</th>
                </tr>
              </tbody>
              {this.fields(hackers)}
            </table>
          ) : (
            <BeatLoader color="#694eff" />
          )}
        </div>
      </div>
    );
  }
}

export default Dasboard;