import React from "react";
import styles from "./editQuestion.module.css";
import {editQuestion} from '../api/QuizApi.js'
class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Id: this.props.data.Id,
            Question: this.props.data.Question,
            Answer1: this.props.data.Answers[0],
            Answer2: this.props.data.Answers[1],
            Answer3: this.props.data.Answers[2],
            Answer4: this.props.data.Answers[3],
            CorrectAnswer: this.props.data.CorrectAnswer,
            formErrors: { email: "", password: "" },
            idValid: true,
            questionValid: false,
            answer1Valid: false,
            answer2Valid: false,
            answer3Valid: false,
            answer4Valid: false,
            correctAnswerValid: false,
            formValid: false,
        };
        this.quizInfo = JSON.parse(localStorage.getItem("quizData"));
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let questionValid = this.state.questionValid;
        let answer1Valid = this.state.answer1Valid;
        let answer2Valid = this.state.answer2Valid;
        let answer3Valid = this.state.answer3Valid;
        let answer4Valid = this.state.answer4Valid;
        let correctAnswerValid = this.state.correctAnswerValid;

        switch (fieldName) {
            case 'Question':
                questionValid = value.length >= 3;
                break;
            case 'Answer1':
                answer1Valid = value.length >= 3;
                break;
            case 'Answer2':
                answer2Valid = value.length >= 3;
                break;
            case 'Answer3':
                answer3Valid = value.length >= 3;
                break;
            case 'Answer4':
                answer4Valid = value.length >= 3;
                break;
            case 'CorrectAnswer':
                correctAnswerValid = (value <=4 && value >=1);
                break;

            default:
                break;
        }
        this.setState({
            questionValid: questionValid,
            answer1Valid: answer1Valid,
            answer2Valid: answer2Valid,
            answer3Valid: answer3Valid,
            answer4Valid: answer4Valid,
            correctAnswerValid: correctAnswerValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid:this.state.questionValid && this.state.answer1Valid && this.state.answer2Valid && this.state.answer3Valid && this.state.answer4Valid && this.state.correctAnswerValid && this.state.correctAnswerValid });
    }

    submitForm(event) {
        event.preventDefault();
        
        var editedQuestion = {
            Id: Number(this.state.Id),
            Question: this.state.Question,
            Answers: [this.state.Answer1, this.state.Answer2, this.state.Answer3, this.state.Answer4],
            CorrectAnswer: Number(this.state.CorrectAnswer),
        };

            editQuestion(this.state.Id, editedQuestion); //to do bazy
            this.props.update("PUT", editedQuestion) //to do state w quizPage
            
        
    };
    render() {
        return (
            <div>
                <div className={styles.cont}>
                    <div className={styles.form_container}>
                        <form>
                            <h2>Edytuj Pytanie</h2>
                            {/* <div>
                                <label>Id</label>
                                <input type="number" required className="form-control" name="Id"
                                    // placeholder="2"
                                    value={this.state.Id}
                                    onChange={this.handleUserInput} />
                            </div> */}

                            <div>
                                <label>Pytanie</label>
                                <input type="text" className="form-control" name="Question"
                                    // placeholder="Czy można?"
                                    value={this.state.Question}
                                    onChange={this.handleUserInput} />
                            </div>

                            <div>
                                <label>Odpowiedź 1</label>
                                <input type="text" required className="form-control" name="Answer1"
                                    // placeholder="Tak"
                                    value={this.state.Answer1}
                                    onChange={this.handleUserInput} />
                            </div>

                            <div>
                                <label>Odpowiedź 2</label>
                                <input type="text" required className="form-control" name="Answer2"
                                    // placeholder="Nie"
                                    value={this.state.Answer2}
                                    onChange={this.handleUserInput} />
                            </div>

                            <div>
                                <label>Odpowiedź 3</label>
                                <input type="text" required className="form-control" name="Answer3"
                                    // placeholder="Chyba"
                                    value={this.state.Answer3}
                                    onChange={this.handleUserInput} />
                            </div>

                            <div>
                                <label>Odpowiedź 4</label>
                                <input type="text" required className="form-control" name="Answer4"
                                    // placeholder="Może"
                                    value={this.state.Answer4}
                                    onChange={this.handleUserInput} />
                            </div>

                            <div>
                                <label>Poprawna odpowiedź</label>
                                <input type="text" required className="form-control" name="CorrectAnswer"
                                    // placeholder="1"
                                    value={this.state.CorrectAnswer}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div style={{ color: "#F06292", marginBottom: "2vh" }}>
                                {!this.state.questionValid && <p>Tytuł  musi mieć co najmniej 3 znaki</p>}
                                {!this.state.answer1Valid && <p>Odpowiedź musi mieć co najmniej 3 znaki</p>}
                                {!this.state.answer2Valid && <p>Odpowiedź musi mieć co najmniej 3 znaki</p>}
                                {!this.state.answer3Valid && <p>Odpowiedź musi mieć co najmniej 3 znaki</p>}
                                {!this.state.answer4Valid && <p>Odpowiedź musi mieć co najmniej 3 znaki</p>}
                                {!this.state.correctAnswerValid && <p>Poprawna odpowiedź musi być z przedziału 1-4</p>}

                            </div>

                            <button className={styles.Button2} onClick={this.submitForm.bind(this)} disabled={!this.state.formValid}>
                                Zatwierdź Edycję
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditQuestion;
