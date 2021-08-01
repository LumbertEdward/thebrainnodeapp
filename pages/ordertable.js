import MUIDataTable from "mui-datatables";
 
const columns = ["ID", "Date ordered", "Description", "Price","Delivery Date"];
 
const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];
 
const options = {
  filterType: 'checkbox',
};
export default function OrderTable() {
  
    return (
        <div>
      <MUIDataTable 
  title={"Orders List"} 
  data={data} 
  columns={columns} 
  options={options} 
/>
 
        </div>
    );
}