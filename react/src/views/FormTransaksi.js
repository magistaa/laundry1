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

export default class FormTransaksi extends React.Component {
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
        id_member:"",
        user: [],
        id_user:"",
        paket: [],
        id_paket:"",
        outlet: [],
        id_outlet:"",
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
        id_paket:"",
        id_outlet:"",
        
        action: "insert",
        isModalOpen: true
    })
}
handleEdit = (item) => {
      this.setState({
          id_transaksi: item.id_transaksi,
          id_member: item.id_member,
          tgl: item.tgl,
          batas_waktu: item.batas_waktu,
          tgl_bayar: item.tgl_bayar,
          id_outlet: item.id_outlet,
          status: item.status,
          dibayar: item.dibayar,
          id_user: item.id_user,
          id_paket: item.id_paket,
          action: "update",
          isModalOpen: true
      })
  }
  // getUser = () => {
  //   let url = "http://localhost:8000/user";
  //   // mengakses api untuk mengambil data user
  //   axios.get(url)
  //   .then(response => {
  //     // mengisikan data dari respon API ke array user
  //     console.log(response.data);
  //     this.setState({user: response.data});
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  handleSave = (event) => {
    event.preventDefault();
    /* menampung data nip, nama dan alamat dari Form
    ke dalam FormData() untuk dikirim  */
    let url = "";
    if (this.state.action === "insert") {
      url = "http://localhost:8000/transaksi"
    } 
    else (this.state.action == "update");{
      url = "http://localhost:8000/transaksi"
    }

    let form = {
          id_transaksi: this.state.id_transaksi,
          id_member: this.state.id_member,
          tgl: this.state.tgl,
          batas_waktu: this.state.batas_waktu,
          tgl_bayar: this.state.tgl_bayar,
          status: this.state.status,
          dibayar: this.state.dibayar,
          id_user: this.state.id_user,
          id_paket: this.state.id_paket,
          id_outlet: this.state.id_outlet,
      role: this.state.role,
    }

    // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getTransaksi();
    })
    .catch(error => {
      console.log(error);
    });
    // menutup form modal
    this.setState({
        isModalOpen: false
    })
}
// Drop = (id_user) => {
//     let url = "http://localhost:8000/user/" + id_user;
//     // memanggil url API untuk menghapus data pada database
//     if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
//       axios.delete(url)
//       .then(response => {
//         // jika proses hapus data berhasil, memanggil data yang terbaru
//         this.getUser();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     }
// }
// componentDidMount(){
//     // method yang pertama kali dipanggil pada saat load page
//     this.getUser()
// }


render() {
  return (
    <>
     
      <div id="modal_user">
                    <Modal.Header closeButton>
                    <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSave}>  
                    <div className="modal-body">  
                          
                        Member  
                        <select type="text" name="nama" value={this.state.id_member} onChange={this.bind}  
                        className="form-control" required>
 		    								<option value="">--Pilih Member--</option>
 				    						{this.state.member.map(member => (
						  					<option value={member.id_member}>
												{member.nama}
											</option>
										))}
                        </select>  
                        Tanggal Transaksi 
                        <input type="date" name="role" value={this.state.tgl} onChange={this.bind}  
                        className="form-control" required />
                        Batas Waktu  
                        <input type="date" name="role" value={this.state.batas_waktu} onChange={this.bind}  
                        className="form-control" required />
                        Tanggal Bayar 
                        <input type="date" name="role" value={this.state.tgl_bayar} onChange={this.bind}  
                        className="form-control" required />  
                        Status Bayar
                        <select type="text" name="nama" value={this.state.dibayar} onChange={this.bind}  
                        className="form-control" required>
                        	<option value="">Pilih Status Pembayaran</option>
   	  	  								<option value="belum_dibayar"> Belum dibayar </option>
 	  	  	  							<option value="dibayar"> Sudah dibayar </option> 
                        </select>  
                        Outlet 
                                <select type="text" name="outlet" value={this.state.id_outlet} onChange={this.bind}  
                                   className="form-control" required>
                                 <option>
                                   
                                 </option>  
                                </select> 
                        <br/>

                        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#staticBackdrop" onClick={() => this.handleAdd()}>Tambah Detail</button>
                        
                          <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                              <div class="modal-body"> 
                               Paket
                               <select type="text" name="nama" value={this.state.id_paket} onChange={this.bind}  
                                 className="form-control" required>
                                <option></option>  
                              </select>  
                              Qty
                                <input type="text" name="role" value={this.state.qty} onChange={this.bind}  
                                className="form-control" required />

                              </div>
                            <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-secondary">Simpan</button>
                       </div>
                      </div>
                    </div>
                  </div>

                                        

                        {/* tampilkan isi detail */}

                        <Modal.Title>Detail Paket</Modal.Title>
                        	{/* tampilkan isi detail */}
     									<h5>Detail Transaksi</h5>
 		    							{this.state.detail_transaksi.map(detail => (
				  						<div className="row">
											{/* area nama paket col-3 */}
											<div className="col-lg-3">
												{detail.jenis_paket}
											</div>
											{/* area quantity col-2*/}
											<div className="col-lg-2">
												Qty: {detail.qty}
											</div>
											{/* area harga paket col-3*/}
											<div className="col-lg-2">
												@ Rp {detail.harga}
											</div>
											{/* area harga total col-4  */}
											<div className="col-lg-2">
												Rp {detail.harga * detail.qty}
											</div>
											<div className="col-lg-2">
												<a className="text-danger"
													onClick={() => this.hapusData(detail.id_paket)}>
														<TiDelete size={30}/>
												</a>
											</div>
										</div>
									))}


                        

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

