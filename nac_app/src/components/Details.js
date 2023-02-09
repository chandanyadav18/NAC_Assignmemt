import React,{useEffect,useState} from 'react'
import axios from "axios";
import DataTable from 'react-data-table-component';


const Details = () => {
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState("");
    const[filteredCountries,setFilteredCountries]=useState([]);
    const [collapsedRows, setCollapsedRows] = useState([]);



const getCountries = async () =>{ 
try {
const response = await axios.get("https://restcountries.com/v2/all"); // can take any api data
setCountries (response.data);
setFilteredCountries(response.data);
} catch (error) {
console.log(error);
}
};


const columns = [
{
name: "Country Name",
selector: (row) => row.name,
sortable: true // sorting.....
},
{
name: "Country Native Name",
selector: (row) => row.nativeName,
},
{
name: "Country Capital",
selector: (row) => row.capital,
},
{
  name: "Country callingCodes",
  selector: (row) => row.callingCodes, 
  sortable: true
},
{
  name: "Country region",
selector: (row) => row.region,
},
{
name: "Action",
cell: (row)=> (
<button
className="btn btn-primary"
onclick={() => alert (row.alpha2Code)}>
Edit
</button>
)
},

]

 //details 
useEffect (() => {
getCountries();
}, []);

//filtering the 

useEffect (() => {
const result = countries.filter ((country) => {
return country.name.toLowerCase().match(search.toLowerCase());
});
setFilteredCountries (result);
}, [search]);

// collapsible 

const handleRowClick = (row) => {
  setCollapsedRows(collapsedRows.includes(row)
    ? collapsedRows.filter(r => r !== row)
    : [...collapsedRows, row]);
};



 return (
<DataTable
title="Country List"
columns={columns}
data={filteredCountries}
pagination
fixedHeader
fixedHeaderScrollHeight="450px"
selectableRows
selectableRowsHighlight
highlightOnHover
actions={<button className="btn btn-sm btn-info">Export</button>}
subHeader
 subHeaderComponent={
 <input
  type="text"
  placeholder="Search here"
  className="w-25 form-control" 
  value={search}
  onChange={(e) =>setSearch(e.target.value)}
/>
}

 />
);
};

export default Details
