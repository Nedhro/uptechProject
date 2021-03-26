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
          items: []
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
            console.log(result?.users);
            let image = "";
            const datafinal = result?.users?.map((data: any) => {
                    image = "http://localhost:5050/"+data.image;
                let config = {
                  "Name": data.name || "",
                  "Gender": data.gender || "",
                  "DOB": this.formateDate(data.dob) || "",
                  "RegDate": this.formateDate(data.regDate),
                  "Status": data.status === true? "Active": "Inactive",
                  "Image": image
                };
                return config;
              });

              this.setState({
                isLoaded: true,
                items: datafinal,
                image: image
              });
        })
    }

    render(){
        const {
            error,
            isLoaded,
            items
          } = this.state;

          const additionalCols = [
            //   {
            //       header: "Image",
            //       td: (items) => {
            //         return (
            //           <div >
            //            <img src={image} height="30" width="20" alt=""/>
            //           </div>
            //         )
            //       }
            //   },
            {
              header: 'Actions',
              td: (data) => {
                return (
                  <div>
                   <button className="btn btn-info  m-1" > Edit</button>
                   <button className="btn btn-danger m-1"> Delete</button>
                  </div>
                )
              }
            }
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
                <h2> Registration Table</h2>
                <ReactFlexyTable
                className="table table-stripped table-hover table-sm tableReg"
                data={items}
                sortable
                globalSearch
                showExcelButton
                additionalCols={additionalCols}
                pageText={"Pages #"}
                rowsText={"Rows : "}
                searchText={"Filter"}
                pageSize={10}
                pageSizeOptions={[10, 20, 50]}
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