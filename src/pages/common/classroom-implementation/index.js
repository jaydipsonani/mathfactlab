import React, { useEffect, useState } from "react";
import { Collapse, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Section from "components/common/Section";
import Container from "components/common/Container";
import "assets/sass/components/classroom-accordion.scss";

const { Title } = Typography;
const { Panel } = Collapse;
function TeacherClassroomImplementationPage(props) {
  // const [activeAnswer, setActiveAnswer] = useState("");

  // const handleShowAnswer = activeAnswerId => {
  //   if (activeAnswer === activeAnswerId) {
  //     setActiveAnswer("");
  //   } else {
  //     setActiveAnswer(activeAnswerId);
  //   }
  // };
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState();
  const [selectedListIndex, setSelectedListIndex] = useState();
  const [listIndex, setListIndex] = useState([]);

  const handleParaClick = (index, ...defaultListIndex) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? 0 : index);
    setListIndex(defaultListIndex);
  };

  const handleListClick = key => {
    const index = listIndex.indexOf(key);
    listIndex.includes(key) ? listIndex.splice(index, 1) : listIndex.push(key);
    setListIndex([...listIndex]);
  };

  useEffect(() => {
    setSelectedQuestionIndex(1);
  }, []);

  return (
    <>
      <Container fluid>
        <Section
          title={
            <>
              <Title level={4} className={"tab-heading"}>
                Key Principles for Successfully Implementing MathFactLab
              </Title>
            </>
          }
        >
          {/* <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            className="site-collapse-custom-collapse"
            accordion
          >
            {data.map((panel, index) => {
              const { title, description } = panel;
              return (
                <Panel
                  header={title}
                  key={index}
                  className="site-collapse-custom-panel"
                >
                  {description}
                </Panel>
              );
            })}
          </Collapse> */}
          <div className="accordions-wrapper">
            <Collapse
              bordered={false}
              defaultActiveKey={["0"]}
              className="site-collapse-custom-collapse"
              accordion
              onChange={() => handleParaClick(2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)}
            >
              <Panel
                header={`MathFactLab is a strategy-based math fact program, helping
                children to build number sense as they develop a deep
                understanding of the basic math facts.`}
                className="site-collapse-custom-panel"
              >
                <div>
                  <p className="bullet-item">
                    Students practice the basic math facts with a multitude of models: number lines, ten frames,
                    rekenreks, bar diagrams, dice, dominoes, dots, area models and arrays of objects.
                  </p>
                  <p className="bullet-item">
                    Through repeated application of a variety of strategies, students develop fluency and (in most
                    cases) automaticity with all the basic math facts.
                  </p>
                  <p className="bullet-item">
                    In addition, for example, students learn the 'Sums of 10' facts by completing tens frames, by
                    estimation using double-bar diagrams, and by discovering the variety of sums of ten on a rekenrek.
                  </p>
                  <p className="bullet-item">
                    In multiplication, for example, students learn the x5 facts by dividing the x10 facts in half, by
                    using their knowledge of clocks, by making jumps of five on a number line, and by pairing fives to
                    make tens.
                  </p>
                </div>
              </Panel>

              <Panel
                header={`MathFactLab is a supplement to good initial first instruction in
                the classroom.`}
                className="site-collapse-custom-panel"
              >
                <div className={`accordion-answer ${selectedQuestionIndex === 2 ? "active" : ""}`}>
                  <p className="bullet-item" onClick={() => handleListClick(1)}>
                    According to Baroody (2006), there are three stages of development in math fact acquisition:
                  </p>

                  <div className={`list-show ${listIndex.includes(1) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Phase 1: Counting strategies [and constructing meaning]</li>
                        <li className="bullet-list-item">
                          Phase 2: Reasoning strategies - using known information (e.g., known facts and relationships)
                          to logically determine (deduce) the answer of an unknown combination
                        </li>
                        <li className="bullet-list-item">
                          Phase 3: Mastery - efficient (fast and accurate) production of answers
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item" onClick={() => handleListClick(2)}>
                    Phase 1 is what happens in good classrooms: providing students with an understanding of numbers,
                    operations, and a means of solving the basic math facts.
                  </p>

                  <div className={`list-show ${listIndex.includes(2) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          It is expected that students have completed Phase I before beginning MathFactlab.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item">
                    Unlike most math fact websites, MathFactLab, with its multiple-model approach, is a powerful tool
                    for Phase 2’s development of reasoning strategies.
                  </p>
                  <p className="bullet-item">
                    With sufficient practice using a broad variety of strategies, our students develop the mastery of
                    Phase 3 without need for memorization.
                  </p>
                </div>
              </Panel>

              <Panel
                header={`Short frequent practice with MathFactLab is best.`}
                className="site-collapse-custom-panel"
              >
                <div className={`accordion-answer ${selectedQuestionIndex === 3 ? "active" : ""}`}>
                  <p className="bullet-item" onClick={() => handleListClick(3)}>
                    MathFactLab student sessions are from 5 to 20 minutes long. The default is 12.5 minutes.
                  </p>
                  <div className={`list-show ${listIndex.includes(3) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          Teachers can determine the length of student sessions in the teacher dashboard.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item" onClick={() => handleListClick(4)}>
                    For greatest success, we recommend that students complete at least three sessions per week.
                  </p>
                  <div className={`list-show ${listIndex.includes(4) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          While multiple sessions can be completed in a single day, distributed (or spaced) practice has
                          been shown to be a more effective method of learning.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel
                header={`Students using MathFactLab progress through a series of stages,
                each broken into multiple levels.`}
                className="site-collapse-custom-panel"
              >
                <div className={`accordion-answer ${selectedQuestionIndex === 4 ? "active" : ""}`}>
                  <p className="bullet-item">
                    The many small steps that the program is divided into allows for ample opportunity for students to
                    recognize their growth and to feel proud of it.
                  </p>

                  <p className="bullet-item">
                    Although MathFactLab goes well beyond the basics, only the basic facts are essential for your
                    students to master.
                  </p>

                  <p className="bullet-item" onClick={() => handleListClick(5)}>
                    While certainly worthwhile, consider the advanced stages to be enrichment, not essential.
                  </p>

                  <div className={`list-show ${listIndex.includes(5) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          The advanced stages enhance mental math skills while providing a means for all students - not
                          just those working on the basic facts - to be engaged in math fact study.
                        </li>
                        <li className="bullet-list-item">
                          Note: Students should have mastery of the advanced +/- stages before tackling the advanced x/÷
                          stages
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p
                    className="bullet-item-without-bullet"
                    onClick={() => setSelectedListIndex(selectedListIndex === 8 ? 0 : 8)}
                  >
                    <RightOutlined className={`accordion-icon-sub ${selectedListIndex === 8 ? "active" : ""}`} />
                    The addition/subtraction program consists of 17 levels, broken into 4 stages:
                  </p>

                  <div className={`list-show ${selectedListIndex === 8 ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Basic Facts Part 1 (Levels A - F)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level A: +1</li>
                        <li className="bullet-item-inner">Level B: +2 </li>
                        <li className="bullet-item-inner">Level C: +0 </li>
                        <li className="bullet-item-inner">Level D: Doubles</li>
                        <li className="bullet-item-inner">Level E: +3 or +4</li>
                        <li className="bullet-item-inner">Level F: +10</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Basic Facts Part 2 (Levels G - K)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level G: Near doubles</li>
                        <li className="bullet-item-inner">Level H: +9</li>
                        <li className="bullet-item-inner">Level J: +8</li>
                        <li className="bullet-item-inner">Level K: +7</li>
                      </ul>

                      <ul className="bullet-list">
                        <li className="bullet-list-item">Advanced Facts (Levels L - M)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level L: +11 to 20</li>
                        <li className="bullet-item-inner">Level M: +21 to 90</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Super-Advanced Facts (Levels N - R)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level N: 2-digit + multiple of 10 (sums less than 100)</li>
                        <li className="bullet-item-inner">Level O: 2-digit + 2-digit (sums less than 100)</li>
                        <li className="bullet-item-inner">
                          Level P: 2-digit + 2-digit ending in 9 (sums less than 100)
                        </li>
                        <li className="bullet-item-inner">Level Q: 2-digit + multiple of 10 (sums greater than 100)</li>
                        <li className="bullet-item-inner">Level R: 2-digit + 2-digit (sums greater than 100)</li>
                      </ul>
                    </div>
                  </div>

                  <p
                    className="bullet-item-without-bullet"
                    onClick={() => setSelectedListIndex(selectedListIndex === 9 ? 0 : 9)}
                  >
                    <RightOutlined className={`accordion-icon-sub ${selectedListIndex === 9 ? "active" : ""}`} />
                    The multiplication/division program consists of 25 levels, broken into 4 stages:
                  </p>

                  <div className={`list-show ${selectedListIndex === 9 ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Basic Facts Part 1 (Levels A - E)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level A: x2</li>
                        <li className="bullet-item-inner">Level B: x10</li>
                        <li className="bullet-item-inner">Level C: x5</li>{" "}
                        <li className="bullet-item-inner">Level D: x1</li>
                        <li className="bullet-item-inner">Level E: x0</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Basic Facts Part 2 (Levels F - L)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level F: x4</li>
                        <li className="bullet-item-inner">Level G: x3</li>
                        <li className="bullet-item-inner">Level H: x6</li>{" "}
                        <li className="bullet-item-inner">
                          Level J: x9 <br></br>
                          <i className="note-text">
                            Note: While students are introduced to a new nine fact at each level (for example, 4 x 9 at
                            Level F), mastery of most nine facts is not expected until this level.
                          </i>
                        </li>
                        <li className="bullet-item-inner">Level K: x8</li>
                        <li className="bullet-item-inner">Level L: x7</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Advanced Facts (Levels M - N)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level M: x11</li>
                        <li className="bullet-item-inner">Level N: x12</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Super-Advanced Facts (Levels O - T)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level O: x11 (advanced)</li>
                        <li className="bullet-item-inner">Level P: x12 (advanced)</li>
                        <li className="bullet-item-inner">Level Q: x50</li>
                        <li className="bullet-item-inner">Level R: x15</li>
                        <li className="bullet-item-inner">Level S: x25</li>
                        <li className="bullet-item-inner">Level T: x20</li>
                      </ul>
                      <ul className="bullet-list">
                        <li className="bullet-list-item">Super-Duper-Advanced Facts (Levels U - Z)</li>
                      </ul>
                      <ul className="bullet">
                        <li className="bullet-item-inner">Level U: x19</li>
                        <li className="bullet-item-inner">Level V: x18</li>
                        <li className="bullet-item-inner">Level W: x14</li>
                        <li className="bullet-item-inner">Level X: x16</li>
                        <li className="bullet-item-inner">Level Y: x13</li>
                        <li className="bullet-item-inner">Level Z: x17</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel
                header={`Students are given a brief placement assessment upon first
                logging in to MathFactLab.`}
                className="site-collapse-custom-panel"
              >
                <div className={`accordion-answer ${selectedQuestionIndex === 5 ? "active" : ""}`}>
                  <p className="bullet-item" onClick={() => handleListClick(6)}>
                    This assessment mirrors the levels of the programs, first starting with questions from Level A and
                    progressing level-by-level towards the final level.
                  </p>

                  <div className={`list-show ${listIndex.includes(6) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          Depending on their assigned learning mode, students begin with either addition or
                          multiplication.
                        </li>
                        <li className="bullet-list-item">
                          After the student has responded inaccurately and/or non-fluently five times, that operation’s
                          assessment ends.
                        </li>
                        <li className="bullet-list-item">
                          The student then begins the 2nd operation’s assessment (either subtraction or division), which
                          will also end after the fifth inaccurate and/or non-fluent response
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item" onClick={() => handleListClick(7)}>
                    Before beginning the placement assessment, students are asked to type in a variety of two-digit
                    numbers. The average response time can help teachers best determine an appropriate required fluency
                    rate for each student.
                  </p>

                  <div className={`list-show ${listIndex.includes(7) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          Students who have slower than typical response times may need to be assigned a slower required
                          fluency rate.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item" onClick={() => handleListClick(8)}>
                    We know that students make typos or, at times, respond incorrectly to facts that they may know well.
                  </p>

                  <div className={`list-show ${listIndex.includes(8) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          With this in mind, at each level in the placement assessment, students are given a second try
                          for up to two incorrect or slow responses.
                        </li>
                        <li className="bullet-list-item">
                          This helps us make sure that students are being accurately placed within the program.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item">
                    Students are assigned to begin MathFactLab at the level where they have made their third inaccurate
                    and/or non-fluent response.
                  </p>

                  <p className="bullet-item" onClick={() => handleListClick(9)}>
                    {" "}
                    We know that If a teacher feels a student’s results on a placement assessment is not reflective of
                    the student’s ability, the teacher has two choices.
                  </p>

                  <div className={`list-show ${listIndex.includes(9) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          One, the student can be given the opportunity to take the placement assessment again. (The
                          teacher selects ‘Reassess’ under ‘Actions’ on the student’s row in the teacher dashboard.)
                        </li>
                        <li className="bullet-list-item">
                          Two, the teacher can place the student in the program at the level determined most appropriate
                          by the teacher. (Select ‘Edit’ on the student’s row in the teacher dashboard.)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel header={`Growth is its own best reward.`} className="site-collapse-custom-panel">
                <div className={`accordion-answer ${selectedQuestionIndex === 6 ? "active" : ""}`}>
                  <p className="bullet-item">
                    MathFactLab is not game-based, nor are there reward tokens,games, etc. Instead, we find that our
                    students are generally intrinsically motivated by the growth that they see in their own performance
                    as they move through the levels of the program.
                  </p>
                  <p className="bullet-item">
                    You will find that making progress in the program is a source of pride for your students, especially
                    for those who have struggled with math facts in the past.
                  </p>
                  <p className="bullet-item">
                    Implementing small celebrations in your classroom, like clapping for those each day who move up a
                    level, can add to student pride in their successes.
                  </p>
                </div>
              </Panel>
              <Panel header={`Not all students process at the same speed.`} className="site-collapse-custom-panel">
                <div className={`accordion-answer ${selectedQuestionIndex === 7 ? "active" : ""}`}>
                  <p className="bullet-item">
                    By default, MathFactLab students are expected to respond accurately to a given prompt in under four
                    seconds, but you will find that this pace is unrealistic for some students.
                  </p>

                  <p className="bullet-item">
                    Teachers are able to change the required response time in the teacher console. This can be set from
                    2 up to 120 seconds.
                  </p>

                  <p className="bullet-item">
                    A longer response time will be helpful for a good percentage of special education students.
                  </p>

                  <p className="bullet-item" onClick={() => handleListClick(10)}>
                    Some general education students may also need a longer response time.
                  </p>

                  <div className={`list-show ${listIndex.includes(10) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          While typically teachers may choose a slower pace for those with a learning disability in
                          math, keep in mind that you may also have general education students working at grade level or
                          above who - because of their processing speed - simply are not capable of responding
                          consistently in less than four seconds.
                        </li>
                        <li className="bullet-list-item">
                          To keep MathFactLab a positive, pleasant experience, adjust the required fluency rate for
                          students who need it to one that is appropriately challenging while also achievable.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="bullet-item" onClick={() => handleListClick(11)}>
                    For students working on addition/subtraction - in order to break dependencies on counting fingers -
                    it is important that their required response time be no longer than necessary.
                  </p>

                  <div className={`list-show ${listIndex.includes(11) ? "activeList" : ""}`}>
                    <div className="list-wrapper">
                      <ul className="bullet-list">
                        <li className="bullet-list-item">
                          This time restraint will help to encourage the student to use more efficient strategies.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
            {/* <div
              className={`accordions-item ${
                selectedQuestionIndex === 1 ? "active" : ""
              }`}
            >
              <p className="accordion-link" onClick={() => handleParaClick(1)}>
                <RightOutlined className="accordion-icon" />
                MathFactLab is a strategy-based math fact program, helping
                children to build number sense as they develop a deep
                understanding of the basic math facts.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 1 ? "active" : ""
                }`}
              >
                <p className="bullet-item">
                  Students practice the basic math facts with a multitude of
                  models: number lines, ten frames, rekenreks, bar diagrams,
                  dice, dominoes, dots, area models and arrays of objects.
                </p>
                <p className="bullet-item">
                  Through repeated application of a variety of strategies,
                  students develop fluency and (in most cases) automaticity with
                  all the basic math facts.
                </p>
                <p className="bullet-item">
                  In addition, for example, students learn the 'Sums of 10'
                  facts by completing tens frames, by estimation using
                  double-bar diagrams, and by discovering the variety of sums of
                  ten on a rekenrek.
                </p>
                <p className="bullet-item">
                  In multiplication, for example, students learn the x5 facts by
                  dividing the x10 facts in half, by using their knowledge of
                  clocks, by making jumps of five on a number line, and by
                  pairing fives to make tens.
                </p>
              </div>
            </div> */}

            {/* <div
              className={`accordions-item ${
                selectedQuestionIndex === 2 ? "active" : ""
              }`}
            >
              <p
                className="accordion-link"
                onClick={() => handleParaClick(2, 1, 2)}
              >
                <RightOutlined className="accordion-icon" />
                MathFactLab is a supplement to good initial first instruction in
                the classroom.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 2 ? "active" : ""
                }`}
              >
                <p className="bullet-item" onClick={() => handleListClick(1)}>
                  According to Baroody (2006), there are three stages of
                  development in math fact acquisition:
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(1) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Phase 1: Counting strategies [and constructing meaning]
                      </li>
                      <li className="bullet-list-item">
                        Phase 2: Reasoning strategies - using known information
                        (e.g., known facts and relationships) to logically
                        determine (deduce) the answer of an unknown combination
                      </li>
                      <li className="bullet-list-item">
                        Phase 3: Mastery - efficient (fast and accurate)
                        production of answers
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item" onClick={() => handleListClick(2)}>
                  Phase 1 is what happens in good classrooms: providing students
                  with an understanding of numbers, operations, and a means of
                  solving the basic math facts.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(2) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        It is expected that students have completed Phase I
                        before beginning MathFactlab.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item">
                  Unlike most math fact websites, MathFactLab, with its
                  multiple-model approach, is a powerful tool for Phase 2’s
                  development of reasoning strategies.
                </p>
                <p className="bullet-item">
                  With sufficient practice using a broad variety of strategies,
                  our students develop the mastery of Phase 3 without need for
                  memorization.
                </p>
              </div>
            </div>

            <div
              className={`accordions-item ${
                selectedQuestionIndex === 3 ? "active" : ""
              }`}
              onClick={() => handleParaClick(3, 3, 4)}
            >
              <p
                className="accordion-link"
                // onClick={() => handleParaClick(3, 3, 4)}
              >
                <RightOutlined className="accordion-icon" />
                Short frequent practice with MathFactLab is best.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 3 ? "active" : ""
                }`}
              >
                <p className="bullet-item" onClick={() => handleListClick(3)}>
                  MathFactLab student sessions are from 5 to 20 minutes long.
                  The default is 12.5 minutes.
                </p>
                <div
                  className={`list-show ${
                    listIndex.includes(3) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Teachers can determine the length of student sessions in
                        the teacher dashboard.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item" onClick={() => handleListClick(4)}>
                  For greatest success, we recommend that students complete at
                  least three sessions per week.
                </p>
                <div
                  className={`list-show ${
                    listIndex.includes(4) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        While multiple sessions can be completed in a single
                        day, distributed (or spaced) practice has been shown to
                        be a more effective method of learning.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`accordions-item ${
                selectedQuestionIndex === 4 ? "active" : ""
              }`}
            >
              <p
                className="accordion-link"
                onClick={() => handleParaClick(4, 5)}
              >
                <RightOutlined className="accordion-icon" />
                Students using MathFactLab progress through a series of stages,
                each broken into multiple levels.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 4 ? "active" : ""
                }`}
              >
                <p className="bullet-item">
                  The many small steps that the program is divided into allows
                  for ample opportunity for students to recognize their growth
                  and to feel proud of it.
                </p>

                <p className="bullet-item">
                  Although MathFactLab goes well beyond the basics, only the
                  basic facts are essential for your students to master.
                </p>

                <p className="bullet-item" onClick={() => handleListClick(5)}>
                  While certainly worthwhile, consider the advanced stages to be
                  enrichment, not essential.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(5) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        The advanced stages enhance mental math skills while
                        providing a means for all students - not just those
                        working on the basic facts - to be engaged in math fact
                        study.
                      </li>
                      <li className="bullet-list-item">
                        Note: Students should have mastery of the advanced +/-
                        stages before tackling the advanced x/÷ stages
                      </li>
                    </ul>
                  </div>
                </div>

                <p
                  className="bullet-item-without-bullet"
                  onClick={() =>
                    setSelectedListIndex(selectedListIndex === 8 ? 0 : 8)
                  }
                >
                  <RightOutlined
                    className={`accordion-icon-sub ${
                      selectedListIndex === 8 ? "active" : ""
                    }`}
                  />
                  The addition/subtraction program consists of 17 levels, broken
                  into 4 stages:
                </p>

                <div
                  className={`list-show ${
                    selectedListIndex === 8 ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Basic Facts Part 1 (Levels A - F)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level A: +1</li>
                      <li className="bullet-item-inner">Level B: +2 </li>
                      <li className="bullet-item-inner">Level C: +0 </li>
                      <li className="bullet-item-inner">Level D: Doubles</li>
                      <li className="bullet-item-inner">Level E: +3 or +4</li>
                      <li className="bullet-item-inner">Level F: +10</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Basic Facts Part 2 (Levels G - K)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">
                        Level G: Near doubles
                      </li>
                      <li className="bullet-item-inner">Level H: +9</li>
                      <li className="bullet-item-inner">Level J: +8</li>
                      <li className="bullet-item-inner">Level K: +7</li>
                    </ul>

                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Advanced Facts (Levels L - M)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level L: +11 to 20</li>
                      <li className="bullet-item-inner">Level M: +21 to 90</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Super-Advanced Facts (Levels N - R)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">
                        Level N: 2-digit + multiple of 10 (sums less than 100)
                      </li>
                      <li className="bullet-item-inner">
                        Level O: 2-digit + 2-digit (sums less than 100)
                      </li>
                      <li className="bullet-item-inner">
                        Level P: 2-digit + 2-digit ending in 9 (sums less than
                        100)
                      </li>
                      <li className="bullet-item-inner">
                        Level Q: 2-digit + multiple of 10 (sums greater than
                        100)
                      </li>
                      <li className="bullet-item-inner">
                        Level R: 2-digit + 2-digit (sums greater than 100)
                      </li>
                    </ul>
                  </div>
                </div>

                <p
                  className="bullet-item-without-bullet"
                  onClick={() =>
                    setSelectedListIndex(selectedListIndex === 9 ? 0 : 9)
                  }
                >
                  <RightOutlined
                    className={`accordion-icon-sub ${
                      selectedListIndex === 9 ? "active" : ""
                    }`}
                  />
                  The multiplication/division program consists of 25 levels,
                  broken into 4 stages:
                </p>

                <div
                  className={`list-show ${
                    selectedListIndex === 9 ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Basic Facts Part 1 (Levels A - E)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level A: x2</li>
                      <li className="bullet-item-inner">Level B: x10</li>
                      <li className="bullet-item-inner">Level C: x5</li>{" "}
                      <li className="bullet-item-inner">Level D: x1</li>
                      <li className="bullet-item-inner">Level E: x0</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Basic Facts Part 2 (Levels F - L)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level F: x4</li>
                      <li className="bullet-item-inner">Level G: x3</li>
                      <li className="bullet-item-inner">Level H: x6</li>{" "}
                      <li className="bullet-item-inner">
                        Level J: x9 <br></br>
                        <i className="note-text">
                          Note: While students are introduced to a new nine fact
                          at each level (for example, 4 x 9 at Level F), mastery
                          of most nine facts is not expected until this level.
                        </i>
                      </li>
                      <li className="bullet-item-inner">Level K: x8</li>
                      <li className="bullet-item-inner">Level L: x7</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Advanced Facts (Levels M - N)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level M: x11</li>
                      <li className="bullet-item-inner">Level N: x12</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Super-Advanced Facts (Levels O - T)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">
                        Level O: x11 (advanced)
                      </li>
                      <li className="bullet-item-inner">
                        Level P: x12 (advanced)
                      </li>
                      <li className="bullet-item-inner">Level Q: x50</li>
                      <li className="bullet-item-inner">Level R: x15</li>
                      <li className="bullet-item-inner">Level S: x25</li>
                      <li className="bullet-item-inner">Level T: x20</li>
                    </ul>
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Super-Duper-Advanced Facts (Levels U - Z)
                      </li>
                    </ul>
                    <ul className="bullet">
                      <li className="bullet-item-inner">Level U: x19</li>
                      <li className="bullet-item-inner">Level V: x18</li>
                      <li className="bullet-item-inner">Level W: x14</li>
                      <li className="bullet-item-inner">Level X: x16</li>
                      <li className="bullet-item-inner">Level Y: x13</li>
                      <li className="bullet-item-inner">Level Z: x17</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`accordions-item ${
                selectedQuestionIndex === 5 ? "active" : ""
              }`}
            >
              <p
                className="accordion-link"
                onClick={() => handleParaClick(5, 6, 7, 8, 9)}
              >
                <RightOutlined className="accordion-icon" />
                Students are given a brief placement assessment upon first
                logging in to MathFactLab.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 5 ? "active" : ""
                }`}
              >
                <p className="bullet-item" onClick={() => handleListClick(6)}>
                  While This assessment mirrors the levels of the programs,
                  first starting with questions from Level A and progressing
                  level-by-level towards the final level.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(6) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Depending on their assigned learning mode, students
                        begin with either addition or multiplication.
                      </li>
                      <li className="bullet-list-item">
                        After the student has responded inaccurately and/or
                        non-fluently five times, that operation’s assessment
                        ends.
                      </li>
                      <li className="bullet-list-item">
                        The student then begins the 2nd operation’s assessment
                        (either subtraction or division), which will also end
                        after the fifth inaccurate and/or non-fluent response
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item" onClick={() => handleListClick(7)}>
                  Before beginning the placement assessment, students are asked
                  to type in a variety of two-digit numbers. The average
                  response time can help teachers best determine an appropriate
                  required fluency rate for each student.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(7) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        Students who have slower than typical response times may
                        need to be assigned a slower required fluency rate.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item" onClick={() => handleListClick(8)}>
                  We know that students make typos or, at times, respond
                  incorrectly to facts that they may know well.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(8) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        With this in mind, at each level in the placement
                        assessment, students are given a second try for up to
                        two incorrect or slow responses.
                      </li>
                      <li className="bullet-list-item">
                        This helps us make sure that students are being
                        accurately placed within the program.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item">
                  Students are assigned to begin MathFactLab at the level where
                  they have made their third inaccurate and/or non-fluent
                  response.
                </p>

                <p className="bullet-item" onClick={() => handleListClick(9)}>
                  {" "}
                  We know that If a teacher feels a student’s results on a
                  placement assessment is not reflective of the student’s
                  ability, the teacher has two choices.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(9) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        One, the student can be given the opportunity to take
                        the placement assessment again. (The teacher selects
                        ‘Reassess’ under ‘Actions’ on the student’s row in the
                        teacher dashboard.)
                      </li>
                      <li className="bullet-list-item">
                        Two, the teacher can place the student in the program at
                        the level determined most appropriate by the teacher.
                        (Select ‘Edit’ on the student’s row in the teacher
                        dashboard.)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`accordions-item ${
                selectedQuestionIndex === 6 ? "active" : ""
              }`}
            >
              <p className="accordion-link" onClick={() => handleParaClick(6)}>
                <RightOutlined className="accordion-icon" />
                Growth is its own best reward.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 6 ? "active" : ""
                }`}
              >
                <p className="bullet-item">
                  MathFactLab is not game-based, nor are there reward
                  tokens,games, etc. Instead, we find that our students are
                  generally intrinsically motivated by the growth that they see
                  in their own performance as they move through the levels of
                  the program.
                </p>
                <p className="bullet-item">
                  You will find that making progress in the program is a source
                  of pride for your students, especially for those who have
                  className="bullet-item" struggled with math facts in the past.
                </p>
                <p className="bullet-item">
                  Implementing small celebrations in your classroom, like
                  clapping for those each day who move up a level, can add to
                  student pride in their successes.
                </p>
              </div>
            </div>

            <div
              className={`accordions-item ${
                selectedQuestionIndex === 7 ? "active" : ""
              }`}
            >
              <p
                className="accordion-link"
                onClick={() => handleParaClick(7, 10, 11)}
              >
                <RightOutlined className="accordion-icon" />
                Not all students process at the same speed.
              </p>
              <div
                className={`accordion-answer ${
                  selectedQuestionIndex === 7 ? "active" : ""
                }`}
              >
                <p className="bullet-item">
                  By default, MathFactLab students are expected to respond
                  accurately to a given prompt in under four seconds, but you
                  will find that this pace is unrealistic for some students.
                </p>

                <p className="bullet-item">
                  Teachers are able to change the required response time in the
                  teacher console. This can be set from 2 up to 120 seconds.
                </p>

                <p className="bullet-item">
                  A longer response time will be helpful for a good percentage
                  of special education students.
                </p>

                <p className="bullet-item" onClick={() => handleListClick(10)}>
                  We know that Some general education students may also need a
                  longer response time.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(10) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        While typically teachers may choose a slower pace for
                        those with a learning disability in math, keep in mind
                        that you may also have general education students
                        working at grade level or above who - because of their
                        processing speed - simply are not capable of responding
                        consistently in less than four seconds.
                      </li>
                      <li className="bullet-list-item">
                        To keep MathFactLab a positive, pleasant experience,
                        adjust the required fluency rate for students who need
                        it to one that is appropriately challenging while also
                        achievable.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="bullet-item" onClick={() => handleListClick(11)}>
                  For students working on addition/subtraction - in order to
                  break dependencies on counting fingers - it is important that
                  their required response time be no longer than necessary.
                </p>

                <div
                  className={`list-show ${
                    listIndex.includes(11) ? "activeList" : ""
                  }`}
                >
                  <div className="list-wrapper">
                    <ul className="bullet-list">
                      <li className="bullet-list-item">
                        This time restraint will help to encourage the student
                        to use more efficient strategies.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Section>
      </Container>
    </>
  );
}

export default TeacherClassroomImplementationPage;
