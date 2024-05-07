import React from "react";

function AreaModels(props) {
  //practice question test page

  const { first_factor, second_factor } = props;
  let renderArray = [];

  (function () {
    let i = 0;
    while (i < first_factor * second_factor) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();

  function renderNodeOfFirstFactor(number) {
    let node = null;

    node = <div className="grid-item" key={number}></div>;

    return node;
  }

  const isSameFactor = first_factor === second_factor;

  return (
    <div className="area-models-main-outer-wrapper">
      <div className="grid-wrapper" style={{ marginRight: !isSameFactor ? "300px" : "0px" }}>
        <div
          //classname based on second factor because as per second factor widht will be decided
          className={`grid-container-contain-${second_factor}`}
        >
          {renderArray.map(number => renderNodeOfFirstFactor(number + 1))}
        </div>
        <div className={first_factor === 1 ? "answer-text-sm" : "answer-text"}>?</div>
        <div className="first-factor">{first_factor}</div>
        <div className="second-factor">{second_factor}</div>
      </div>

      {!isSameFactor && (
        <div className="grid-wrapper">
          <div
            //classname based on second factor because as per first factor widht will be decided
            className={`grid-container-contain-${first_factor}`}
          >
            {renderArray.map(number => renderNodeOfFirstFactor(number + 1))}
          </div>

          <div className={second_factor === 1 ? "answer-text-sm" : "answer-text"}>?</div>
          <div className="first-factor">{second_factor}</div>
          <div className="second-factor">{first_factor}</div>
        </div>
      )}
    </div>
  );
}

export default AreaModels;
