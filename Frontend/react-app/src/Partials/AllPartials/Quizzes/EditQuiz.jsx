import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuizById, updateQuiz, getAllSubjects } from '../../../Redux/data/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Sidebar';

const notify = (text) => toast(text);

const EditQuiz = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const { error, message, subjects } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const creatorId = user.id;

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    subjectId: '',
    creatorId: creatorId,
    noOfQuestions: 0,
    pointPerQuestion: 0,
    negativeMarking: 'No',
    negativeMarkingPerQuestion: 0,
    totalTimeInMinutes: 0,
    questions: [
      {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]
  });

  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getQuizById(quizId))
      .then((data) => {
        const quizData = data.data;
        setFormData({
          title: quizData.title,
          thumbnail: quizData.thumbnail,
          subjectId: quizData.subjectId,
          creatorId: quizData.creatorId,
          noOfQuestions: quizData.noOfQuestions,
          pointPerQuestion: quizData.pointPerQuestion,
          negativeMarking: quizData.negativeMarking,
          negativeMarkingPerQuestion: quizData.negativeMarkingPerQuestion,
          totalTimeInMinutes: quizData.totalTimeInMinutes,
          questions: quizData.questions
        });
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        toast.error('Error fetching quiz. Please try again.');
      });
  }, [dispatch, quizId]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'negativeMarking') {
      if (value === 'No') {
        setFormData({ ...formData, negativeMarking: value, negativeMarkingPerQuestion: "No" }); // Changed to string "No"
      } else {
        setFormData({ ...formData, negativeMarking: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { text: '', options: ['', '', '', ''], correctAnswer: '' }]
    });
  };

  const onChangeQuestion = (index, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].text = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const onChangeOption = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const onChangeCorrectAnswer = (questionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].correctAnswer = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.negativeMarking === 'Yes') {
      if (formData.negativeMarkingPerQuestion >= 0) {
        return notify('Negative marking per question should be a negative number');
      }
    }

    if (formData.noOfQuestions > formData.questions.length) {
      return notify(`You only added ${formData.questions.length} out of ${formData.noOfQuestions} questions`);
    }

    if (formData.noOfQuestions < formData.questions.length) {
      return notify(`You have added more than ${formData.noOfQuestions} questions. Please remove some questions`);
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const question = formData.questions[i];
      const uniqueOptions = new Set(question.options);

      if (uniqueOptions.size !== question.options.length) {
        return notify(`All options for question ${i + 1} must be unique`);
      }

      if (!question.options.includes(question.correctAnswer)) {
        return notify(`The correct answer for question ${i + 1} must match one of the provided options`);
      }
    }

    dispatch(updateQuiz(quizId, formData));
    notify('Quiz Updated');
  };

  return (
    <>
      <ToastContainer />
      <div className="quiz-scroll-container">
        <Sidebar />
        <div className="quiz-container">
          <div className="thumbnail-container">
            <img className="thumbnail" src="https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png" alt="Thumbnail" />
          </div>
          <div>
            <h2>Edit Quiz</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label>Select Subject</label>
                <select className="form-control" name="subjectId" value={formData.subjectId} onChange={onChange} required>
                  <option value="">Select a Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.subjectId} value={subject.subjectId}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Number of Questions:</label>
                <input type="number" name="noOfQuestions" value={formData.noOfQuestions} onChange={onChange} placeholder="Number of Questions" />
              </div>
              <div>
                <label>Point Per Question:</label>
                <input type="number" name="pointPerQuestion" value={formData.pointPerQuestion} onChange={onChange} placeholder="Point Per Question" />
              </div>
              <div>
                <label>Negative Marking:</label>
                <select name="negativeMarking" value={formData.negativeMarking} onChange={onChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {formData.negativeMarking === 'Yes' && (
                <div>
                  <label>Negative Marking Per Question:</label>
                  <input
                    type="number"
                    name="negativeMarkMarkingPerQuestion"
                    value={formData.negativeMarkingPerQuestion}
                    onChange={onChange}
                    placeholder="Negative marking per question"
                  />
                </div>
              )}
              <div>
                <label>Total Time In Minutes:</label>
                <input type="number" name="totalTimeInMinutes" value={formData.totalTimeInMinutes} onChange={onChange} placeholder="Total Time In Minutes" />
              </div>

              <h3>Questions</h3>
              {formData.questions.map((question, index) => (
                <div key={index}>
                  <input type="text" value={question.text} onChange={(e) => onChangeQuestion(index, e)} placeholder={`Question ${index + 1}`} />
                  {question.options.map((option, optionIndex) => (
                    <input key={optionIndex} type="text" value={option} onChange={(e) => onChangeOption(index, optionIndex, e)} placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`} />
                  ))}
                  <input type="text" value={question.correctAnswer} onChange={(e) => onChangeCorrectAnswer(index, e)} placeholder="Correct Answer" />
                </div>
              ))}
              <button type="button" onClick={addQuestion}>Add Question</button>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;