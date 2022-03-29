import React from "react";
import axios from "axios";
import $ from "jquery";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal
} from "react-bootstrap";

export default class User extends React.Component {
  constructor(){
      super();
      this.state = {
          user: [],
          id_user: "",  
          nama: "",  
          username: "",  
          password: "",  
          role: "",  
          isModalOpen: false,
      }
  }
  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  handleAdd = () => {
    
      this.setState({
          id_user: "",
          nama: "",
          username: "",
          password: "",
          role: "",
          action: "insert",
          isModalOpen: true
      })
  }
  handleEdit = (item) => {
      this.setState({
          id_user: item.id_user,
          nama: item.nama,
          username: item.username,
          password: item.password,
          role: item.role,
          action: "update",
          isModalOpen: true
      })
  }
  getUser = () => {
    let url = "http://localhost:8000/user";
    // mengakses api untuk mengambil data user
    axios.get(url)
    .then(response => {
      // mengisikan data dari respon API ke array user
      console.log(response.data);
      this.setState({user: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleSave = (event) => {
    event.preventDefault();
    /* menampung data nip, nama dan alamat dari Form
    ke dalam FormData() untuk dikirim  */
    let form = {
      id_user: this.state.id_user,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    }

    let url = "http://localhost:8000/user";
    let url_update = "http://localhost:8000/user/" + (this.state.id_user)

    if (this.state.action === "insert") {
      // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getUser();
      this.setState({
        id_user: "",
        nama: "",
        username: "",
        password: "",
        role: "",
    })
    })
    .catch(error => {
      console.log(error);
    });
    } 
    else if (this.state.action === "update");{
      // mengirim data ke API untuk disimpan pada database
    axios.put(url_update, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getUser();
      this.setState({
          id_user: "",
          nama: "",
          username: "",
          password: "",
          role: "",
      })
    })
    .catch(error => {
      console.log(error);
    });
    }
  }

Drop = (id_user) => {
    let url = "http://localhost:8000/user/" + id_user;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getUser();
      })
      .catch(error => {
        console.log(error);
      });
    }
}

componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getUser()
  }



render() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List User</Card.Title>
                <button type="button" class="btn btn-success" onClick={() => this.handleAdd()}>Tambah User</button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nama</th>
                      <th className="border-0">Username</th>
                      {/* <th className="border-0">Password</th> */}
                      <th className="border-0">Role</th>
                      <th className="border-0">Option</th> 
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.user.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_user}</td>  
                            <td>{item.nama}</td>  
                            <td>{item.username}</td>
                            {/* <td>{item.password}</td>   */}
                            <td>{item.role}</td>    
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_user)}>  
                                Hapus  
                            </Button>  
                            </td>  
                        </tr>  
                        );  
                    })}

                   
                 </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
      <div id="modal_user">
                    <Modal.Header closeButton>
                    <Modal.Title>Form User</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSave}>  
                    <div className="modal-body">  
                        ID 
                        <input type="number" name="id_user" value={this.state.id_user} onChange={this.bind}  
                        className="form-control" disabled />  
                        Nama  
                        <input type="text" name="nama" value={this.state.nama} onChange={this.bind}  
                        className="form-control" required />  
                        Username  
                        <input type="text" name="username" value={this.state.username} onChange={this.bind}  
                        className="form-control" required />
                        Password  
                        <input type="password" name="password" value={this.state.password} onChange={this.bind}  
                        className="form-control" required />
                        Role  
                        <input type="text" name="role" value={this.state.role} onChange={this.bind}  
                        className="form-control" required />  
                    </div>  
                    <div className="modal-footer">  
                        <button className="btn btn-sm btn-success" type="submit" onClick={() => this.handleSave()}>  
                            Simpan  
                        </button>  
                    </div>  
                    </form> 
                </div>

    </>
  );
}

}
