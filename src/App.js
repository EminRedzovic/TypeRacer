import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    started: true,
    placeholder: "Type the text below when the timer finishes.",
    ticks: 5,
    text: [],
    splicedText: null,
    reci: null,
    rec: "",
    counter: 0,
    poeni: 0,
    input: [0],
    broj: [],
    osvojeno: null,
    vreme: 0,
    tacnovreme: 0,
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.setState({
      reci: this.state.text.length,
    });
    fetch("https://api.api-ninjas.com/v1/loremipsum?paragraphs=" + 30, {
      method: "GET",
      headers: {
        "X-Api-Key": "kLbyaCzC7a1CFDRYB6gWQw==9t6GXA08jqI2yGhK",
      },
      contentType: "application/json",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const text = data.text.split(" ").slice(0, 25);
        this.setState({ text: text, ponavljanje: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
    for (let i = 5; i > 1; i--) {
      setTimeout(() => {
        this.setState({ ticks: this.state.ticks - 1 });
      }, (i - 1) * 1000);
      setTimeout(() => {
        console.log(this.state.ticks);
        this.setState({ placeholder: "", started: false });
        console.log("aaa");
        this.setState({ ticks: null });
        setInterval(() => {
          this.setState({ vreme: this.state.vreme + 1 });
        }, 1000);
      }, 5000);
    }
  }
  end = () => {
    if (
      this.state.text[this.state.text.length - 1] ===
      this.state.text[this.state.counter]
    ) {
      // alert("Osvojili ste " + this.state.poeni + "poena");
    }
  };
  space = (event) => {
    if (
      this.state.text[this.state.text.length - 1] ===
      this.state.text[this.state.counter]
    ) {
      if (this.state.text[this.state.counter] === this.state.rec.trim()) {
        const elementRef = this[`elementRef${this.state.counter}`];
        elementRef.style.backgroundColor = "green";
      } else {
        const elementRef = this[`elementRef${this.state.counter}`];
        elementRef.style.backgroundColor = "red";
      }
      this.setState({ input: [], broj: [0], tacnovreme: this.state.vreme });
    } else {
      if (event.key === " ") {
        if (this.state.text[this.state.counter] === this.state.rec.trim()) {
          const elementRef = this[`elementRef${this.state.counter}`];
          elementRef.style.backgroundColor = "green";
          this.end();
          this.setState({
            rec: "",
            counter: this.state.counter + 1,
            poeni: this.state.poeni + 1,
            osvojeno:
              "Osvojili ste " +
              Math.round((60 / this.state.vreme) * (this.state.poeni + 1)) * 4 +
              "wpm sa " +
              (this.state.poeni + 1) +
              " tacno ukucanih reci",
          });
        } else {
          const elementRef = this[`elementRef${this.state.counter}`];
          elementRef.style.backgroundColor = "red";
          this.end();

          this.setState({ rec: "", counter: this.state.counter + 1 });
        }
      }
    }
  };
  render() {
    return (
      <div className="app">
        <h1 id="counter">{this.state.ticks}</h1>
        <div className="card">
          <center>
            <h1>Ducky type</h1>
            <p>Test how much of a fast writer u are!</p>
            <div className="line"></div>
          </center>
          <div className="div">
            <div className="text">
              <span>
                {this.state.text.map((item, index) => {
                  return (
                    <span
                      unselectable="on"
                      key={index}
                      ref={(el) => (this[`elementRef${index}`] = el)}
                    >
                      {item + " "}
                    </span>
                  );
                })}
              </span>
            </div>
            <div
              className="input"
              onClick={() => {
                console.log(this.state);
                console.log(this.state.rec);
              }}
            >
              {this.state.input.map((item) => {
                return (
                  <input
                    className="textint"
                    disabled={this.state.started}
                    placeholder={this.state.placeholder}
                    onKeyDown={this.space}
                    value={this.state.rec}
                    onChange={(event) => {
                      this.setState({ rec: event.target.value });
                    }}
                  ></input>
                );
              })}
              <p>
                {this.state.broj.map(() => {
                  return (
                    <center>
                      <h1>{this.state.osvojeno}</h1>
                      <p>wpm = words per minute</p>
                      <button
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Play again
                      </button>
                    </center>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
