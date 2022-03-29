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

export default class Paket extends React.Component {
  constructor(){
      super();
      this.state = {
          paket: [],
          id_paket: "",  
          jenis: "",  
          harga: "",  
          isModalOpen: false,
      }
  }
  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  handleAdd = () => {
    
      this.setState({
          id_paket: "",
          jenis: "",
          harga: "",
          action: "insert",
          isModalOpen: true
      })
  }
  handleEdit = (item) => {
      this.setState({
          id_paket: item.id_paket,
          jenis: item.jenis,
          harga: item.harga,
          action: "update",
          isModalOpen: true
      })
  }
  getPaket = () => {
    let url = "http://localhost:8000/paket";
    // mengakses api untuk mengambil data paket
    axios.get(url)
    .then(response => {
      // mengisikan data dari respon API ke array paket
      console.log(response.data);
      this.setState({paket: response.data});
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
      id_paket: this.state.id_paket,
      jenis: this.state.jenis,
      harga: this.state.harga,
    }

    let url = "http://localhost:8000/paket";
    let url_update = "http://localhost:8000/paket/" + (this.state.id_paket)

    if (this.state.action === "insert") {
      // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getPaket();
      this.setState({
        id_paket: "",
        jenis: "",
        harga: "",
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
      this.getPaket();
      this.setState({
          id_paket: "",
          jenis: "",
          harga: "",
      })
    })
    .catch(error => {
      console.log(error);
    });
    }
  }
  

Drop = (id_paket) => {
    let url = "http://localhost:8000/paket/" + id_paket;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getPaket();
      })
      .catch(error => {
        console.log(error);
      });
    }
}
componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getPaket()
}


render() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Paket</Card.Title>
                <button type="button" class="btn btn-success" onClick={() => this.handleAdd()}>Tambah Paket</button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Jenis Paket</th>
                      <th className="border-0">Harga</th>
                      <th className="border-0">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.paket.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_paket}</td>  
                            <td>{item.jenis}</td>  
                            <td>{item.harga}</td>  
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_paket)}>  
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
      <div id="modal_paket">
                    <Modal.Header closeButton>
                    <Modal.Title>Form Paket</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSave}>  
                    <div className="modal-body">  
                        ID 
                        <input type="number" name="id_paket" value={this.state.id_paket} onChange={this.bind}  
                        className="form-control" disabled />  
                        Jenis  
                        <input type="text" name="jenis" value={this.state.jenis} onChange={this.bind}  
                        className="form-control" required />  
                        Harga  
                        <input type="text" name="harga" value={this.state.harga} onChange={this.bind}  
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
