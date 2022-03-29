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

export default class Transaksi extends React.Component {
  constructor(){
      super();
      this.state = {
          transaksi: [],
          id_transaksi: "",  
          tgl: "",
          batas_waktu: "",
          tgl_bayar: "",
          status: "",
          dibayar: "",
          member: [],
          user: [],
          outlet: [],
          detail_transaksi: [],
          isModalOpen: false,
      }
  }
  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  handleAdd = () => {
      this.setState({
          id_transaksi: "",
          id_member:"",  
          tgl: "",
          batas_waktu: "",
          tgl_bayar: "",
          status: "",
          dibayar: "",
          id_user:"",
          id_outlet:"",
          
          action: "insert",
          isModalOpen: true
      })
  }
  // handleEdit = (item) => {
  //     this.setState({
  //         id_transaksi: item.id_transaksi,
  //         id_member: item.id_member,
  //         tgl: item.tgl,
  //         batas_waktu: item.batas_waktu,
  //         tgl_bayar: item.tgl_bayar,
  //         status: item.status,
  //         dibayar: item.dibayar,
  //         id_user: item.id_user,
  //         id_outlet: item.id_outlet,
  //         action: "update",
  //         isModalOpen: true
  //     })
  // }
  // getTransaksi = () => {
  //   let url = "http://localhost:8000/transaksi";
  //   // mengakses api untuk mengambil data transaksi
  //   axios.get(url)
  //   .then(response => {
  //     // mengisikan data dari respon API ke array transaksi
  //     console.log(response.data);
  //     this.setState({transaksi: response.data});
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
  getTransaksi() {
      let url = "http://localhost:8000/transaksi";
      axios.get(url)
          .then(response => {
              let dataTransaksi = response.data
              for (let i = 0; i < dataTransaksi.length; i++) {
                  let total = 0;
                  for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                      let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                      let qty = dataTransaksi[i].detail_transaksi[j].qty

                      total += (harga * qty)

                      // tambahkan key total
                      dataTransaksi[i].total = total
                  }
              }

              this.setState({ transaksi: dataTransaksi })
          })
          .catch(error => console.log(error))
  }

    convertStatus(id_transaksi, status) {
      if (status === 1) {
          return (
              <div className="badge bg-info">
                  Transaksi Baru
                  <br />

                  <a onClick={() => this.changeStatus(id_transaksi, 2)} className="text-transparent">
                      Click here to the next level
                  </a>
              </div>
          )
      } else if (status === 2) {
          return (
              <div className="badge bg-warning">
                  Sedang diproses

                  <br />

                  <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-transparent">
                      Click here to the next level
                  </a>
              </div>
          )
      } else if (status === 3) {
          return (
              <div className="badge bg-secondary">
                  Siap Diambil

                  <br />

                  <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-transparent">
                      Click here to the next level
                  </a>
              </div>
          )
      } else if (status === 4) {
          return (
              <div className="badge bg-success">
                  Telah Diambil
              </div>
          )
      }
  }

  changeStatus(id, status) {
      if (window.confirm(`Apakah Anda yakin ingin mengganti status transaksi ini?`)) {
          let endpoint = `${baseUrl}/transaksi/status/${id}`
          let data = {
              status: status
          }

          axios
              .post(endpoint, data, authorization)
              .then(response => {
                  window.alert(`Status transaksi telah diubah`)
                  this.getData()
              })
              .catch(error => console.log(error))
      }
  }

  Drop = (id_transaksi) => {
    let url = "http://localhost:8000/transaksi/" + id_transaksi;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getTransaksi();
      })
      .catch(error => {
        console.log(error);
      });
    }
}

  // deleteTransaksi(id) {
  //     if (window.confirm(`Apakah Anda yakin ingin menghapus transaksi ini ?`)) {
  //         let endpoint = `${baseUrl}/transaksi/${id}`
  //         axios.delete(endpoint, authorization)
  //             .then(response => {
  //                 window.alert(response.data.message)
  //                 this.getData()
  //             })
  //             .catch(error => console.log(error))
  //     }

  // }

  convertStatusBayar(id_transaksi, dibayar) {
      if (dibayar === 0) {
          return (
              <div className="badge bg-danger text-white">
                  Belum Dibayar

                  <br />

                  <a className="text-transparent"
                      onClick={() => this.changeStatusBayar(id_transaksi, 1)}>
                      Click here to change paid status
                  </a>
              </div>
          )
      } else if (dibayar === 1) {
          return (
              <div className="badge bg-success text-white">
                  Sudah Dibayar
              </div>
          )
      }
  }

  changeStatusBayar(id, status) {
      if (window.confirm(`Apakah Anda yakin ingin mengubah status pembayaran ini?`)) {
          let endpoint = `${baseUrl}/transaksi/bayar/${id}`
          axios.get(endpoint, authorization)
              .then(response => {
                  window.alert(`Status pembayaran telah diubah`)
                  this.getData()
              })
              .catch(error => console.log(error))
      }
  }

  convertPdf() {
      // ambil element yang akan diconvert ke pdf
      let element = document.getElementById(`target`)
      let options = {
          filename: "Rincian Data Transaksi.pdf"
      }

      domToPdf(element, options, () => {
          window.alert("file will download soon")
      })
  }


//   handleSave = (event) => {
//     event.preventDefault();
//     /* menampung data nip, nama dan alamat dari Form
//     ke dalam FormData() untuk dikirim  */
//     let url = "";
//     if (this.state.action === "insert") {
//       url = "http://localhost:8000/transaksi"
//     } 
//     // else (this.state.action == "update");{
//     //   url = "http://localhost:8000/transaksi"
//     // }

//     let form = {
//           id_transaksi: this.state.id_transaksi,
//           id_member: this.state.id_member,
//           tgl: this.state.tgl,
//           batas_waktu: this.state.batas_waktu,
//           tgl_bayar: this.state.tgl_bayar,
//           status: this.state.status,
//           dibayar: this.state.dibayar,
//           id_user: this.state.id_user,
//           id_outlet: this.state.id_outlet,
//     }

//     // mengirim data ke API untuk disimpan pada database
//     axios.post(url, form)
//     .then(response => {
//       // jika proses simpan berhasil, memanggil data yang terbaru
//       this.getTransaksi();
//     })
//     .catch(error => {
//       console.log(error);
//     });
//     // menutup form modal
//     this.setState({
//         isModalOpen: false
//     })
// }
// Drop = (id_transaksi) => {
//     let url = "http://localhost:8000/transaksi/" + id_transaksi;
//     // memanggil url API untuk menghapus data pada database
//     if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
//       axios.delete(url)
//       .then(response => {
//         // jika proses hapus data berhasil, memanggil data yang terbaru
//         this.getTransaksi();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     }
// }


componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getTransaksi()
}




render() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Transaksi</Card.Title>
                <a href="/./admin/formtransaksi"><button type="button" class="btn btn-success" onClick={() => this.handleAdd()}>Tambah Paket</button></a>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nama Member</th>
                      <th className="border-0">Tanggal Transaksi</th>
                      <th className="border-0">Batas Waktu</th>
                      <th className="border-0">Status Cucian</th>
                      <th className="border-0">Status Bayar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.transaksi.map((item,index) => {  
                        return (  
                       <>     
                        <tr key={index}>  
                            <td>{item.id_transaksi}</td> 
                            <td>{item.id_member}</td>  
                            <td>{item.tgl}</td>
                            <td>{item.batas_waktu}</td>  
                            <td>{item.tgl_bayar}</td>
                            <td>{item.status}</td>  
                            <td>{item.dibayar}</td>   
                            <td>{item.id_outlet}</td>
                            <td>{item.id_paket}</td> 
                            <td>{item.id_user}</td>
                
                            <td>   
                            <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Link with href
                           </a>
                            </td>
                        </tr> 
                        <tr>
                        
                        <td colSpan="4">
                        <div class="collapse" id="collapseExample">
                        {/* <tr> */}
                            <td>
                        <div class="card card-body">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                        </div>
                        </td>
                        <td>
                        <div>
                        <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_transaksi)}>  
                                Hapus  
                            </Button>  
                        </div>
                        </td>
                        {/* </tr> */}
                        </div>
                        </td>
                        </tr>

                        </>
                        
                        );  
                    })}

                   
                 </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
  
    </>
  );
}

}

// import React from "react"
// import axios from "axios"
// import { baseUrl, formatNumber, authorization } from "../config.js";
// import domToPdf from "dom-to-pdf";
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";

// import { AiFillPrinter } from "react-icons/ai"

// export default class Transaksi extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             transaksi: [],
//             visible: "",
//             user: ""
//         }

//         if (!localStorage.getItem("token")) {
//             window.location.href = "/auth"
//         }
//     }

//     getData() {
//         let endpoint = `${baseUrl}/transaksi`
//         axios.get(endpoint, authorization)
//             .then(response => {
//                 let dataTransaksi = response.data
//                 for (let i = 0; i < dataTransaksi.length; i++) {
//                     let total = 0;
//                     for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
//                         let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
//                         let qty = dataTransaksi[i].detail_transaksi[j].qty

//                         total += (harga * qty)

//                         // tambahkan key total
//                         dataTransaksi[i].total = total
//                     }
//                 }

//                 this.setState({ transaksi: dataTransaksi })
//             })
//             .catch(error => console.log(error))
//     }

//     componentDidMount() {
//         this.getData()
//         let user = JSON.parse(localStorage.getItem("user"))

//         // cara kedua
//         if (user.role === 'Admin' || user.role === 'Kasir') {
//             this.setState({
//                 visible: true
//             })
//         } else {
//             this.setState({
//                 visible: false
//             })
//         }
//     }

//     convertStatus(id_transaksi, status) {
//         if (status === 1) {
//             return (
//                 <div className="badge bg-info">
//                     Transaksi Baru
//                     <br />

//                     <a onClick={() => this.changeStatus(id_transaksi, 2)} className="text-transparent">
//                         Click here to the next level
//                     </a>
//                 </div>
//             )
//         } else if (status === 2) {
//             return (
//                 <div className="badge bg-warning">
//                     Sedang diproses

//                     <br />

//                     <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-transparent">
//                         Click here to the next level
//                     </a>
//                 </div>
//             )
//         } else if (status === 3) {
//             return (
//                 <div className="badge bg-secondary">
//                     Siap Diambil

//                     <br />

//                     <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-transparent">
//                         Click here to the next level
//                     </a>
//                 </div>
//             )
//         } else if (status === 4) {
//             return (
//                 <div className="badge bg-success">
//                     Telah Diambil
//                 </div>
//             )
//         }
//     }

//     changeStatus(id, status) {
//         if (window.confirm(`Apakah Anda yakin ingin mengganti status transaksi ini?`)) {
//             let endpoint = `${baseUrl}/transaksi/status/${id}`
//             let data = {
//                 status: status
//             }

//             axios
//                 .post(endpoint, data, authorization)
//                 .then(response => {
//                     window.alert(`Status transaksi telah diubah`)
//                     this.getData()
//                 })
//                 .catch(error => console.log(error))
//         }
//     }

//     deleteTransaksi(id) {
//         if (window.confirm(`Apakah Anda yakin ingin menghapus transaksi ini ?`)) {
//             let endpoint = `${baseUrl}/transaksi/${id}`
//             axios.delete(endpoint, authorization)
//                 .then(response => {
//                     window.alert(response.data.message)
//                     this.getData()
//                 })
//                 .catch(error => console.log(error))
//         }

//     }

//     convertStatusBayar(id_transaksi, dibayar) {
//         if (dibayar === 0) {
//             return (
//                 <div className="badge bg-danger text-white">
//                     Belum Dibayar

//                     <br />

//                     <a className="text-transparent"
//                         onClick={() => this.changeStatusBayar(id_transaksi, 1)}>
//                         Click here to change paid status
//                     </a>
//                 </div>
//             )
//         } else if (dibayar === 1) {
//             return (
//                 <div className="badge bg-success text-white">
//                     Sudah Dibayar
//                 </div>
//             )
//         }
//     }

//     changeStatusBayar(id, status) {
//         if (window.confirm(`Apakah Anda yakin ingin mengubah status pembayaran ini?`)) {
//             let endpoint = `${baseUrl}/transaksi/bayar/${id}`
//             axios.get(endpoint, authorization)
//                 .then(response => {
//                     window.alert(`Status pembayaran telah diubah`)
//                     this.getData()
//                 })
//                 .catch(error => console.log(error))
//         }
//     }

//     convertPdf() {
//         // ambil element yang akan diconvert ke pdf
//         let element = document.getElementById(`target`)
//         let options = {
//             filename: "Rincian Data Transaksi.pdf"
//         }

//         domToPdf(element, options, () => {
//             window.alert("file will download soon")
//         })
//     }

//     render() {
//         const target = React.createRef()
//         const optionPDF = {
//             orientation: `landscape`,
//             unit: `cm`,
//             format: [21, 29.7]
//         }
//         return (
//             <div>
//                 <Navbar />
//                 <div className="row pt-4">
//                     <div className="col-2">
//                         <Sidebar />
//                     </div>
//                     <div className="col-8">
//                         <div className="container pt-5 justify-content-start">
//                             <div className="card bg-dark">
//                                 <div ref={target} id="target">
//                                     <div className="card-header bg-dark">
//                                         <h3 className="text-white">
//                                             Transaksi
//                                         </h3>
//                                     </div>
//                                     &nbsp; 
//                                     {/* <AiFillPrinter className="text-white mx-3" size={35} style={{float: "right"}}/>    */}
//                                     <a style={{float: "right"}}
//                                         onClick={() => this.convertPdf()}>
//                                         <AiFillPrinter className="text-white mx-3" size={35}/>
//                                     </a>

//                                     <div className="card-body">
//                                         <ul className="list-group">
//                                             {this.state.transaksi.map(trans => (
//                                                 <li className="list-group-item">
//                                                     <div className="row">
//                                                         {/* this is member area */}
//                                                         <div className="col-lg-3">
//                                                             <small className="text-info">
//                                                                 Member
//                                                             </small> <br />
//                                                             {trans.member.nama}
//                                                         </div>

//                                                         {/* this is tgl transaksi area  */}
//                                                         <div className="col-lg-4">
//                                                             <small className="text-info">
//                                                                 Tanggal Transaksi
//                                                             </small> <br />
//                                                             {trans.tgl}
//                                                         </div>

//                                                         <div className="col-lg-4">
//                                                             <small className="text-info">
//                                                                 Status
//                                                             </small> <br />
//                                                             {this.convertStatus(trans.id_transaksi, trans.status)}
//                                                         </div>
//                                                     </div>

//                                                     <div className="row">
//                                                         <div className="col-lg-3">
//                                                             <small className="text-info">
//                                                                 Total
//                                                             </small><br />
//                                                             Rp {formatNumber(trans.total)}
//                                                         </div>

//                                                         {/* this is batas waktu area  */}
//                                                         <div className="col-lg-4">
//                                                             <small className="text-info">
//                                                                 Batas Waktu
//                                                             </small> <br />
//                                                             {trans.batas_waktu}
//                                                         </div>

//                                                         {/* this is status pembayaran  */}
//                                                         <div className="col-lg-4">
//                                                             <small className="text-info">
//                                                                 Status Pembayaran
//                                                             </small> <br />
//                                                             {this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}
//                                                         </div>
//                                                     </div>

//                                                     <div className="row">
//                                                         {/* this is tanggal bayar area  */}
//                                                         <div className="col-lg-3">
//                                                         </div>
//                                                         <div className="col-lg-4">
//                                                             <small className="text-info">
//                                                                 Tanggal Bayar
//                                                             </small> <br />
//                                                             {trans.tgl_bayar}
//                                                         </div>
                                                        
//                                                         <div className="col-lg-4">
//                                                             <small className={`text-info ${this.state.visible ? `` : `d-none`}`}>
//                                                                 Option
//                                                             </small><br />
//                                                             <button className={`btn btn-sm btn-danger ${this.state.visible ? `` : `d-none`}`}
//                                                                 onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
//                                                                 Hapus
//                                                             </button>
//                                                         </div>
//                                                     </div>
                                                    
//                                                     <br></br>

//                                                     {/* area detail transaksi */}
//                                                     <h5>Detail Transaksi</h5>
//                                                     {trans.detail_transaksi.map(detail => (
//                                                         <div className="row">
//                                                             {/* area nama paket col-3 */}
//                                                             <div className="col-lg-3">
//                                                                 {detail.paket.jenis_paket}
//                                                             </div>
//                                                             {/* area quantity col-2*/}
//                                                             <div className="col-lg-2">
//                                                                 Qty: {detail.qty}
//                                                             </div>
//                                                             {/* area harga paket col-3*/}
//                                                             <div className="col-lg-3">
//                                                                 @ Rp {formatNumber(detail.paket.harga)}
//                                                             </div>
//                                                             {/* area harga total col-4  */}
//                                                             <div className="col-lg-4">
//                                                                 Rp {formatNumber(detail.paket.harga * detail.qty)}
//                                                             </div>
//                                                         </div>
//                                                     ))}

//                                                     <hr></hr>
//                                                     <hr></hr>
                                                    
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }