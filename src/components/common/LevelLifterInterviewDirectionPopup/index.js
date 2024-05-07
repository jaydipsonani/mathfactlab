import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { Modal, Checkbox } from "antd";
import { updateTeacher } from "../../../redux/actions";

const LevelLifterInterviewDirectionPopup = props => {
  const { open } = props;

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [bounds, setBounds] = useState({});
  const [disabled, setDisabled] = useState(true);

  const draggleRef = React.createRef();

  const [isEnabledDoNotShowWelcomeBanner, setIsEnabledDoNotShowWelcomeBanner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(open);
    }, 300);
  }, [open]);

  const handleChangeCheckbox = e => {
    setIsEnabledDoNotShowWelcomeBanner(!isEnabledDoNotShowWelcomeBanner);
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };

  const handleCloseStudentDialog = () => {
    props.close();

    if (isEnabledDoNotShowWelcomeBanner) {
      const body = {
        profile: {
          // "email": "albtiros.1@gmail.com",
          // "first_name": "albtrios.1",
          // "last_name": "teacher",
          is_disabled_interview_banner: 1
        }
      };
      dispatch(updateTeacher(body));
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => handleCloseStudentDialog()}
        footer={null}
        closable={false}
        modalRender={modal => (
          <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div
          style={{
            width: "100%",
            cursor: "move"
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          <p>
            <span className="close" onClick={() => handleCloseStudentDialog()}>
              <i className="icon-close" aria-hidden="true"></i>
            </span>
          </p>
          <p>
            Teachers, hit the <strong>spacebar</strong> or <strong>Enter</strong> for each correct-and-fluent response
            from your student.
          </p>
          <p>
            Hit <strong>any letter key</strong> for responses that are incorrect or ones that you do not consider
            fluent.
          </p>
          <p>
            <Checkbox onChange={handleChangeCheckbox}>Do not show this message again.</Checkbox>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default LevelLifterInterviewDirectionPopup;
