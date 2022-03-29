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

export default class Outlet extends React.Component {
  constructor(){
      super();
      this.state = {
          outlet: [],
          id_outlet: "",  
          nama: "",  
          alamat: "",  
          isModalOpen: false,
          action: "",
      }
  }
  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  handleAdd = () => {
      this.setState({
          id_outlet: "",
          nama: "",
          alamat: "",
          action: "insert",
          isModalOpen: true
      })
  }
  handleEdit = (item) => {
      this.setState({
          id_outlet: item.id_outlet,
          nama: item.nama,
          alamat: item.alamat,
          action: "update",
          isModalOpen: true
      })
  }
  getOutlet = () => {
    let url = "http://localhost:8000/outlet";
    // mengakses api untuk mengambil data outlet
    axios.get(url)
    .then(response => {
      // mengisikan data dari respon API ke array outlet
      console.log(response.data);
      this.setState({outlet: response.data});
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
      id_outlet: this.state.id_outlet,
      nama: this.state.nama,
      alamat: this.state.alamat
    }

    let url = "http://localhost:8000/outlet";
    let url_update = "http://localhost:8000/outlet/" + (this.state.id_outlet)

    if (this.state.action === "insert") {
      // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getOutlet();
      this.setState({
        id_outlet: "",
        nama: "",
        alamat: "",
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
      this.getOutlet();
      this.setState({
          id_outlet: "",
          nama: "",
          alamat: "",
      })
    })
    .catch(error => {
      console.log(error);
    });
    }

    

    
}
Drop = (id_outlet) => {
    let url = "http://localhost:8000/outlet/" + id_outlet;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getOutlet();
      })
      .catch(error => {
        console.log(error);
      });
    }
}
componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getOutlet()
}


render() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Outlet</Card.Title>
                <button type="button" class="btn btn-success" onClick={() => this.handleAdd()}>Tambah Outlet</button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Cabang Outlet</th>
                      <th className="border-0">Alamat</th>
                      <th className="border-0">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.outlet.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_outlet}</td>  
                            <td>{item.nama}</td>  
                            <td>{item.alamat}</td>  
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_outlet)}>  
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
      <div id="modal_outlet">
                    <Modal.Header closeButton>
                    <Modal.Title>Form Outlet</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSave}>  
                    <div className="modal-body">  
                        ID 
                        <input type="number" name="id_outlet" value={this.state.id_outlet} onChange={this.bind}  
                        className="form-control" disabled />  
                        Cabang Outlet
                        <input type="text" name="nama" value={this.state.nama} onChange={this.bind}  
                        className="form-control" required />  
                        Alamat  
                        <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind}  
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
