import React from "react";

import Mango from "./Mango";

import { ResBlobTop, ResBlobBottom } from "./Icons";

const HackerResponse = props => {
  return (
    <div className="response">
      <Mango className="response-mango" color="white" />
      <ResBlobTop className="res-blob-top" />
      <ResBlobBottom className="res-blob-bottom" />

      <div className="card">
        <h1>You've registered! 🎉</h1>
        <hr />
        <h5>🥭 Sweet!</h5>
        <p className="lead">
          Make sure to ask about your badge and your wristband from the friends
          at the checkin table
        </p>

        <a href="https://mangohacks.com">
          <b>mangohacks.com</b>
        </a>
        <hr />
        <div className="align-center mt-5">
          <button
            onClick={() => props.history.push("/checkin")}
            className="btn btn-danger"
          >
            Back to Checkin
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackerResponse;
