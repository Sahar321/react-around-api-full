import { useState } from 'react';
export function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister({
      email,
      password,
    });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="form-page">
      <h1 className="form-page__title">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        name="form-page__form"
        className="form-page__form"
      >
        <input
          className="textbox form-page__input"
          placeholder="Email"
          type="text"
          required
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="textbox form-page__input form-page__input_type_email textbox-Email"
          placeholder="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="form-page__submit">Sign Up</button>
        <a href="/signin" className="form-page__goto-login-page">
          Already a member? Log in here!
        </a>
      </form>
    </div>
  );
}
