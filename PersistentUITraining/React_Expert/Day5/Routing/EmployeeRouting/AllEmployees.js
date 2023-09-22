let empAPI=
{
empList:[
    
    {
    empid:10,
    empName:'Adnan',
    empSalary:1000

 },


{
    empid:20,
    empName:'Krishna',
    empSalary:1000

},


{
    empid:30,
    empName:'Anish',
    empSalary:1000

},


{
    empid:40,
    empName:'Priya',
    empSalary:1000

}



]

,

getAllEmps: function(){
    return this.empList
},


getEmp: function(id){
        var emp= this.empList.find(emp=>emp.empid == id)

        return emp

}

}

export default empAPI





  