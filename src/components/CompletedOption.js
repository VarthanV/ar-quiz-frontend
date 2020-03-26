import React from "react";

export default function CompletedOption({ options, correctOption }) {
  return (
    <div className="row pl-3">
      {options.map(item => (
        <div key={item}>
            {item === correctOption ? (
                <button
                disabled
                className="btn btn-success mr-3">
                    {item}
                </button>
            ) : (
                <button
                disabled
                className="btn btn-secondary mr-3">
                    {item}
                </button>
            )}
        </div>
      ))}
    </div>
  );
}
