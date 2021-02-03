  
import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Duration from "./Duration";
import Play from "./Play";
import Timer from "./Timer";

function Pomodoro() {
  const initialState = {
    Focus: 25,
    Break: 5,
    remaining: 1500,
    running: false,
    inSession: false,
    currentSession: "Focusing",
  };
  // Timer starts out paused
  const [session, setSession] = useState(initialState);

  const handleDurationChange = (type, change) => {
    setSession((currentSession) => ({
      ...currentSession,
      [type]: session[type] + change,
    }));
    if (type === "Focus") {
      setSession((currentSession) => ({
        ...currentSession,
        remaining: currentSession.Focus * 60,
      }));
    }
  };

  const resetSession = () => {
    setSession(initialState);
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setSession((oldSession) => {
        return { ...oldSession, remaining: oldSession.remaining - 1 };
      });
      if (session.remaining <= 0) {
        new Audio(
          `${process.env.PUBLIC_URL}/alarm/Creepy-clock-chiming.mp3`
        ).play();

        setSession((oldSession) => {
          if (oldSession.currentSession === "Focusing") {
            return {
              ...oldSession,
              currentSession: "On Break",
              remaining: session.Break * 60,
            };
          } else {
            return {
              ...oldSession,
              currentSession: "Focusing",
              remaining: session.Focus * 60,
            };
          }
        });
      }
    },
    session.running ? 1000 : null
  );

  function playPause() {
    setSession({ ...session, running: !session.running, inSession: true });
  }

  return (
    
      <div className="pomodoro">
        <div className="row">
          <div className="col">
            <Duration
              type="Focus"
              time={session.Focus}
              setTime={handleDurationChange}
              high={60}
              low={5}
              inSession={session.inSession}
              increment={5}
            />
          </div>
          <div className="col">
            <div className="float-right">
              <Duration
                type="Break"
                time={session.Break}
                setTime={handleDurationChange}
                high={15}
                low={1}
                inSession={session.inSession}
                increment={1}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <Play
            isTimerRunning={session.running}
            playPause={playPause}
            resetSession={resetSession}
            inSession={session.inSession}
          />
        </div>
        <Timer
          focusTime={session.Focus}
          breakTime={session.Break}
          remainingTime={session.remaining}
          isTimerRunning={session.running}
          inSession={session.inSession}
          currentSession={session.currentSession}
        />
      </div>
    
  );
}

export default Pomodoro;