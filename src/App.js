import logo from './logo.svg';
import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Fragment } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer,setAnswer] = useState();
  const [model, setModel] = useState(null);
  //tensorflow model
  const loadModel = async () => {
      const loadedModel = await qna.load()
      setModel(loadedModel);
      console.log('Model Loaded')
  }
  useEffect(()=> {loadModel()},[])
  const answerQuestion = async(e)=>{
      if(e.which == 13 && model!= null){
      console.log('Question submitted.')
      const passage = passageRef.current.value
      const question = questionRef.current.value

      const answers = await model.findAnswers(question,passage)
      setAnswer(answers)
      console.log(answers)
  }
  }

  return (
    <div className="App">
      <header className="App-header">
          {model ==null ?
              <div>
                  <div>Model Loading</div>
                  <div className="loader"></div>
              </div>
              :
              <Fragment>
                  Passage
                  <textarea ref={passageRef} rows="30" cols="100"></textarea>
                  Ask a Question
                  <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
                  <br />
                  Answers
                  {answer ? answer.map((ans, idx) =><div><b>Answer {idx+1} - </b> {ans.text} ({Math.floor(ans.score*100)/100})</div>) : ""}
              </Fragment>
          }
      </header>
    </div>
  );
}

export default App;
