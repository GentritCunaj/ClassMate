import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createQuiz } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import "../../../assets/css/quiz.css";



const Quiz = () => {
  const { error, message } = useSelector((store) => store.data); // Assuming Redux state structure
  const {user} = useSelector((store) => store.auth);
  var creatorId = user.id;
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    subject: '',
    creatorId:creatorId,
    noOfQuestions: 0,
    pointPerQuestion: 0,
    negativeMarking: 'No',
    negativeMarkingPerQuestion: 'No',
    totalTimeInMinutes: 0,
    questions: [
      {
        text: '',
        options: ['', '', '', ''], // Four empty options
        correctAnswer: ''
      }
    ]
  });

  const dispatch = useDispatch();
  

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createQuiz(formData));
    // Reset form fields
    setFormData({
      title: '',
      thumbnail: '',
      subject: '',
      creatorId:creatorId,
      noOfQuestions: 0,
      pointPerQuestion: 0,
      negativeMarking: 'No',
      negativeMarkingPerQuestion: 'No',
      totalTimeInMinutes: 0,
      questions: [
        {
          text: '',
          options: ['', '', '', ''], // Four empty options
          correctAnswer: ''
        }
      ]
    });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <>
    <ToastContainer />
    <div className="quiz-scroll-container">
      
      
      <div className="quiz-container" >
        <div className="thumbnail-container">
          {/* You can replace 'your_thumbnail_url.jpg' with your actual thumbnail URL */}
          <img className="thumbnail" src="https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png" alt="Thumbnail" />
        </div>
        <div>
          <h2>Create Quiz</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" />
            </div>
            
            <div>
              <label>Subject:</label>
              <input type="text" name="subject" value={formData.subject} onChange={onChange} placeholder="Subject" />
            </div>
            {/* <div>
              <label>Creator Id:</label>
              <input type="text" name="creatorId" value={formData.creatorId} onChange={onChange} placeholder="CreatorId" />
            </div> */}
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Quiz;