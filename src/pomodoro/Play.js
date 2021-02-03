import React from "react";
import classNames from "../utils/class-names";
import { PropTypes } from "prop-types";

function Play({ isTimerRunning, playPause, resetSession, inSession }) {
  const handleReset = () => {
    if (inSession) resetSession();
  };
  return (
    <div>
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !isTimerRunning,
                "oi-media-pause": isTimerRunning,
              })}
            />
            Play
          </button>
          {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
          <button
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={handleReset}
          >
            <span className="oi oi-media-stop" />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

Play.propTypes = {
  isTimerRunning: PropTypes.bool,
  playPause: PropTypes.func,
  resetSession: PropTypes.func,
  inSession: PropTypes.bool,
};
export default Play;