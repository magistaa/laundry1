import React from 'react';
import './Login.css';
import axios from 'axios';
class Login extends React.Component {
    
        constructor(){
            super()
            // tambah state sesuai kebutuhan
            this.state = {
                username: "",
                password: "",
                message: "",
                logged: false
            }
        }
    
        // arrow function -> untuk menjalankan fungsi login
        Login = event => {
            event.preventDefault()
            let sendData = {
                username: this.state.username,
                password: this.state.password
            }
    
            let url = "http://localhost:8000/login";
    
            axios.post(url, sendData)
            .then((res) => {
                this.setState({logged: res.data.logged})
                if (this.state.logged) {
                    let user = res.data.data
                    let token = res.data.token
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    window.location = "/admin/dashboard"
                } else {
                    this.setState({message: res.data.message})
                    alert(this.state.message)
                }
            })
            .catch(error => console.log(error))
        }
    
 
  render() {
   
    return (
     
       <div className="maincontainer">
        <div class="container-fluid">
            <div class="row no-gutter">
               
                <div class="col-md-6 d-none d-md-flex bg-image"></div>
                
                <div class="col-md-6 bg-light">
                    <div class="login d-flex align-items-center py-5">
                       
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-7 mx-auto">
                                    <h3 class="display-4">Laundry Jos!</h3>
                                    <p class="text-muted mb-4">Jangan cuci bajumu, cuci saja di laundry jos</p>
                                    <form onSubmit={(ev) => this.Login(ev)}>
                                        <div class="form-group mb-3">
                                            <input id="inputUsername" type="text" placeholder="Username" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} />
                                        </div>
                                        <div class="form-group mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} />
                                        </div>
                                        <div class="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                            <label for="customCheck1" class="custom-control-label">Remember password</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
)
};
}
export default Login;
