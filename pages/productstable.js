import MUIDataTable from "mui-datatables";
 
const columns = ["ID", "Name", "Description", "Price"];
 
const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];
 
const options = {
  filterType: 'checkbox',
};
export default function ProductTable() {
  
    return (
        <div>
      <MUIDataTable 
  title={"Crop List"} 
  data={data} 
  columns={columns} 
  options={options} 
/>
 
        </div>
    );
}