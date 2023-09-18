import React, { Component } from 'react';
import './SignUpForm.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '', // Added passwordConfirmation
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '', // Added passwordConfirmation
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    // Real-time validation for username, password, and password confirmation
    if (name === 'username') {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          username: value.length < 3 ? 'Username must be at least 3 characters' : '',
        },
      }));
    }

    if (name === 'password') {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      const isValidPassword = value.match(passwordPattern);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          password: isValidPassword
            ? ''
            : 'Password must be at least 6 characters with one special character and one digit',
        },
      }));
    }

    if (name === 'passwordConfirmation') {
      if (value !== this.state.password) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            passwordConfirmation: 'Passwords do not match',
          },
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            passwordConfirmation: '',
          },
        }));
      }
    }

    if (name === 'email') {
      // Updated email validation pattern
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = value.match(emailPattern);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          email: isValidEmail ? '' : 'Invalid email address',
        },
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      // You can perform the sign-up logic here
      console.log('Form submitted with valid data');
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    let errors = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '', // Added passwordConfirmation
    };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      errors.email = 'Invalid email address';
      isValid = false;
    } else if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordPattern)) {
      errors.password = 'Password must be at least 6 characters with one special character and one digit';
      isValid = false;
    }

    // Password confirmation validation
    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state;
    const isFormValid = Object.values(errors).every((error) => !error);

    return (
      <div className="sign-up-card">
        <h1>Form Validation</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
            <span className="error">{errors.username}</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
            <span className="error">{errors.password}</span>
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.handleInputChange}
            />
            <span className="error">{errors.passwordConfirmation}</span>
          </div>

          <button
            type="submit"
            className={isFormValid ? 'valid-button' : 'invalid-button'}
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
