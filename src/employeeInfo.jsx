import { useEffect, useState } from "react"
import axios from "axios";

//define states with default values
// error is null
//isLoaded is false then once loaded will be true
//items is an empty array so that useEffect will run once
const EmployeeInfo = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

//useEffect is a function that has 2 parameters, in this case the 2nd
//param is an empty array so it only runs on the 1st render
//useEffect lets you add side effects in components such as fetching data
//here we're getting data using axios, assigning the result to the response
//and changing the useState to true and the data is put into the setItems     
    useEffect(() => {
        axios
            .get("http://dummy.restapiexample.com/api/v1/employees")
            .then((res) => res)
            .then((result) => {
                setIsLoaded(true);
                setItems(result.data.data);
            },
            //handle errors instead of catch() block, if there is an error setError to true.
            // so that we dont swallow exceptions from actual bugs in componenets.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                });
    }, []);
//make a loop...if there's an error, show error message (must be in a div)
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    //if page is not yet loaded show loading (still rendering)
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    //then map (copy) the array into item array and show name
    //and salary from that array in list form
    else {
        return (
            <ul>
                {console.log(items)}
                {items.map((item) => (
                    <li key={item.id}>
                        {item.employee_name}, salary = $   
                        {item.employee_salary}
                    </li>
                ))}
            </ul>
        );
    }
}

export default EmployeeInfo;