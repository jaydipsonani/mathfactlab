import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Switch, Divider } from "antd";
import Button from "components/common/Button";
import {
  getAllStrategyList
  // removeMultipleUser,
} from "../../../redux/actions/practiceAction";
import { editStudent } from "../../../redux/actions";
import { MATH_OPERATION, strategyDetailBySlug } from "config/const";

const StrategyDialog = props => {
  const { user } = props;

  const dispatch = useDispatch();

  const handleCloseDailog = () => {
    props.close();
  };

  const { allStrategyList, fetchingAllStrategyListLoading } = useSelector(({ strategy }) => strategy);

  // const { userDetails } = useSelector(({ auth }) => auth);

  const [disabledStrategyList, setDisabledStrategyList] = useState(user.profile.disable_strategies_slug || []);

  useEffect(() => {
    dispatch(getAllStrategyList());
  }, []); // eslint-disable-line

  const handleResetStudentLevel = () => {
    const body = {
      disable_strategies_slug: disabledStrategyList
    };

    const updatedUser = Object.assign(user, {
      disable_strategies_slug: disabledStrategyList
    });

    dispatch(editStudent(updatedUser, body));
    props.close();
  };
  const handleToggleSwitch = strategy_slug => {
    setDisabledStrategyList([]);

    if (disabledStrategyList && disabledStrategyList.includes(strategy_slug)) {
      const upDisabledStrategyList = disabledStrategyList.filter(slug => !slug.includes(strategy_slug));
      setDisabledStrategyList([...upDisabledStrategyList]);
    } else {
      let addedDisableStrategyList = [...disabledStrategyList];
      addedDisableStrategyList.push(strategy_slug);

      // Exceptional case tens-on-a-place-value-chart
      if (strategy_slug === strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].slug) {
        addedDisableStrategyList.push("tens-on-a-place-value-chart-non-visible");
      }

      setDisabledStrategyList([...addedDisableStrategyList]);
    }
  };
  const additionStrategyList = allStrategyList.filter(strategy => +strategy.math_operation === MATH_OPERATION.ADDITION);
  const subtractionStrategyList = allStrategyList.filter(
    strategy => +strategy.math_operation === MATH_OPERATION.SUBTRACTION
  );

  const multiplicationStrategyList = allStrategyList.filter(
    strategy => +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
  );

  const divisionStrategyList = allStrategyList.filter(strategy => +strategy.math_operation === MATH_OPERATION.DIVISION);
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Strategies</h3>
              <span className="close" onClick={() => handleCloseDailog()}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              {fetchingAllStrategyListLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20vh",
                    width: "100%"
                  }}
                >
                  <div className="lds-dual-ring"></div>
                </div>
              ) : (
                <div style={{ padding: "0px 15px" }}>
                  <h4 className="popup-sub-title">
                    Addition <i className="icon-addition-subtraction " aria-hidden="true" />
                  </h4>

                  {additionStrategyList &&
                    additionStrategyList.map(strategy => {
                      return (
                        <Tag key={strategy.id} className="mb-10">
                          {strategy.name} {strategy.suffix}
                          <Switch
                            className="ml-5"
                            onChange={() => handleToggleSwitch(strategy.slug)}
                            checked={disabledStrategyList && disabledStrategyList.includes(strategy.slug)}
                          />
                        </Tag>
                      );
                    })}
                  <Divider style={{ margin: "6px 0px" }} />

                  <h4 className="popup-sub-title">
                    Subtraction <i className="icon-addition-subtraction " aria-hidden="true" />
                  </h4>

                  {subtractionStrategyList &&
                    subtractionStrategyList.map(strategy => {
                      return (
                        <Tag key={strategy.id} className="mb-10">
                          {strategy.name} {strategy.suffix}
                          <Switch
                            className="ml-5"
                            onChange={() => handleToggleSwitch(strategy.slug)}
                            checked={disabledStrategyList && disabledStrategyList.includes(strategy.slug)}
                          />
                        </Tag>
                      );
                    })}
                  <Divider style={{ margin: "6px 0px" }} />
                  <h4 className="popup-sub-title">
                    Multiplication <i className="icon-multiplication-division mr-5" aria-hidden="true" />
                  </h4>
                  <div>
                    {multiplicationStrategyList &&
                      multiplicationStrategyList.map(strategy => {
                        return (
                          <Tag key={strategy.id} className="mb-10">
                            {strategy.name} {strategy.suffix}
                            <Switch
                              className="ml-5"
                              onChange={() => handleToggleSwitch(strategy.slug)}
                              checked={disabledStrategyList && disabledStrategyList.includes(strategy.slug)}
                            />
                          </Tag>
                        );
                      })}
                  </div>
                  <Divider style={{ margin: "6px 0px" }} />
                  <h4 className="popup-sub-title">
                    Division <i className="icon-multiplication-division" aria-hidden="true" />
                  </h4>

                  {divisionStrategyList &&
                    divisionStrategyList.map(strategy => {
                      return (
                        <Tag key={strategy.id} className="mb-10">
                          {strategy.name} {strategy.suffix}
                          <Switch
                            className="ml-5"
                            onChange={() => handleToggleSwitch(strategy.slug)}
                            checked={disabledStrategyList && disabledStrategyList.includes(strategy.slug)}
                          />
                        </Tag>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button className="btn btn-gray" name={"No, cancel"} onClick={() => handleCloseDailog()}></Button>
                </div>
                <div className="button-cols">
                  <Button
                    className="btn btn-secondary"
                    name={" Yes, Save"}
                    onClick={() => handleResetStudentLevel()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
};

export default StrategyDialog;
