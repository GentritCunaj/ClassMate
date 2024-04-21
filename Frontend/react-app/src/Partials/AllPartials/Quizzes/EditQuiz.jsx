import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuizById, updateQuiz } from '../../../Redux/data/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Sidebar';

const EditQuiz = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const creatorId = user.id;

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    subject: '',
    creatorId: creatorId,
    noOfQuestions: 0,
    pointPerQuestion: 0,
    negativeMarking: 'No',
    negativeMarkingPerQuestion: 'No',
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
    dispatch(getQuizById(quizId))
      .then((data) => {
        const quizData = data.data;
        setFormData({
          title: quizData.title,
          thumbnail: quizData.thumbnail,
          subject: quizData.subject,
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQuiz(quizId, formData))
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.error('Error updating quiz:', error);
        toast.error('Error updating quiz. Please try again.');
      });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }
      ]
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

  return (
    <>
      <ToastContainer />
      <div className="quiz-scroll-container">
      <Sidebar></Sidebar>
        <div className="quiz-container">
        <div className="thumbnail-container">
          {/* You can replace 'your_thumbnail_url.jpg' with your actual thumbnail URL */}
          <img className="thumbnail" src="https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png" alt="Thumbnail" />
        </div>
          <div>
            <h2>Edit Quiz</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" />
              </div>
             
              <div>
                <label>Subject:</label>
                <input type="text" name="subject" value={formData.subject} onChange={onChange} placeholder="Subject" />
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
              <div>
                <label>Negative Marking Per Question:</label>
                <select name="negativeMarkingPerQuestion" value={formData.negativeMarkingPerQuestion} onChange={onChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
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
              <button type="submit">Edit Quiz</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;