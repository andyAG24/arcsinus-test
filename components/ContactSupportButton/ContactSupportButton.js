import React, { Component } from 'react';

export default class ContactSupportButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='contact-support-button'>
                <img src='https://simpleicon.com/wp-content/uploads/mail-5.svg' />
                <span className='contact-support-button-text'>Написать в поддержку</span>
            </div>
        )
    }
}