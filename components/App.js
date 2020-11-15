import React, { Component } from "react";
import AuthForm from './AuthForm/AuthForm.js';
import ContactSupportButton from './ContactSupportButton/ContactSupportButton';

import '../styles/App.scss';


class App extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="page-title">Web <span>App</span></h1>
                <AuthForm />
                <ContactSupportButton />
            </div>
        );
    }
}

export default App;