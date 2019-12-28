import React from "react";

export default function CompletedOption({ options, correctOption }) {
  return (
    <div className="row pl-3">
      {options.map(item => (
        <div key={item}>
            {item === correctOption ? (
                <button
                className="button-success mr-3">
                    {item}
                </button>
            ) : (
                <button
                className="button-primary mr-3">
                    {item}
                </button>
            )}
        </div>
      ))}
    </div>
  );
}
