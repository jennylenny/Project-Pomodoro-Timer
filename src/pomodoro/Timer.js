import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import { PropTypes } from "prop-types";

function Timer({
  focusTime,
  remainingTime,
  isTimerRunning,
  inSession,
  currentSession,
  breakTime,
}) {
  const paused = isTimerRunning ? "" : "PAUSED";
  const time = currentSession === "On Break" ? breakTime : focusTime;
  const percent = ((time * 60 - remainingTime) / (time * 60)) * 100;

  if (inSession) {
    return (
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              {currentSession} for {minutesToDuration(time)} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(remainingTime)} remaining
            </p>
          </div>
        </div>
        <h2>{paused}</h2>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percent} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${percent}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

Timer.propTypes = {
  focusTime: PropTypes.number,
  remainingTime: PropTypes.number,
  isTimerRunning: PropTypes.bool,
  currentSession: PropTypes.string,
  breakTime: PropTypes.number,
  inSession: PropTypes.bool,
};

export default Timer;