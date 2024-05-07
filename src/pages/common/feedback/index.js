import React from "react";
import { Typography, Button ,Row, Col} from "antd";
import Section from "components/common/Section";
import Container from "components/common/Container";
import ErrorBoundary from "components/common/ErrorBoundary";
import "assets/sass/components/feedback.scss";

const { Title } = Typography;

function FeedbackPage(props) {
  // const { register, watch, errors, handleSubmit, reset } = useForm({
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  // });

  // const handelFeedbackForm = async data => {
  //   const body = {
  //     user_name: data.first_name,
  //     email: data.temail,
  //     message: data.message,
  //   };

  //   await axios
  //     .post(`/contact-support`, body)
  //     .then(res => {
  //       antdMessage.success("Message has been sent.");
  //     })
  //     .catch(error => {
  //       antdMessage.error(error.message);
  //     });
  //   reset();
  // };

  return (
    <>
      <ErrorBoundary>
        <Container fluid>
          <Row gutter={30}>
            {/* <Col lg={14} xs={24} style={{ marginBottom: "30px" }}>
              <Container fluid>
                <Section
                  title={
                    <>
                      <Title level={4} className={"tab-heading"}>
                        Feedback
                      </Title>
                    </>
                  }
                >
                  <h6 className="page-title">
                    <strong>Got a question, problem or suggestion?</strong>
                  </h6>
                  <h6 className="page-title">
                    <strong>
                      Want to arrange a free MathFactLab training for you, your
                      staff and/or colleagues?
                    </strong>
                  </h6>
                  <p className="page-sub-title">
                    Please fill out the form below. We look forward to hearing
                    from you.
                  </p>

                  <form
                    className="feedback-profile-wrapper"
                    id="feedback-form"
                    onSubmit={handleSubmit(handelFeedbackForm)}
                  >
                    <div className="form-content">
                      <Row gutter={30}>
                        <Col lg={12} xs={12}>
                          <div className="form-group">
                            <div
                              className={
                                errors.first_name &&
                                errors.first_name.type === "required"
                                  ? "form-input input-error"
                                  : "form-input "
                              }
                            >
                              <label className="input-label" htmlFor="fname">
                                Your name
                              </label>
                              <input
                                type="text"
                                id="fname"
                                className={
                                  watch("first_name") && errors.first_name
                                    ? "form-control"
                                    : "form-control input-error"
                                }
                                placeholder="Enter your user name"
                                name="first_name"
                                ref={register({
                                  required: true,
                                })}
                              />
                              {errors.first_name &&
                                errors.first_name.type === "required" && (
                                  <span className="error">
                                    Please enter first name.
                                  </span>
                                )}
                            </div>
                          </div>
                        </Col>
                        <Col lg={12} xs={12}>
                          <div className="form-group">
                            <div
                              className={
                                (errors.temail &&
                                  errors.temail.type === "required") ||
                                (errors.temail &&
                                  errors.temail.type === "pattern")
                                  ? "form-input input-error"
                                  : "form-input "
                              }
                            >
                              <label className="input-label" htmlFor="temail">
                                Your Email
                              </label>
                              <input
                                type="text"
                                id="temail"
                                className={
                                  watch("temail") && errors.temail
                                    ? "form-control"
                                    : "form-control input-error"
                                }
                                placeholder="Enter your email"
                                name="temail"
                                ref={register({
                                  required: true,
                                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                })}
                              />
                              {errors.temail &&
                                errors.temail.type === "required" && (
                                  <span className="error">
                                    Please enter email.
                                  </span>
                                )}
                              {errors.temail &&
                                errors.temail.type === "pattern" && (
                                  <span className="error">
                                    Please enter valid email.
                                  </span>
                                )}
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <div className="form-group">
                        <div
                          className={
                            errors.message && errors.message.type === "required"
                              ? "form-input input-error"
                              : "form-input "
                          }
                        >
                          <label className="input-label" htmlFor="message">
                            Message
                          </label>
                          <textarea
                            type="text"
                            id="message"
                            className={
                              watch("message") && errors.message
                                ? "form-control"
                                : "form-control input-error"
                            }
                            placeholder="Enter your message"
                            name="message"
                            ref={register({
                              required: true,
                            })}
                          />
                          {errors.message &&
                            errors.message.type === "required" && (
                              <span className="error">
                                Please enter message.
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="primary"
                      htmlType="submit"
                      form="feedback-form"
                      className="send-btn"
                    >
                      Send
                    </Button>
                  </form>
                </Section>
              </Container>
            </Col> */}

            <Col lg={10} xs={24} style={{ marginBottom: "30px" }}>
              <Section
                title={
                  <>
                    <Title level={4} className={"tab-heading"}>
                      Contact Us
                    </Title>
                  </>
                }
              >
                <div className="mfl-emailer">
                  <a href="mailto:contact@mathfactlab.com" title="MathFactLab mail">
                    <Button className="button-secondary link">
                      <i className="icon-envelope" aria-hidden="true"></i>
                      contact@mathfactlab.com
                    </Button>
                  </a>
                </div>
              </Section>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    </>
  );
}

export default FeedbackPage;
