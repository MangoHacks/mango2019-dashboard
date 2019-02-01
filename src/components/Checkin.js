import React from "react";
import { DashBlobTop, DashBlobCircle } from "./Icons";

import hackers from "../services/hackers";
import { BeatLoader } from "react-spinners";

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default class Checkin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hackers: [], query: "", queryInput: "" };
  }

  async componentDidMount() {
    const { data } = await hackers.read(100);
    this.setState({
      hackers: data.applicants,
      count: data.count,
      checkedInCount: data.checkedInCount
    });
  }

  loadHackers = async query => {
    let { checkedInCount } = this.state;
    let applicants = [];
    try {
      if (query.trim().length == 0) {
        const { data } = await hackers.read(100);
        applicants = data.applicants;
        checkedInCount = data.checkedInCount;
      } else {
        const { data } = await hackers.search(query);
        applicants = data.applicants;
        checkedInCount = data.checkedInCount;
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({
      hackers: applicants,
      checkedInCount
    });
  };

  onSearchInputChange = event => {
    this.setState(
      {
        queryInput: event.target.value
      },
      async () => {
        debounce(await this.loadHackers(this.state.queryInput), 300);
      }
    );
  };

  onLogout = () => {
    localStorage.removeItem("JWT");
    this.props.history.push("/");
  };

  onCheckin = async hacker => {
    try {
      await hackers.checkIn(hacker.email);
      await this.loadHackers(this.state.queryInput);
    } catch (err) {
      console.log(err);
      alert("Error checking in", err.response.data.error);
    }
  };

  onWalkinClick = () => {
    this.props.history.push("/hacker");
  };

  render() {
    const { hackers, checkedInCount, queryInput } = this.state;

    return (
      <div className="checkin p-2 mt-3">
        <DashBlobTop className="dash-blob-top" />
        <DashBlobCircle className="dash-blob-circle" />
        <div className="main card pt-2 pb-3">
          <h1 className="heading">{checkedInCount} Checkins</h1>
          <div className="d-flex p-2 justify-content-between align-items-center">
            <button
              onClick={this.onWalkinClick}
              className="btn btn-info btn-sm"
            >
              Register Walkin
            </button>
            <button onClick={this.onLogout} className="btn btn-link btn-sm">
              Logout
            </button>
          </div>
          <hr className="mb-1" />
          <div className="search p-2">
            <div className="form-group mb-0">
              <label htmlFor="hacker">
                <b>👨🏻‍💻 Search a Hacker</b>
              </label>
              <input
                name="hackerName"
                type="text"
                className="form-control"
                aria-describedby="hackerName"
                placeholder="Mike Swift"
                autoComplete="off"
                value={queryInput}
                onChange={this.onSearchInputChange}
              />
            </div>
          </div>
          <div className="p-3">
            {hackers.length > 0 && (
              <HackerList
                key={checkedInCount}
                hackers={hackers}
                onCheckin={this.onCheckin}
              />
            )}
            {queryInput.length > 0 && hackers.length == 0 && (
              <div className="text-center">No Results</div>
            )}
            {queryInput.length == 0 && hackers.length > 0 && (
              <div className="text-center">
                <BeatLoader color="#694eff" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function HackerList({ hackers, onCheckin }) {
  return (
    <div>
      {hackers.map((hacker, index) => (
        <HackerRow
          key={`${hacker.email}_${hacker.checkIn}`}
          hacker={hacker}
          onCheckin={() => onCheckin(hacker)}
        />
      ))}
    </div>
  );
}

function HackerRow({ hacker, onCheckin }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h5 className="mb-0">
          <strong>
            {hacker.firstName} {hacker.lastName}
          </strong>
        </h5>
        <div>{hacker.email}</div>
        <div className="text-muted">{hacker.school}</div>
      </div>
      {hacker.checkIn ? (
        <button disabled={true} className="btn btn-default disabled">
          Checked In
        </button>
      ) : (
        <button onClick={() => onCheckin()} className="btn btn-primary">
          Checkin
        </button>
      )}
    </div>
  );
}
