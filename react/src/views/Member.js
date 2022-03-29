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

export default class Member extends React.Component {
  constructor(){
      super();
      this.state = {
          member: [],
          id_member: "",  
          name: "",  
          alamat: "",
          jenis_kelamin: "",
          tlp: "",  
          
      }
  }
  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  handleAdd = () => {
    
      this.setState({
          id_member: "",
          name: "",
          alamat: "",
          jenis_kelamin: "",
          tlp: "",
          action: "insert",
          
         
      })
  }
  handleEdit = (item) => {
      this.setState({
          id_member: item.id_member,
          name: item.name,
          alamat: item.alamat,
          jenis_kelamin: item.jenis_kelamin,
          tlp: item.tlp,
          action: "update",
          
      })
  }
  getMember = () => {
    let url = "http://localhost:8000/member";
    // mengakses api untuk mengambil data member
    axios.get(url)
    .then(response => {
      // mengisikan data dari respon API ke array member
      console.log(response.data);
      this.setState({member: response.data});
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
      id_member: this.state.id_member,
      name: this.state.name,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      tlp: this.state.tlp,
    }

    let url = "http://localhost:8000/member";
    let url_update = "http://localhost:8000/member/" + (this.state.id_member)

    if (this.state.action === "insert") {
      // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getMember();
      this.setState({
        id_member: "",
        name: "",
        alamat: "",
        jenis_kelamin: "",
        tlp: "",
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
      this.getMember();
      this.setState({
          id_member: "",
          name: "",
          alamat: "",
          jenis_kelamin: "",
          tlp: "",
      })
    })
    .catch(error => {
      console.log(error);
    });
    }
  }
  

  
Drop = (id_member) => {
    let url = "http://localhost:8000/member/" + id_member;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getMember();
      })
      .catch(error => {
        console.log(error);
      });
    }
}
componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getMember()
}



render() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Member</Card.Title>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#staticBackdrop" onClick={()=>this.handleAdd()}>Tambah Member</button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Alamat</th>
                      <th className="border-0">Jenis_kelamin</th>
                      <th className="border-0">Telepon</th>
                      <th className="border-0">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.member.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_member}</td>  
                            <td>{item.name}</td>  
                            <td>{item.alamat}</td> 
                            <td>{item.jenis_kelamin}</td>  
                            <td>{item.tlp}</td>   
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#staticBackdrop" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_member)}>  
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
                    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={this.handleSave}>  
                    <div className="modal-body">  
                        ID 
                        <input type="number" name="id_member" value={this.state.id_member} onChange={this.bind}  
                        className="form-control" disabled />  
                        Nama
                        <input type="text" name="name" value={this.state.name} onChange={this.bind}  
                        className="form-control" required />
                        Alamat  
                        <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind}  
                        className="form-control" required />
                        Jenis Kelamin  
                        <select type="text" name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.bind}  
                        className="form-control" required >
                         <option value="">--Pilih Gender--</option>
                         <option value="Laki-laki">Laki Laki</option>
                         <option value="Perempuan">Perempuan</option>  
                        </select>  
                        Telepon
                        <input type="text" name="tlp" value={this.state.tlp} onChange={this.bind}  
                        className="form-control" required />  
                    </div>  
                        <button className="btn btn-success" type="submit"  onClick={() => this.handleSave()}>  
                            Simpan  
                        </button>  
                        
                    </form> 
                </div>
                    <div className="modal-footer">
                        </div>
                        </div>
                        </div>
                    </div>

    </>
  );
}

}
