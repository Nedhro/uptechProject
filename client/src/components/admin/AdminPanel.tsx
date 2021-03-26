import React from 'react';
import ReactFlexyTable from "react-flexy-table";
import "react-flexy-table/dist/index";
import "react-flexy-table/dist/index.css";
// import ImgsViewer from 'react-images-viewer'
import Action from '../../actions/ActionHandler';
//import Select from "react-select";
import '../../components/admin/admin.scss';

class AdminPanel extends React.Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          notification: ''
        }
    }
    componentDidMount() {
        this.getRegData();
    }

    formateDate = (data: any) => {
        let formattedDate = "";
        formattedDate = data.split('T')[0];
        return formattedDate;
      };

    getRegData(){
        Action.getAllUsers().then(res=>{
            const result = res.data;
            let image = "";
            const datafinal = result?.users?.map((data: any) => {
                    image = "http://localhost:5050/"+data.image;
                let config = {
                  id: data._id,
                  "name": data.name,
                  "gender": data.gender,
                  "dob": this.formateDate(data.dob),
                  "regDate": this.formateDate(data.regDate),
                  "status": data.status === true? "Active": "Inactive",
                  "image": image
                };
                // let config = data;
                return config;
              });

              this.setState({
                isLoaded: true,
                items: datafinal,
                image: image
              });
        })
    }

    updateUserInfo(id:any){
      console.log(id);
      alert("This is function is under process");

    }
    deteleUserInfo(id:any){
      Action.deleteUser(id).then(res=>{
        if(res.status === 200){
          this.setState({notification: "User is deleted successfully"})
        }
      })
    }

    render(){
        const {
            error,
            isLoaded,
            items,
            notification
          } = this.state;

          const columns = [
            {
              header: 'name',
              key: 'name'
            },
            {
              header: 'gender',
              key: 'gender'
            },
            {
              header: 'DOB',
              key: 'dob'
            },
            {
              header: 'regDate',
              key: 'regDate'
            },
            {
              header: 'status',
              key: 'status'
            },
            {
              header: "Image",
              td: (data) => {
                return (
                  <div >
                    <a href={data.image} target="_blank">
                      <img src={data.image} height="50" width="50" alt=""/>
                    </a>
                   
                  </div>
                )
              }
          },
        {
          header: 'Actions',
          td: (data) => {
            return (
              <div>
               <button className="btn btn-info  m-1" onClick={() => {
                 const call = this.updateUserInfo(data.id);
                 return call;
               } }> Update</button>
               <button className="btn btn-danger m-1" onClick={() => {
                 const call = this.deteleUserInfo(data.id);
                 return call;
               } }> Delete</button>
              </div>
                )
              }
            }
          ]

          const additionalCols = [
           
          ]
        const tableTitle = "Data Table";
        const downloadExcelProps = {
            type: "filtered",
            title: tableTitle,
            showLabel: true,
          };
          if (error) {
            return (
              <div className="text-center font-weight-bold">
                Error: {error.message}
              </div>
            );
          } else if (!isLoaded) {
            return <div className="text-center font-weight-bold">Loading...</div>;
          } else {
        return(
            <div className="container">
                <h4> Table : Registration Data</h4>
                <p className="text-left text-danger bg-info font-weight-bold">{notification}</p>
                <ReactFlexyTable
                className="table table-stripped table-hover table-sm tableReg mb-1"
                data={items}
                sortable
                columns = {columns}
                globalSearch
                showExcelButton
                additionalCols={additionalCols}
                pageText={"Pages #"}
                rowsText={"Rows : "}
                searchText={"Filter"}
                pageSize={5}
                pageSizeOptions={[5, 10, 20, 50]}
                downloadExcelProps={downloadExcelProps}
                filteredDataText={"Filtered Data : "}
                totalDataText={"Total Data :"}
                downloadExcelText={"Download"}
              />
            </div>
            )}
    }
}

export default AdminPanel;