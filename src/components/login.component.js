import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            users: [],

            redirect: "",
        };
    }

    componentDidMount() {}

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log(user);

        axios.post("http://localhost:5000/users/in", user).then((res) => {
            // console.log(res.data);
            this.setState({
                valid: res.data,
            });

            this.setState({
                email: "",
                password: "",
            });
            console.log(this.state.valid);
            if (typeof this.state.valid.name == "string") {
                var inFifteenMinutes = new Date(
                    new Date().getTime() + 15 * 60 * 1000
                );
                Cookies.set("user", this.state.valid.name, {
                    expires: inFifteenMinutes,
                });

                Cookies.set("email", this.state.valid.email, {
                    expires: inFifteenMinutes,
                });

                console.log("Logged in");
                this.setState({
                    redirect: "http://localhost:3000/",
                });
                const user = {
                    log: this.state.valid,
                };
                axios
                    .post("http://localhost:5000/users/logged", user)
                    .then((res) => {});
            } else {
                console.log("Try again");
                this.setState({
                    redirect: "http://localhost:3000/login",
                });
            }
            window.location = this.state.redirect;
        });
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                class="w-75 mx-auto border border-dark rounded bg bg-light"
            >
                <div class="display-4 text-center ">Login</div>

                <div class="w-75 mx-auto">
                    <div class=" h4 m-0 w-75">Email Address </div>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="E-mail"
                        id="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>

                <div class="w-75 mx-auto">
                    <div class="h4 m-0 mt-2">Password </div>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-success btn-lg btn-block mt-4 w-75 mx-auto"
                    />
                </div>
            </form>
        );
    }
}
