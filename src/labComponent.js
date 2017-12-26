import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


// Lab component
class Lab extends React.Component {
    constructor(props) {
        super(props);

        // the state of component
        this.state = {
            question: true,
            variables: true,
            hypothesis: true
        };
    }

    // render method for Lab
    render() {
        return (
            <div>
                {
                    /*
                    take value from state.question and shows component Question ,
                    Question has attribute question with string value
                    */
                }
                {this.state.question && <Question question={'Find the relationship between pressure and volume.'} />}

                {/*  take value from state.variables and shows component Variables*/}
                {this.state.variables && <Variables />}

                {/* take value from state.hypothesis and shows component  Hypothesis*/}
                {this.state.hypothesis && <Hypothesis />}
            </div>
        );
    }
}

// export for component Question, component Question contains function LabSectionWrapper
// LabSectionWrapper contains component QuestionForm
export const Question = LabSectionWrapper(QuestionForm, '/question');

// export for component Variables, component koja Variables contains function LabSectionWrapper,
// LabSectionWrapper contains component VariablesForm
export const Variables = LabSectionWrapper(VariablesForm, '/variables');

// function LabSectionWrapper sa parameters Component i url
function LabSectionWrapper(Component, url) {

    // component LabSection
    return class LabSection extends React.Component {
        constructor(props) {
            super(props);

            // state
            this.state();
        }

        // method for update,
        // set the state and [e.target.name] take/show value e.target.value
        handleUpdate(e) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        save(e) {
            // write axios call and handle error/success
        }

        // render method for LabSection
        render() {
            return (
                {
                    /*
                        component "Component" with attribute:
                            -handleInput
                            -save
                            -error
                    */
                }
                <Component
                    handleInput={this.handleInput}
                    save={this.save}
                    error={this.state.error}
                />
            );
        }
    }
}

// function QuestionForm with parameters: handleInput, save, error
function QuestionForm({ handleInput, save, error }) {
    return (
        {
            /*
            error and show div with className "error" with property error
            */
        }
        { error && <div className="error">error</div> }

        // element textarea with property
        <textarea>
            Type your queston here.
        </textarea>
        
}

function Variables({ handleInput, save, error }) {
    return {
            {
                /*
                error and show div with className "error" with property error
                */
            }
             { error && <div className="error">error</div> }

            // label elment(attribute: for) with property
            <label for="iv">Independent Variable</label>

            // input element(attribute: name, type-text, placeholder, onChange-use handleInput) with property
            <input name="iv" type="text" placeholder="" onChange={handleInput} />


            // label elment(attribute: for) with property
            <label for="dv">Dependent Variable</label>

            // input element(attribute: name, type-text, placeholder, onChange-use handleInput) with property
            <input name="dv" type="text" placeholder="" onChange={handleInput} />
            
            // label elment(attribute: for) with property
            <label for="controls">Control Variables</label>

            // input element(attribute: name, type-textarea, placeholder, onChange-use handleInput) with property
            <input name="controls" type="textarea" placeholder="" onChange={handleInput} />

            // button element(attribute: type-submit, onClic-use  save)
            <button type="submit" onClick={save}>Save</submit>
        }
    }