import React, { Component } from 'react';
import CustomInput from '../CustomInput/CustomInput'; 
import Select from 'react-select';

const formModes = {
	LOGIN: 'login',
	REGISTRATION: 'registration'
}

const countries = [
	{ value: 'russia', label: 'Россия', id: 1 },
	{ value: 'belarus', label: 'Беларусь', id: 2 },
	{ value: 'ukraine', label: 'Украина', id: 3 }
];

const cities = [
	{ value: 'moscow', label: 'Москва', countryId: 1 },
	{ value: 'saint-p', label: 'Санкт-Петербург', countryId: 1 },
	{ value: 'ekaterinburg', label: 'Екатеринбург', countryId: 1 },
	{ value: 'minsk', label: 'Минск', countryId: 2 },
	{ value: 'gomel', label: 'Гомель', countryId: 2 },
	{ value: 'vitebsk', label: 'Витебск', countryId: 2 },
	{ value: 'kyiv', label: 'Киев', countryId: 3 },
	{ value: 'odessa', label: 'Одесса', countryId: 3 },
	{ value: 'Kharkiv', label: 'Харьков', countryId: 3 }
];

const mobileOs = [
	{ value: 'ios', label: 'iOS' },
	{ value: 'android', label: 'Android' },
	{ value: 'windows-phone', label: 'Windows Phone' },
]

export default class AuthForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: '',
			isSmsSent: false, 
			isLoggedIn: false,
			smsCode: '',
			isValidationErrorExists: false,
			currentFormMode: formModes.LOGIN,
			mobileOs: ['iOS', 'Android', 'Windows Mobile'],
			selectedCountry: '',
			currentCities: ''
		};

		this.handleInputValue = this.handleInputValue.bind(this);
		this.onCountryChange = this.onCountryChange.bind(this);
	}

	handleInputValue(ev) {
		let fieldName = ev.target.id;
		this.setState({ [fieldName]: ev.target.value });
	}

	onCountryChange(ev) {
		this.setState({ currentCities: [] });
		this.state.selectedCountry = ev;
		this.state.selectedCountry != '' && this.filterCities();
	}

	filterCities() {
		let currentCities = cities.filter(city => city.countryId == this.state.selectedCountry.id);
		this.setState({ currentCities: currentCities });
	}

	fakeRequestToSendSms() {
		let that = this;
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				that.setState({
					isSmsSent: true
				});
				resolve('done');
			}, 2000);
		});
	}

	fakeRequestToLogIn() {
		let that = this;
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				if (that.validateSmsCode(that.state.smsCode)) {
					that.setState({
						isValidationErrorExists: false,
						isLoggedIn: true
					});
				} else {
					that.setState({
						isValidationErrorExists: true,
						isLoggedIn: false
					});
				}
				resolve('done');
			}, 2000);
		});
	}

	validateSmsCode(code) {
		let regexp = new RegExp("\\d{6}");
		return regexp.test(code);
	}

	logInAccount(ev) {
		ev.preventDefault();
		ev.target.textContent = 'Подождите...';

		!this.state.isSmsSent && this.fakeRequestToSendSms()
			.then(() => ev.target.textContent = 'Войти')
			.then(() => this.forceUpdate());

		this.state.isSmsSent && this.fakeRequestToLogIn()
			.then(() => ev.target.textContent = 'Войти');
			
	}

	

	renderLoginForm() {
		return(
			<div>
				{ !this.state.isLoggedIn && 
					<React.Fragment>
					<h2>Войдите в свой профиль</h2>
						<form className="login-form">
							<div className="login-field">
								<CustomInput label='Логин' inputType='text' inputId='login' inputName='login' onChange={ev => this.handleInputValue(ev)}/>
							</div>
							<div className="login-field">
								<CustomInput label='Пароль' inputType='password' inputId='password' inputName='password' onChange={ev => this.handleInputValue(ev)}/>
							</div>
							{ this.state.isSmsSent &&
								<div className="login-field">
									<CustomInput label='Введите код из смс' inputType='text' inputId='smsCode' inputName='sms-code' onChange={ev => this.handleInputValue(ev)}/>
									{ this.state.isValidationErrorExists && 
										<span className="sms-code-error">Введенный код не прошел валидацию. Повторите попытку.</span>
									}
								</div>
							}

							<button className="login-button" type="submit" onClick={ev => this.logInAccount(ev)}>Войти</button>
						</form>
						<div className="login-form_additional-buttons">
							<button className="login-form_additional-button" type="submit">Я забыл пароль</button>
							<button className="login-form_additional-button" type="submit" 
								onClick={ () => {
									this.setState({currentFormMode: formModes.REGISTRATION});
									} }>Регистрация</button>
						</div>
					</React.Fragment>
				}
				{ this.state.isLoggedIn &&
					<h2>Привет, {this.state.login}</h2>
				}				
			</div>
		)
	}

	renderRegistrationForm() {
		return(
			<div>
				<React.Fragment>
					<h2>Войдите в свой профиль</h2>
					<form className="login-form">
						<div className="login-field">
							<CustomInput label='Фамилия Имя Отчество' inputType='name' inputId='fullName' inputName='fullName' onChange={ev => this.handleInputValue(ev)}/>
						</div>
						<div className="login-field">
							<CustomInput label='Email' inputType='email' inputId='email' inputName='email' onChange={ev => this.handleInputValue(ev)}/>
						</div>
						<div className="login-field">
							<CustomInput label='Телефон' inputType='tel' inputId='phone' inputName='phone' onChange={ev => this.handleInputValue(ev)}/>
						</div>
						<div className="login-field">
							<label htmlFor='country'>Страна</label>
							<Select 
								className='custom-input'
								id='country'
								onChange={ev => this.onCountryChange(ev)}
								options={countries}/>
						</div>
						<div className="login-field">
							<label htmlFor='country'>Город</label>
							<Select 
								className='custom-input'
								id='city'
								options={this.state.currentCities}/>
						</div>
						<div className="login-field">
							<label htmlFor='mobile-os'>Операционная система</label>
							<Select 
								className='custom-input'
								id='mobile-os'
								options={mobileOs}/>
						</div>

						<button className="login-button" type="submit" onClick={ev => this.logInAccount(ev)}>Регистрация</button>
					</form>
					<div className="login-form_additional-buttons">
						<button className="login-form_additional-button" type="submit" 
							onClick={ () => {
								this.setState({
									currentFormMode: formModes.LOGIN,
									isSmsSent: false
								});
								} }>Уже есть аккаунт?</button>
					</div>
				</React.Fragment>				
			</div>
		)
	}

    render() {
		return(
			<div className="auth-form">
				{ this.state.currentFormMode == formModes.LOGIN && this.renderLoginForm() }
				{ this.state.currentFormMode == formModes.REGISTRATION && this.renderRegistrationForm() }
			</div>
		)
  	}
}