import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Button from "components/common/Button";
import { addStudent, editUser } from "../../../redux/actions";

const TeacherProfileDialog = props => {
  const dispatch = useDispatch();
  const { isEditMode, activeUser } = props;
  const { addNewStudentLoading } = useSelector(({ user }) => user);
  const { userDetails } = useSelector(({ auth }) => auth);

  const defaultValues = {
    add_sub_level_id: "",
    auto_timeout_for_question: "",
    first_name: "",
    last_name: "",
    max_retry_count_to_attempt_question: "",
    mul_div_level_id: "",
    password: "",
    user_name: ""
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues
  });

  useEffect(() => {
    setValue("add_sub_level_id", userDetails.add_sub_level_id);
    setValue("auto_timeout_for_question", userDetails.auto_timeout_for_question);
    setValue("first_name", userDetails.first_name);
    setValue("last_name", userDetails.last_name);
  }, []); // eslint-disable-line
  //Set Value for Edit Student

  const handleCloseStudentDailog = () => {
    props.closeProfileDailog();
  };

  const handleSuccess = () => {
    props.closeProfileDailog();
  };

  const handleSubmitLoginForm = data => {
    // if (loginLoading) return;
    const {
      add_sub_level_id,
      auto_timeout_for_question,
      first_name,
      last_name,
      max_retry_count_to_attempt_question,
      mul_div_level_id,
      password,
      user_name
    } = data;

    if (isEditMode) {
      const body = {
        add_sub_level_id,
        auto_timeout_for_question,
        first_name,
        last_name,
        max_retry_count_to_attempt_question,
        mul_div_level_id,
        user_name,
        student_learning_mode_id: 1,
        class_code: "73491",
        password: "12345678"
      };
      const updatedUser = Object.assign(activeUser, {
        add_sub_level_id,
        auto_timeout_for_question,
        first_name,
        last_name,
        max_retry_count_to_attempt_question,
        mul_div_level_id,
        user_name,
        student_learning_mode_id: 1,
        class_code: "73491",
        password: "12345678"
      });
      dispatch(editUser(updatedUser, body, handleSuccess));
    } else {
      const body = {
        add_sub_level_id,
        auto_timeout_for_question,
        first_name,
        last_name,
        max_retry_count_to_attempt_question,
        mul_div_level_id,
        password,
        user_name,
        student_learning_mode_id: 1,
        class_code: "73491",
        max_timeout_correct_ans_secs: "1"
      };
      dispatch(addStudent(body, handleSuccess));
    }
  };

  const loading = addNewStudentLoading;

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <form className="popup" onSubmit={handleSubmit(handleSubmitLoginForm)}>
            <div className="popup-header">
              <h2 className="popup-title">Teacher</h2>
              <span className="close" onClick={() => handleCloseStudentDailog()}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <div className="form-group">
                <div className="form-input">
                  <label className="input-label" htmlFor="lname">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    className="form-control"
                    placeholder="Last Name"
                    name="last_name"
                    ref={register({
                      required: true
                    })}
                  />
                </div>
                <div className="form-input">
                  <label className="input-label" htmlFor="fname">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    className="form-control"
                    placeholder="First Name"
                    name="first_name"
                    ref={register({
                      required: true
                    })}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-input">
                  <label className="input-label" htmlFor="user_name">
                    Username
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    className="form-control"
                    placeholder="Username"
                    name="user_name"
                    ref={register({
                      required: true
                    })}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-input">
                  <label className="input-label" htmlFor="femail">
                    Email
                  </label>
                  <input type="email" id="femail" className="form-control" placeholder="Email ID" />
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-gray"
                    name={"Cancel"}
                    disabled={loading}
                    onClick={() => handleCloseStudentDailog()}
                  ></Button>
                </div>

                <div className="button-cols">
                  <Button type="submit" className="btn btn-secondary" name={"Save"} disabled={loading}></Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
};

export default TeacherProfileDialog;
