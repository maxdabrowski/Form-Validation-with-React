import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    email: "",
    pass: "",
    accept: false,

    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false
    }
  };

  messages = {
    username_incorrect: "Nazwa użytkownika musi zaczynać sięz dużej litery ",
    email_incorrect: "podaj poprawny email",
    password_incorrect: "hasło musi mieć przynajmniej 8 znaków",
    accept_incorrect: "Musisz zaakceptowac regulamin"
  };

  handleChange = e => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    } else if (type === "checkbox") {
      const accept = e.target.checked;
      this.setState({
        [name]: accept
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();

    const validation = this.formValidation();
    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        pass: "",
        accept: false,
        message: "Formularz został wysłany",
        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false
        }
      });
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept
        }
      });
    }
  };

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    const regUsername = new RegExp("[A-ZĄĆŃÓŚŻŹ]");
    const regEmail = new RegExp("[^@s]+@[^@s]+.[^@s]+");

    if (regUsername.test(this.state.username)) {
      username = true;
    }
    if (regEmail.test(this.state.email)) {
      email = true;
    }
    if (this.state.pass.length >= 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
    }
    return {
      username,
      email,
      password,
      accept,
      correct
    };
  };

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: ""
          }) === "",
        3000
      );
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate className="form">
          <label htmlFor="user">
            <span>Nazwa użytkownika:</span>
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && (
              <p>{this.messages.username_incorrect}</p>
            )}
          </label>
          <label htmlFor="email">
            <span>email: </span>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && <p>{this.messages.email_incorrect}</p>}
          </label>
          <label htmlFor="password">
            <span>hasło:</span>
            <input
              type="password"
              id="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
            {this.state.errors.pass && (
              <p>{this.messages.password_incorrect}</p>
            )}
          </label>
          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            />{" "}
            <p className="checkboxText">Akceptuję regulamin</p>
            {this.state.errors.accept && (
              <p>{this.messages.accept_incorrect}</p>
            )}
          </label>
          <button>Zarejestruj się</button>
        </form>
        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
    );
  }
}

export default App;
